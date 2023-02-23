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
  labelColor?: string
  style?: StyleOption;
  icon?: string;
  iconWidth?: number;
  scale?: number
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

  const iconSpanWidth = icon ? (label?.length ? iconWidth + 30 : iconWidth - 18) : 0
  const sbTextStart = icon ? (iconSpanWidth + 50) : 50
  const sbTextWidth = label ? calcWidth(label) : 0
  const stTextWidth = calcWidth(status)
  const sbRectWidth = sbTextWidth + 100 + iconSpanWidth
  const stRectWidth = stTextWidth + 100
  const width = sbRectWidth + stRectWidth
  const xlink = icon ? ' xmlns:xlink="http://www.w3.org/1999/xlink"' : ''

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
  <g aria-hidden="true" fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="${sbTextStart + 10}" y="148" textLength="${sbTextWidth}" fill="#000" opacity="0.1">${label}</text>
    <text x="${sbTextStart}" y="138" textLength="${sbTextWidth}">${label}</text>
    <text x="${sbRectWidth + 55}" y="148" textLength="${stTextWidth}" fill="#000" opacity="0.1">${status}</text>
    <text x="${sbRectWidth + 45}" y="138" textLength="${stTextWidth}">${status}</text>
  </g>
  ${icon ? `<image x="40" y="35" width="${iconWidth}" height="132" xlink:href="${icon}"/>` : ''}
</svg>`
  }

  return `<svg width="${scale * width / 10}" height="${scale * 20}" viewBox="0 0 ${width} 200" xmlns="http://www.w3.org/2000/svg"${xlink} role="img" aria-label="${accessibleText}">
  <title>${accessibleText}</title>
  <linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="m"><rect width="${width}" height="200" rx="30" fill="#FFF"/></mask>
  <g mask="url(#m)">
    <rect width="${sbRectWidth}" height="200" fill="#${labelColor}"/>
    <rect width="${stRectWidth}" height="200" fill="#${color}" x="${sbRectWidth}"/>
    <rect width="${width}" height="200" fill="url(#a)"/>
  </g>
  <g aria-hidden="true" fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="${sbTextStart + 10}" y="148" textLength="${sbTextWidth}" fill="#000" opacity="0.25">${label}</text>
    <text x="${sbTextStart}" y="138" textLength="${sbTextWidth}">${label}</text>
    <text x="${sbRectWidth + 55}" y="148" textLength="${stTextWidth}" fill="#000" opacity="0.25">${status}</text>
    <text x="${sbRectWidth + 45}" y="138" textLength="${stTextWidth}">${status}</text>
  </g>
  ${icon ? `<image x="40" y="35" width="${iconWidth}" height="130" xlink:href="${icon}"/>` : ''}
</svg>`
}

function bare ({ status, color = 'blue', style, scale = 1 }: BadgenOptions) {
  typeAssert(typeof status === 'string', '<status> must be string')
  color = colorPresets[color] || color || colorPresets.blue

  const stTextWidth = calcWidth(status)
  const stRectWidth = stTextWidth + 115

  status = sanitize(status)
  color = sanitize(color)

  if (style === 'flat') {
    return `<svg width="${scale * stRectWidth / 10}" height="${scale * 20}" viewBox="0 0 ${stRectWidth} 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${status}">
  <title>${status}</title>
  <g>
    <rect fill="#${color}" x="0" width="${stRectWidth}" height="200"/>
  </g>
  <g aria-hidden="true" fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="65" y="148" textLength="${stTextWidth}" fill="#000" opacity="0.1">${status}</text>
    <text x="55" y="138" textLength="${stTextWidth}">${status}</text>
  </g>
</svg>`
  }

  return `<svg width="${scale * stRectWidth / 10}" height="${scale * 20}" viewBox="0 0 ${stRectWidth} 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${status}">
  <title>${status}</title>
  <linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="m"><rect width="${stRectWidth}" height="200" rx="30" fill="#FFF"/></mask>
  <g mask="url(#m)">
    <rect width="${stRectWidth}" height="200" fill="#${color}" x="0"/>
    <rect width="${stRectWidth}" height="200" fill="url(#a)"/>
  </g>
  <g aria-hidden="true" fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="65" y="148" textLength="${stTextWidth}" fill="#000" opacity="0.25">${status}</text>
    <text x="55" y="138" textLength="${stTextWidth}">${status}</text>
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

if (typeof window === 'object') {
  window.badgen = badgen
}
