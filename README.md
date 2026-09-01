# website-www

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with yarn)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd website-www`
- `pnpm install`

## Running / Development

- `ember serve`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `ember test`
- `ember test --server`

### Linting

- `pnpm run lint`
- `pnpm run lint:fix`

### Building

- `ember build` (development)
- `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## CI Maintenance

The GitHub Actions in [`.github/workflows`](.github/workflows) are pinned to
full commit SHAs (with the release tag in a trailing comment), so a compromised
action repository cannot change the code our CI runs by moving a tag.

The trade-off is that pins never update themselves. Refresh them periodically
(every few months, or when an action ships a fix we need):

1. Find the latest release and its commit SHA:
   `git ls-remote --tags https://github.com/actions/checkout 'refs/tags/v5*'`
   (for annotated tags, use the peeled `^{}` entry, which is the actual commit)
2. Update the `uses:` line with the new SHA and update the version comment in
   the same edit, so the comment never lies about what the SHA points to.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
