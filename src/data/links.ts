import React from 'react'
import {
  GamepadIcon,
  ToolsIcon,
  GithubIcon,
  YoutubeIcon,
  XIcon,
  LinkedinIcon,
} from '../components/icons'
import type { Translations } from '../i18n'

export type LinkCategory = 'projects' | 'social'

export interface LinkItem {
  id: string
  url: string
  category: LinkCategory
  icon: React.ComponentType<{ size?: number | string; className?: string }>
  tags: { en: string[]; pl: string[] }
  getTitle: (t: Translations) => string
  getDescription: (t: Translations) => string
}

export const LINKS_DATA: LinkItem[] = [
  // ── Sibling Projects ──
  {
    id: 'allgames',
    url: 'https://patrasxd.github.io/AllGames/',
    category: 'projects',
    icon: GamepadIcon,
    tags: {
      en: ['Games', 'Offline'],
      pl: ['Gry', 'Offline'],
    },
    getTitle: (t) => t.allGamesTitle,
    getDescription: (t) => t.allGamesDesc,
  },
  {
    id: 'alltools',
    url: 'https://patrasxd.github.io/AllTools/',
    category: 'projects',
    icon: ToolsIcon,
    tags: {
      en: ['Tools', 'Offline'],
      pl: ['Narzędzia', 'Offline'],
    },
    getTitle: (t) => t.allToolsTitle,
    getDescription: (t) => t.allToolsDesc,
  },

  // ── Social & Developer Profiles ──
  {
    id: 'github',
    url: 'https://github.com/patrasxd',
    category: 'social',
    icon: GithubIcon,
    tags: {
      en: ['Code', 'Open Source'],
      pl: ['Kod', 'Open Source'],
    },
    getTitle: (t) => t.githubTitle,
    getDescription: (t) => t.githubDesc,
  },
  {
    id: 'youtube',
    url: 'https://youtube.com/@patrasxd',
    category: 'social',
    icon: YoutubeIcon,
    tags: {
      en: ['Videos'],
      pl: ['Wideo'],
    },
    getTitle: (t) => t.youtubeTitle,
    getDescription: (t) => t.youtubeDesc,
  },
  {
    id: 'x',
    url: 'https://x.com/patrasxd',
    category: 'social',
    icon: XIcon,
    tags: {
      en: ['Social'],
      pl: ['Wpisy'],
    },
    getTitle: (t) => t.xTitle,
    getDescription: (t) => t.xDesc,
  },
  {
    id: 'linkedin',
    url: 'https://www.linkedin.com/in/patryk-popio%C5%82ek-615048201/',
    category: 'social',
    icon: LinkedinIcon,
    tags: {
      en: ['Career'],
      pl: ['Kariera'],
    },
    getTitle: (t) => t.linkedinTitle,
    getDescription: (t) => t.linkedinDesc,
  },
]
