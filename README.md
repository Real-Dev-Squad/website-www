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

## Live-Site Feature Guides

- [Feature Overview](https://precodes.notion.site/Requirement-document-for-live-screen-share-feature-e8c0c1eea04947beb44ddb60e609aaec)

The goal of the Live-site feature is to enable users to share their screens during virtual sessions, enhancing the ability to collaborate and showcase their skills to potential employers and other developers. The aim is to create a feature that allows for seamless screen sharing and allows users who join the session late to quickly catch up on what has been discussed with the help of additional features like meeting notes, chat, word cloud, and more. This will make it easier for participants to stay engaged and informed, as well as attract new users who are browsing or curious about RDS.

- [Feature Description](https://github.com/Real-Dev-Squad/website-www/issues/343)

- [Feature Design (basic wireframe)](https://www.figma.com/file/O8QLwPzTuH3RIWoYdxitln/Live-Page?node-id=0%3A1&t=vKJPfNkUiuCXPoIl-0)

- [Feature Design (detailed design)](https://www.figma.com/file/2VtPGJH61Qp0iarkKW6KTO/Live-Site-Detailed-Designs?node-id=0-1)

- [Live-site delay while streaming](https://github.com/Real-Dev-Squad/website-www/issues/361)

- [Live survey while virtual session](https://github.com/Real-Dev-Squad/website-www/issues/359)
