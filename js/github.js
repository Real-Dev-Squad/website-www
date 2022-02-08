// VF Flow: https://github.com/Real-Dev-Squad/website-www/issues/233

const doesGitHubCookieExist = () => {
  const cookieStr = document.cookie || '';
  const githubCookieStr = cookieStr
    .split('; ')
    .find((row) => row.startsWith('githubLogin='));

  return !!githubCookieStr;
};

export { doesGitHubCookieExist };
