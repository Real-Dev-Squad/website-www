import { updateGitHubLink } from '/js/github.js';
import { fetchData } from '/js/user.js';

window.addEventListener(
  'DOMContentLoaded',
  fetchData().catch((err) => updateGitHubLink()),
);
