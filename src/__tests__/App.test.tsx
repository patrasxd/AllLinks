import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { ThemeProvider, MotionProvider, useTheme } from '@all/ui'
import { I18nProvider } from '../i18n'
import App from '../App'

function ThemedApp() {
  const { isEink } = useTheme()
  return (
    <MotionProvider forcedNone={isEink}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </MotionProvider>
  )
}

function renderApp() {
  return render(
    <ThemeProvider defaultTheme="dark" storageKey="test:theme">
      <ThemedApp />
    </ThemeProvider>,
  )
}

describe('AllLinks Application', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('alllinks:language', 'en')
  })

  it('switches language and persists it across remounts', () => {
    const app = renderApp()
    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
    fireEvent.click(screen.getByRole('button', { name: 'Polski' }))
    expect(document.documentElement.lang).toBe('pl')
    expect(localStorage.getItem('alllinks:language')).toBe('pl')
    expect(screen.getByRole('button', { name: /Projekty/ })).toBeInTheDocument()
    app.unmount()
    renderApp()
    expect(screen.getByRole('button', { name: /Projekty/ })).toBeInTheDocument()
  })

  it('switches all four themes and disables motion for E-Ink', () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
    fireEvent.click(screen.getByRole('button', { name: 'Light' }))
    expect(document.documentElement.dataset.theme).toBe('light')
    fireEvent.click(screen.getByRole('button', { name: 'On' }))
    expect(document.documentElement.dataset.theme).toBe('e-ink-light')
    expect(document.documentElement.dataset.motion).toBe('none')
    fireEvent.click(screen.getByRole('button', { name: 'Dark' }))
    expect(document.documentElement.dataset.theme).toBe('e-ink-dark')
    fireEvent.click(screen.getByRole('button', { name: 'Off' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(document.documentElement.dataset.motion).toBe('normal')
    expect(localStorage.getItem('test:theme')).toBe('dark')
  })

  it('closes the menu with Escape and outside click', async () => {
    renderApp()
    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }))
    fireEvent.mouseDown(document.body)
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('exposes valid HTTPS destinations and safe external links', () => {
    renderApp()
    for (const link of screen.getAllByRole('link')) {
      expect(new URL(link.getAttribute('href')!).protocol).toBe('https:')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
  it('renders hero title and ecosystem links', () => {
    renderApp()

    // Title
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/all\s*links/i)

    // Sibling apps
    expect(screen.getAllByText('AllGames').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('AllTools').length).toBeGreaterThanOrEqual(1)

    // Socials
    expect(screen.getByText('GitHub', { selector: 'h2' })).toBeInTheDocument()
    expect(screen.getByText('YouTube')).toBeInTheDocument()
    expect(screen.getByText('X (Twitter)')).toBeInTheDocument()
    expect(screen.getAllByText('LinkedIn').length).toBeGreaterThanOrEqual(1)
  })

  it('renders external links with target="_blank"', () => {
    renderApp()

    const allGamesLinks = screen.getAllByRole('link', { name: /allgames/i })
    expect(allGamesLinks[0]).toHaveAttribute('href', 'https://patrasxd.github.io/AllGames/')
    expect(allGamesLinks[0]).toHaveAttribute('target', '_blank')
    expect(allGamesLinks[0]).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('filters links when category chips are clicked', async () => {
    renderApp()

    // Initially all 6 links are rendered
    expect(screen.getByText('6 LINKS')).toBeInTheDocument()

    // Click Projects filter
    const projectsFilter = screen.getByRole('button', { name: /projects/i })
    fireEvent.click(projectsFilter)

    expect(screen.getByText('2 LINKS')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByText('GitHub', { selector: 'h2' })).not.toBeInTheDocument()
    })
    expect(screen.getByText('AllGames', { selector: 'h2' })).toBeInTheDocument()
  })
})
