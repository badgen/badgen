interface BadgenOptions {
  status: string;
  subject?: string;
  color?: string;
  label?: string;
  labelColor?: string
  style?: StyleOption;
  icon?: string;
  iconWidth?: 13;
}

type StyleOption = 'flat' | 'classic'

export default function badgen(options: BadgenOptions): string;
