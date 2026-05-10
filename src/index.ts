export { Verdana110 as calcWidth } from './calc-text-width'
import { Verdana110 as calcWidth } from './calc-text-width'
import colorPresets from './color-presets'

export type StyleOption = 'flat' | 'classic'
export type ColorPreset = keyof typeof colorPresets

export interface BadgenOptions {
  status: string;
  subject?: string;
  color?: ColorPreset;
  label?: string;
  labelColor?: string;
  style?: StyleOption;
  icon?: string;
  iconWidth?: number;
  scale?: number;
}

/**
 * Based on Shields.io (brightness() function)
 */
function colorBrightness (hex: string): number {
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  return (r * 299 + g * 587 + b * 114) / 255000
}

/**
 * Based on Shields.io (colorsForBackground() function)
 */
function colorsForBackground (hex: string): { textColor: string; shadowColor: string } {
  if (colorBrightness(hex) <= 0.69) {
    return { textColor: '#fff', shadowColor: '#000' }
  } else {
    return { textColor: '#000', shadowColor: '#fff' }
  }
}

export function badgen ({
  label,
  subject,
  status,
  color = 'blue',
  style,
  icon,
  iconWidth = 13,
  labelColor = '555',
  scale = 1
}: BadgenOptions) {
  typeAssert(typeof status === 'string', '<status> must be string')

  label = label === undefined ? subject : label // subject is deprecated
  if (!label && !icon) {
    return bare({ status, color, style, scale })
  }

  color = colorPresets[color] || color
  labelColor = colorPresets[labelColor] || labelColor
  iconWidth = iconWidth * 10

  const { textColor: labelTextColor, shadowColor: labelShadowColor } = colorsForBackground(labelColor)
  const { textColor: statusTextColor, shadowColor: statusShadowColor } = colorsForBackground(color)

  const iconSpanWidth = icon ? (label?.length ? iconWidth + 30 : iconWidth - 18) : 0
  const sbTextStart = icon ? (iconSpanWidth + 50) : 50
  const sbTextWidth = label ? calcWidth(label) : 0
  const stTextWidth = calcWidth(status)
  const sbRectWidth = sbTextWidth + 100 + iconSpanWidth
  const stRectWidth = stTextWidth + 100
  const width = sbRectWidth + stRectWidth
  const xlink = icon ? ' xmlns:xlink="http://www.w3.org/1999/xlink"' : ''

  const gradientId = generateRandomID(5)
  const maskId = generateRandomID(5)

  label = label ? sanitize(label) : ''
  status = sanitize(status)
  color = sanitize(color)
  labelColor = sanitize(labelColor)
  icon = icon ? sanitize(icon) : icon
  const accessibleText = createAccessibleText({label, status})

  if (style === 'flat') {
    return `<svg width="${scale * width / 10}" height="${scale * 20}" viewBox="0 0 ${width} 200" xmlns="http://www.w3.org/2000/svg"${xlink} role="img" aria-label="${accessibleText}">
  <title>${accessibleText}</title>
  <g>
    <rect fill="#${labelColor}" width="${sbRectWidth}" height="200"/>
    <rect fill="#${color}" x="${sbRectWidth}" width="${stRectWidth}" height="200"/>
  </g>
  <g aria-hidden="true" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="${sbTextStart + 10}" y="148" textLength="${sbTextWidth}" fill="${labelShadowColor}" opacity="0.1">${label}</text>
    <text x="${sbTextStart}" y="138" textLength="${sbTextWidth}" fill="${labelTextColor}">${label}</text>
    <text x="${sbRectWidth + 55}" y="148" textLength="${stTextWidth}" fill="${statusShadowColor}" opacity="0.1">${status}</text>
    <text x="${sbRectWidth + 45}" y="138" textLength="${stTextWidth}" fill="${statusTextColor}">${status}</text>
  </g>
  ${icon ? `<image x="40" y="35" width="${iconWidth}" height="132" xlink:href="${icon}"/>` : ''}
</svg>`
  }

  return `<svg width="${scale * width / 10}" height="${scale * 20}" viewBox="0 0 ${width} 200" xmlns="http://www.w3.org/2000/svg"${xlink} role="img" aria-label="${accessibleText}">
  <title>${accessibleText}</title>
  <linearGradient id="${gradientId}" x2="0" y2="100%">
    <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="${maskId}"><rect width="${width}" height="200" rx="30" fill="#FFF"/></mask>
  <g mask="url(#${maskId})">
    <rect width="${sbRectWidth}" height="200" fill="#${labelColor}"/>
    <rect width="${stRectWidth}" height="200" fill="#${color}" x="${sbRectWidth}"/>
    <rect width="${width}" height="200" fill="url(#${gradientId})"/>
  </g>
  <g aria-hidden="true" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="${sbTextStart + 10}" y="148" textLength="${sbTextWidth}" fill="${labelShadowColor}" opacity="0.25">${label}</text>
    <text x="${sbTextStart}" y="138" textLength="${sbTextWidth}" fill="${labelTextColor}">${label}</text>
    <text x="${sbRectWidth + 55}" y="148" textLength="${stTextWidth}" fill="${statusShadowColor}" opacity="0.25">${status}</text>
    <text x="${sbRectWidth + 45}" y="138" textLength="${stTextWidth}" fill="${statusTextColor}">${status}</text>
  </g>
  ${icon ? `<image x="40" y="35" width="${iconWidth}" height="130" xlink:href="${icon}"/>` : ''}
</svg>`
}

