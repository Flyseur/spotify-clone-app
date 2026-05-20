import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from './constants';

export const theme = {
  colors: COLORS,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  fontSizes: FONT_SIZES,
};

export type Theme = typeof theme;
