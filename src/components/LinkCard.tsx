import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@all/ui'
import type { LinkItem } from '../data/links'
import { useI18n } from '../i18n'

interface LinkCardProps {
  link: LinkItem
  index: number
}

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 24,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export function LinkCard({ link, index }: LinkCardProps) {
  const { locale, t } = useI18n()
  const Icon = link.icon

  const name = link.getTitle(t)
  const description = link.getDescription(t)
  const tags = link.tags[locale] || link.tags.en
  const visibleTags = tags.slice(0, 3)

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="tool-card link-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      role="link"
      aria-label={t.openAria(name)}
      id={`link-card-${link.id}`}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Animated sketch border: SVG rect with stroke-dashoffset animation */}
      <svg
        className="link-card-sketch-border"
        viewBox="0 0 300 220"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="1" y="1" width="298" height="218" rx="3" />
      </svg>

      <div>
        <span className="link-card-icon" aria-hidden="true">
          <Icon size={24} />
        </span>
        <h2 className="link-card-name">{name}</h2>
        <p className="link-card-description">{description}</p>
      </div>

      <div className="link-card-footer">
        <div className="link-card-tags" aria-label={t.toolTagsAria}>
          {visibleTags.map((tag) => (
            <Badge key={tag} size="sm">
              {tag}
            </Badge>
          ))}
        </div>
        <span className="link-card-play" aria-hidden="true">
          {t.open}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </span>
      </div>
    </motion.a>
  )
}
