// VF Flow: https://github.com/Real-Dev-Squad/website-www/issues/233

const doesGitHubCookieExist = () => {
  const cookieStr = document.cookie || '';
  const githubCookieStr = cookieStr
    .split('; ')
    .find((row) => row.startsWith('githubLogin='));

  return !!githubCookieStr;
};

const updateGitHubLink = () => {
  const allLoginBtns = document.querySelectorAll('.btn-login');
  allLoginBtns.forEach((btn) => {
    btn.setAttribute(
      'href',
      'https://github.realdevsquad.com',
    );
  });
};

export { doesGitHubCookieExist, updateGitHubLink };
