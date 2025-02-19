# MyIndia

# Project Structure Guide

## Common Elements

- All pages should use the template from `/templates/base.html`
- Header and footer are automatically loaded via `components.js`
- Navigation is consistent across all pages
- Floating navigation is available on all pages

## Required in all HTML files:

1. Header placeholder: `<div id="header-placeholder"></div>`
2. Footer placeholder: `<div id="footer-placeholder"></div>`
3. Common CSS files
4. Common JavaScript files

## Creating New Pages:

1. Copy template from `/templates/base.html`
2. Set appropriate meta tags and title
3. Add page-specific CSS if needed
4. Add page content in `<main>` section
5. Add any page-specific scripts at the bottom

## File Organization:

- `/includes/components/` - Header and footer HTML
- `/assets/css/` - All CSS files
- `/js/` - All JavaScript files
- `/pages/` - All content pages
- `/templates/` - Base templates
