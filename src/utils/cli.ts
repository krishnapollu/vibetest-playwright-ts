#!/usr/bin/env ts-node
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .name('testfw-cli')
  .description('Advanced CLI for Playwright Test Framework')
  .version('1.0.0');

program
  .command('scaffold:test <name>')
  .description('Scaffold a new test file')
  .action((name) => {
    const filePath = path.join('src/tests/ui', `${name}.spec.ts`);
    if (fs.existsSync(filePath)) {
      console.error('Test file already exists!');
      process.exit(1);
    }
    fs.writeFileSync(filePath, `import { test, expect } from '@playwright/test';\n\ntest('${name}', async ({ page }) => {\n  // TODO: Implement test\n  await page.goto('/');\n  expect(true).toBeTruthy();\n});\n`);
    console.log(`Created test: ${filePath}`);
  });

program
  .command('scaffold:page <name>')
  .description('Scaffold a new Page Object Model class')
  .action((name) => {
    const className = name.charAt(0).toUpperCase() + name.slice(1) + 'Page';
    const filePath = path.join('src/pages', `${className}.ts`);
    if (fs.existsSync(filePath)) {
      console.error('Page file already exists!');
      process.exit(1);
    }
    fs.writeFileSync(filePath, `import { Page } from '@playwright/test';\nimport { BasePage } from './BasePage';\n\nexport class ${className} extends BasePage {\n  constructor(page: Page) {\n    super(page);\n  }\n  // TODO: Add page methods\n}\n`);
    console.log(`Created page: ${filePath}`);
  });

program
  .command('clean:logs')
  .description('Clean logs directory')
  .action(() => {
    const dir = 'logs';
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir);
    console.log('Logs cleaned.');
  });

program
  .command('clean:reports')
  .description('Clean reports directory')
  .action(() => {
    const dir = 'reports';
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir);
    console.log('Reports cleaned.');
  });

program.parse(process.argv); 