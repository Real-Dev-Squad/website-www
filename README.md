[![Netlify Status](https://api.netlify.com/api/v1/badges/f178400b-1528-4bae-b454-8cddfd2fde0b/deploy-status)](https://app.netlify.com/sites/realdevsquad/deploys)
[![Better Uptime Badge](https://betteruptime.com/status-badges/v1/monitor/5hut.svg)](https://betteruptime.com/?utm_source=status_badge)

# Website

Welcome to Real Dev Squad

Code deployed on: https://realdevsquad.netlify.app/, then served to our domain

#### Production Site -> https://www.realdevsquad.com/

#### Staging Site -> https://staging-realdevsquad.netlify.app/

## Running the project

Run `npm install` after opening the repository in your editor. This will install all the necessary packages for the project which are mentioned in the `pacakage.json` file of the project.

## API Calls

For accessing APIs of Real Dev Squad, do follow this doc.
https://github.com/Real-Dev-Squad/docs/tree/main/docs/dev/https-dev-url-cors

## Scripts used in project

- `npm run check` checks the formatting of all the files in the project. This script runs in a pre-commit hook. It will warn about the improper formatting present in the file.
- `npm run fix` can be run for fixing the formatting before commiting your changes or to solve the formatting errors one may get while commiting the changes.

**Note** :warning: : Do run these scripts before raising the PR

## CSS Structure

### Global CSS

- `main.css`
  - This css file will contain common css pertaining to all pages that can be used throughout the website.
  - For example, a class with name success, when used anywhere throughout the website will make the color of the text green.

### Page specific CSS

- For example, events page css goes inside `events.css`.
- Also, in future if we add new components, we will keep component specific css like `navbar.css`, `footer.css`, `header.css` etc.
- For mobile responsive css, we can have a folder with multiple css files catering to different css pertaining to different resolutions.
