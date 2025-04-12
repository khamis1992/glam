import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  spacing: {
    xxs: 2,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    xl: 24,
    pill: 50,
  },
  isSmallDevice: width < 375,
  // Typography scale
  typography: {
    h1: 28,
    h2: 24,
    h3: 20,
    h4: 18,
    body: 16,
    caption: 14,
    small: 12,
    tiny: 10,
  },
  // Elevation levels
  elevation: {
    none: 0,
    xs: 1,
    s: 2,
    m: 4,
    l: 8,
    xl: 16,
  },
};