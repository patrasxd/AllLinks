import { HeaderMenu as UiHeaderMenu, useTheme } from '@all/ui'
import { useI18n } from '../i18n'

export function HeaderMenu() {
  const { theme, setTheme, isEink, isDark } = useTheme()
  const { locale, setLocale } = useI18n()

  return (
    <UiHeaderMenu
      locale={locale}
      onLocaleChange={(loc) => {
        if (loc === 'en' || loc === 'pl') setLocale(loc)
      }}
      theme={theme}
      onThemeChange={(value) => {
        if (value === 'dark' || value === 'light' || value === 'e-ink-dark' || value === 'e-ink-light') setTheme(value)
      }}
      isEink={isEink}
      onEinkChange={(enable) => setTheme(enable ? (isDark ? 'e-ink-dark' : 'e-ink-light') : isDark ? 'dark' : 'light')}
      supportUrl=""
    />
  )
}
