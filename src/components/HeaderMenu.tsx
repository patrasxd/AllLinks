import { HeaderMenu as UiHeaderMenu, useTheme } from '@all/ui'
import { useI18n } from '../i18n'

export function HeaderMenu() {
  const { theme, setTheme, isEink, isDark } = useTheme()
  const { locale, setLocale, t } = useI18n()

  return (
    <UiHeaderMenu
      locale={locale}
      onLocaleChange={(loc) => setLocale(loc as any)}
      theme={theme}
      onThemeChange={(th) => setTheme(th as any)}
      isEink={isEink}
      onEinkChange={(enable) =>
        setTheme(
          enable
            ? isDark
              ? 'e-ink-dark'
              : 'e-ink-light'
            : isDark
            ? 'dark'
            : 'light',
        )
      }
      supportUrl=""
      labels={{
        language: t.language,
        theme: t.theme,
        darkMode: t.darkMode,
        lightMode: t.lightMode,
        einkMode: t.einkMode,
        einkOff: t.einkOff,
        einkOn: t.einkOn,
        preferences: t.preferences,
        menuToggleAria: t.menuToggleAria,
        closeMenuAria: t.closeMenuAria,
      }}
    />
  )
}
