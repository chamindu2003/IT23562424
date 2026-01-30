// Adjust baseURL to your app’s URL
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000', // replace with your app URL
    headless: true
  },
  webServer: {
    command: 'node dev-server.js 3001',
    url: 'http://localhost:3001',
    timeout: 120000,
    reuseExistingServer: true,
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]]
});