export default badgen

function bare ({ status, color = 'blue', style, scale = 1 }: BadgenOptions) {
  typeAssert(typeof status === 'string', '<status> must be string')
  color = colorPresets[color] || color || colorPresets.blue

  const { textColor: statusTextColor, shadowColor: statusShadowColor } = colorsForBackground(color)

  const stTextWidth = calcWidth(status)
  const stRectWidth = stTextWidth + 115

  const gradientId = generateRandomID(5)
  const maskId = generateRandomID(5)

  status = sanitize(status)
  color = sanitize(color)

  if (style === 'flat') {
    return `<svg width="${scale * stRectWidth / 10}" height="${scale * 20}" viewBox="0 0 ${stRectWidth} 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${status}">
  <title>${status}</title>
  <g>
    <rect fill="#${color}" x="0" width="${stRectWidth}" height="200"/>
  </g>
  <g aria-hidden="true" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="65" y="148" textLength="${stTextWidth}" fill="${statusShadowColor}" opacity="0.1">${status}</text>
    <text x="55" y="138" textLength="${stTextWidth}" fill="${statusTextColor}">${status}</text>
  </g>
</svg>`
  }

  return `<svg width="${scale * stRectWidth / 10}" height="${scale * 20}" viewBox="0 0 ${stRectWidth} 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${status}">
  <title>${status}</title>
  <linearGradient id="${gradientId}" x2="0" y2="100%">
    <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="${maskId}"><rect width="${stRectWidth}" height="200" rx="30" fill="#FFF"/></mask>
  <g mask="url(#${maskId})">
    <rect width="${stRectWidth}" height="200" fill="#${color}" x="0"/>
    <rect width="${stRectWidth}" height="200" fill="url(#${gradientId})"/>
  </g>
  <g aria-hidden="true" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="65" y="148" textLength="${stTextWidth}" fill="${statusShadowColor}" opacity="0.25">${status}</text>
    <text x="55" y="138" textLength="${stTextWidth}" fill="${statusTextColor}">${status}</text>
  </g>
</svg>`
}

function sanitize (str: string): string {
  return str
    .replace(/\u0026/g, '&amp;')
    .replace(/\u003C/g, '&lt;')
    .replace(/\u003E/g, '&gt;')
    .replace(/\u0022/g, '&quot;')
    .replace(/\u0027/g, '&apos;')
}

interface AccessibleTextProps {
  status: string;
  label?: string;
}

function generateRandomID(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

function createAccessibleText({label, status}: AccessibleTextProps): string {
  const labelPrefix = label ? `${label}: ` : '';
  return labelPrefix + status;
}

function typeAssert (assertion: boolean, message: string): void {
  if (!assertion) throw new TypeError(message)
}

declare global {
  interface Window {
    badgen: typeof badgen;
  }
}
