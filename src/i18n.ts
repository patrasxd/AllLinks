import React, { createContext, useContext, useEffect, useState } from 'react'

export type Locale = 'en' | 'pl'

export interface TranslationDictionary {
  appTitle: string
  heroEyebrow: string
  heroDescription: string
  linksCount: (n: number) => string
  allFilter: string
  filterLabel: string
  categoryProjects: string
  categorySocial: string
  allGamesTitle: string
  allGamesDesc: string
  allToolsTitle: string
  allToolsDesc: string
  githubTitle: string
  githubDesc: string
  youtubeTitle: string
  youtubeDesc: string
  xTitle: string
  xDesc: string
  linkedinTitle: string
  linkedinDesc: string
  open: string
  openAria: (name: string) => string
  toolTagsAria: string
  language: string
  theme: string
  darkMode: string
  lightMode: string
  einkMode: string
  einkOff: string
  einkOn: string
  preferences: string
  menuToggleAria: string
  closeMenuAria: string
  legalNotice: string
  copyright: string
}

export const translations: Record<Locale, TranslationDictionary> = {
  en: {
    appTitle: 'AllLinks',
    heroEyebrow: 'Portfolio',
    heroDescription: 'Directory of web projects, open-source repositories, and social profiles.',
    linksCount: (n: number) => (n === 1 ? '1 LINK' : `${n} LINKS`),
    allFilter: 'All',
    filterLabel: 'Filter by category',
    categoryProjects: 'Projects',
    categorySocial: 'Socials',
    allGamesTitle: 'AllGames',
    allGamesDesc: 'Offline web games collection crafted with sketch & ink aesthetics.',
    allToolsTitle: 'AllTools',
    allToolsDesc: 'Private, offline browser utilities. Zero ads, zero tracking.',
    githubTitle: 'GitHub',
    githubDesc: 'Open-source projects, repositories, and developer activity.',
    youtubeTitle: 'YouTube',
    youtubeDesc: 'Check my latest videos.',
    xTitle: 'X (Twitter)',
    xDesc: 'Updates, thoughts, and development notes.',
    linkedinTitle: 'LinkedIn',
    linkedinDesc: 'Professional background, career, and contact.',
    open: 'Open',
    openAria: (name: string) => `Open ${name} (opens in new tab)`,
    toolTagsAria: 'Tags',
    language: 'Language',
    theme: 'Theme',
    darkMode: 'Dark',
    lightMode: 'Light',
    einkMode: 'E-Ink (Reader)',
    einkOff: 'Off',
    einkOn: 'On',
    preferences: 'Preferences',
    menuToggleAria: 'Toggle menu',
    closeMenuAria: 'Close menu',
    legalNotice: 'Legal Notice & Privacy',
    copyright: 'AllLinks © 2026. Free & Open Source.',
  },
  pl: {
    appTitle: 'AllLinks',
    heroEyebrow: 'Portfolio',
    heroDescription: 'Katalog projektów internetowych, repozytoriów open-source i profili.',
    linksCount: (n: number) => (n === 1 ? '1 LINK' : `${n} LINKÓW`),
    allFilter: 'Wszystkie',
    filterLabel: 'Filtruj według kategorii',
    categoryProjects: 'Projekty',
    categorySocial: 'Społeczność',
    allGamesTitle: 'AllGames',
    allGamesDesc: 'Kolekcja gier webowych offline w estetyce szkicu i tuszu.',
    allToolsTitle: 'AllTools',
    allToolsDesc: 'Prywatne narzędzia przeglądarkowe offline. Bez reklam i śledzenia.',
    githubTitle: 'GitHub',
    githubDesc: 'Projekty open source, repozytoria i kod źródłowy.',
    youtubeTitle: 'YouTube',
    youtubeDesc: 'Sprawdź moje najnowsze filmy.',
    xTitle: 'X (Twitter)',
    xDesc: 'Aktualności, przemyślenia i notatki z prac.',
    linkedinTitle: 'LinkedIn',
    linkedinDesc: 'Profil zawodowy, kariera i kontakt.',
    open: 'Otwórz',
    openAria: (name: string) => `Otwórz ${name} (otwiera w nowej karcie)`,
    toolTagsAria: 'Tagi',
    language: 'Język',
    theme: 'Motyw',
    darkMode: 'Ciemny',
    lightMode: 'Jasny',
    einkMode: 'E-Ink (Czytnik)',
    einkOff: 'Wył.',
    einkOn: 'Wł.',
    preferences: 'Ustawienia',
    menuToggleAria: 'Przełącz menu',
    closeMenuAria: 'Zamknij menu',
    legalNotice: 'Nota prawna & Prywatność',
    copyright: 'AllLinks © 2026. Wolne i Otwarte Oprogramowanie.',
  },
}

export type Translations = TranslationDictionary

const STORAGE_KEY = 'alllinks:language'

function detectInitialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'pl') return saved

    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('pl')) return 'pl'
    return 'en'
  } catch {
    return 'en'
  }
}

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale)

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem(STORAGE_KEY, newLocale)
    } catch {}
  }

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const t = translations[locale]

  return React.createElement(
    I18nContext.Provider,
    { value: { locale, setLocale, t } },
    children,
  )
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
