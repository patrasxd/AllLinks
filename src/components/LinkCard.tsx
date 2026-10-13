import { CatalogCard } from '@all/ui'
import type { LinkItem } from '../data/links'
import { useI18n } from '../i18n'

export function LinkCard({ link, index }: { link: LinkItem; index: number }) {
  const { locale, t } = useI18n()
  const Icon = link.icon
  const name = link.getTitle(t)
  return (
    <CatalogCard
      id={`link-card-${link.id}`}
      className="link-card"
      href={link.url}
      external
      title={name}
      description={link.getDescription(t)}
      icon={<Icon size={24} />}
      tags={(link.tags[locale] || link.tags.en).slice(0, 3)}
      tagsLabel={t.toolTagsAria}
      actionLabel={t.open}
      ariaLabel={t.openAria(name)}
      clampDescription
      actionTone="dim"
      index={index}
    />
  )
}
