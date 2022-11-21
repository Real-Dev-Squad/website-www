// VF Flow: https://github.com/Real-Dev-Squad/website-www/issues/233
import { GITHUB_OAUTH } from './constants.js';

const signInGitHubOAuth = () => {
  const originURL = window.location.href;
  if (!originURL) return GITHUB_OAUTH;
  return GITHUB_OAUTH + '&state=' + originURL;
};

const updateGitHubLink = () => {
  let signUpLink = signInGitHubOAuth();

  const allLoginBtns = document.querySelectorAll('.btn-login');

  allLoginBtns.forEach((btn) => {
    btn.setAttribute('href', signUpLink);
  });
};

export { updateGitHubLink };
