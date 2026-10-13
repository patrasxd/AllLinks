import { test, expect } from '@playwright/test'
import { registerCatalogTests } from '../AllUI/browser-tests/catalog.mjs'
registerCatalogTests(test, expect, { appName: 'AllLinks', cardSelector: '.link-card', count: 6 })
