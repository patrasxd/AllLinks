import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, MotionProvider, useTheme } from '@all/ui'
import { I18nProvider } from './i18n'
import App from './App'
import './index.css'

function ThemedMotionProvider({ children }: { children: React.ReactNode }) {
  const { isEink } = useTheme()
  return <MotionProvider forcedNone={isEink}>{children}</MotionProvider>
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="alllinks:theme">
      <ThemedMotionProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </ThemedMotionProvider>
    </ThemeProvider>
  </StrictMode>,
)
