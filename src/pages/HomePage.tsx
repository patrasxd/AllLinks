import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppFooter } from '@all/ui'
import { useI18n } from '../i18n'
import { LINKS_DATA, type LinkCategory } from '../data/links'
import { LinkCard } from '../components/LinkCard'

const heroVariants = {
  hidden: {},
  visible: () => ({
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  }),
}

const lineVariants = {
  hidden: () => ({
    opacity: 0,
    y: 20,
  }),
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export function HomePage() {
  const { t } = useI18n()
  const [selectedCategory, setSelectedCategory] = useState<LinkCategory | 'all'>('all')

  const filterOptions = useMemo(() => {
    return [
      { id: 'all' as const, label: t.allFilter, count: LINKS_DATA.length },
      {
        id: 'projects' as const,
        label: t.categoryProjects,
        count: LINKS_DATA.filter((l) => l.category === 'projects').length,
      },
      {
        id: 'social' as const,
        label: t.categorySocial,
        count: LINKS_DATA.filter((l) => l.category === 'social').length,
      },
    ]
  }, [t])

  const filteredLinks = useMemo(() => {
    if (selectedCategory === 'all') return LINKS_DATA
    return LINKS_DATA.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <motion.section
          className="home-hero"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          aria-labelledby="home-title"
        >
          <motion.p className="home-eyebrow" variants={lineVariants}>
            {t.heroEyebrow}
          </motion.p>
          <motion.h1 className="home-title" id="home-title" variants={lineVariants}>
            All<br />Links
          </motion.h1>
          <motion.p className="home-description" variants={lineVariants}>
            {t.heroDescription}
          </motion.p>
        </motion.section>

        {/* Filter Bar & Links Grid */}
        <section aria-labelledby="links-section-label">
          <div className="home-section-header">
            <motion.p
              className="home-links-label"
              id="links-section-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {t.linksCount(filteredLinks.length)}
            </motion.p>

            {/* Filter chips with active spring indicator */}
            <motion.div
              className="home-filters"
              role="group"
              aria-label={t.filterLabel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              {filterOptions.map((option) => {
                const isSelected = selectedCategory === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    id={`filter-${option.id}-btn`}
                    className={`home-filter-chip ${isSelected ? 'home-filter-chip--active' : ''}`}
                    onClick={() => setSelectedCategory(option.id)}
                  >
                    {isSelected && (
                      <motion.span
                        className="home-filter-indicator"
                        layoutId="activeFilterIndicator"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="home-filter-text">{option.label}</span>
                    <span className="home-filter-count">{option.count}</span>
                  </button>
                )
              })}
            </motion.div>
          </div>

          {/* Animated Links Grid */}
          <motion.div className="links-grid" role="list" layout>
            <AnimatePresence mode="popLayout">
              {filteredLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  role="listitem"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <LinkCard link={link} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Footer */}
        <AppFooter
          copyright={t.copyright}
          links={[
            {
              label: 'AllGames',
              href: 'https://patrasxd.github.io/AllGames/',
              external: true,
            },
            {
              label: 'AllTools',
              href: 'https://patrasxd.github.io/AllTools/',
              external: true,
            },
            {
              label: 'GitHub',
              href: 'https://github.com/patrasxd',
              external: true,
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/patryk-popio%C5%82ek-615048201/',
              external: true,
            },
          ]}
        />
      </div>
    </div>
  )
}
