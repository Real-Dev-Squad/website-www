import { updateGitHubLink } from '/js/github.js';
import { fetchUserSelfData  } from '/js/user.js';

window.addEventListener(
  'DOMContentLoaded',
  fetchUserSelfData().catch((err) => updateGitHubLink()),
);
