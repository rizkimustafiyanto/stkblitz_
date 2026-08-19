import { themeColors } from './colors'
import { themeComponents } from './components'
import { themeLayout } from './layout'
import { themeRadius } from './radius'
import { themeShadow } from './shadow'
import { themeSpacing } from './spacing'
import { themeTypography } from './typography'

export { themeColors } from './colors'
export { themeComponents } from './components'
export { themeLayout } from './layout'
export { themeRadius } from './radius'
export { themeShadow } from './shadow'
export { themeSpacing } from './spacing'
export { themeTypography } from './typography'

export const themeTokens = {
  color: themeColors,
  components: themeComponents,
  layout: themeLayout,
  radius: themeRadius,
  shadow: themeShadow,
  spacing: themeSpacing,
  typography: themeTypography,
} as const
