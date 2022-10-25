// VF Flow: https://github.com/Real-Dev-Squad/website-www/issues/233
import {
  GITHUB_MOCK_URL,
  GITHUB_OBJECT_KEY,
  GITHUB_OAUTH,
} from './contants.js';

const doesGitHubCookieExist = () => {
  const cookieStr = document.cookie || '';
  const githubCookieStr = cookieStr
    .split('; ')
    .find((row) => row.startsWith('githubLogin='));

  return !!githubCookieStr;
};

const signInGitHubOAuth = () => {
  const originURL = window.location.origin;
  if (!originURL) return GITHUB_OAUTH;
  return GITHUB_OAUTH + '&state=' + originURL;
};

const updateGitHubLink = () => {
  const githubMock = JSON.parse(localStorage.getItem(GITHUB_OBJECT_KEY)) ?? {};
  const isGithubMockExpired =
    new Date().getTime() > (githubMock.expiresIn ?? 0);

  let signUpLink = GITHUB_MOCK_URL;
  if (githubMock.visited && !isGithubMockExpired) {
    signUpLink = signInGitHubOAuth();
  }

  const allLoginBtns = document.querySelectorAll('.btn-login');

  allLoginBtns.forEach((btn) => {
    btn.setAttribute('href', signUpLink);

    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const githubMock = {
        visited: true,
        expiresIn: new Date().getTime() + 15 ** 9,
      };
      localStorage.setItem(GITHUB_OBJECT_KEY, JSON.stringify(githubMock));
      window.location = btn.getAttribute('href');
    });
  });
};

export { doesGitHubCookieExist, updateGitHubLink };
