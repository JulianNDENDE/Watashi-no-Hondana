import { createTamagui } from 'tamagui';
import { config } from '@tamagui/config';

const customConfig = {
  ...config,
  themes: {
    dark: {
      background: '#1A1A1A',
      backgroundStrong: '#161616',
      backgroundLight: '#2E2E2E',
      color: '#F0F0F0',
      colorMuted: '#9C9C9C',
      primary: '#409EFF',
      secondary: '#4C566A',
      border: '#2E2E2E',
      inputBackground: '#303030',
      inputText: '#C0C0C0',
      error: '#FF4C4C',
    },
    light: {
      background: '#FFFFFF',
      backgroundStrong: '#F4F4F5',
      backgroundLight: '#E5E7EB',
      color: '#1A1A1A',
      colorMuted: '#4C4F52',
      primary: '#409EFF',
      secondary: '#737373',
      border: '#D1D5DB',
      inputBackground: '#E5E7EB',
      inputText: '#1A1A1A',
      error: '#FF4C4C',
    },
  },
};

const tamaguiConfig = createTamagui(customConfig);

export default tamaguiConfig;
