import { AppHeader } from '@all/ui'
import { HeaderMenu } from './components/HeaderMenu'
import { HomePage } from './pages/HomePage'
import { useI18n } from './i18n'

export default function App() {
  const { t } = useI18n()

  return (
    <>
      <AppHeader
        logo={
          <button
            type="button"
            className="header-logo"
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
            aria-label={t.appTitle}
          >
            <span>AllLinks</span>
          </button>
        }
        menu={<HeaderMenu />}
      />

      <main className="app-main">
        <HomePage />
      </main>
    </>
  )
}
