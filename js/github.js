// VF Flow: https://github.com/Real-Dev-Squad/website-www/issues/233

const doesGitHubCookieExist = () => {
  const cookieStr = document.cookie || '';
  const githubCookieStr = cookieStr
    .split('; ')
    .find((row) => row.startsWith('githubLogin='));

  return !!githubCookieStr;
};
// const oldRedirectURL= `https://github.realdevsquad.com`
const redirectURL= `https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97`

const updateGitHubLink = () => {
  const allLoginBtns = document.querySelectorAll('.btn-login');
  allLoginBtns.forEach((btn) => {
    btn.setAttribute('href', redirectURL);
  });
};

export { doesGitHubCookieExist, updateGitHubLink };
