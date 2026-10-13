import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppFooter, DirectoryHero, CatalogSectionHeader, CatalogGrid, FilterGroup, useMotion } from '@all/ui'
import { useI18n } from '../i18n'
import { LINKS_DATA, type LinkCategory } from '../data/links'
import { LinkCard } from '../components/LinkCard'

export function HomePage() {
  const { t } = useI18n()
  const { isMotionEnabled } = useMotion()
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
        <DirectoryHero
          title={
            <>
              All
              <br />
              Links
            </>
          }
          eyebrow={t.heroEyebrow}
          description={t.heroDescription}
          tone="dim"
          compactMobile
        />

        {/* Filter Bar & Links Grid */}
        <section aria-labelledby="links-section-label">
          <CatalogSectionHeader
            label={t.linksCount(filteredLinks.length)}
            labelId="links-section-label"
            tone="dim"
            filters={
              <>
                <FilterGroup
                  label={t.filterLabel}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  options={filterOptions.map((option) => ({
                    ...option,
                    value: option.id,
                    buttonId: `filter-${option.id}-btn`,
                  }))}
                />
              </>
            }
          />

          {/* Animated Links Grid */}
          <CatalogGrid className="links-grid" singleColumnAt="medium">
            <AnimatePresence mode="popLayout">
              {filteredLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  role="listitem"
                  layout={isMotionEnabled}
                  initial={isMotionEnabled ? { opacity: 0, scale: 0.95 } : false}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={isMotionEnabled ? { opacity: 0, scale: 0.95 } : undefined}
                  transition={isMotionEnabled ? { duration: 0.35, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
                >
                  <LinkCard link={link} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </CatalogGrid>
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
