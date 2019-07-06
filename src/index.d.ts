interface BadgenOptions {
  status: string;
  subject?: string;
  label?: string;
  color?: string;
  style?: StyleOption;
  icon?: string;
  iconWidth?: 13;
}

type StyleOption = 'flat' | 'classic'

export default function badgen(options: BadgenOptions): string;
