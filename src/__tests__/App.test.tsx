import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ThemeProvider } from '@all/ui'
import { I18nProvider } from '../i18n'
import App from '../App'

function renderApp() {
  return render(
    <ThemeProvider defaultTheme="dark" storageKey="test:theme">
      <I18nProvider>
        <App />
      </I18nProvider>
    </ThemeProvider>,
  )
}

describe('AllLinks Application', () => {
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
