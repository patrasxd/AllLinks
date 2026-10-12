import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, MotionProvider, useTheme } from '@all/ui'
import { I18nProvider } from './i18n'
import App from './App'
import '@fontsource/inter/latin-300.css'
import '@fontsource/inter/latin-ext-300.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-ext-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-ext-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-ext-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/inter/latin-ext-700.css'
import '@fontsource/inter/latin-800.css'
import '@fontsource/inter/latin-ext-800.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-ext-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import '@fontsource/jetbrains-mono/latin-ext-500.css'
import '@fontsource/jetbrains-mono/latin-600.css'
import '@fontsource/jetbrains-mono/latin-ext-600.css'
import '@fontsource/jetbrains-mono/latin-700.css'
import '@fontsource/jetbrains-mono/latin-ext-700.css'
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
