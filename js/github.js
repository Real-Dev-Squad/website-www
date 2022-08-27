// VF Flow: https://github.com/Real-Dev-Squad/website-www/issues/233
const GITHUB_MOCK_URL = "https://github.realdevsquad.com/"

const doesGitHubCookieExist = () => {
  const cookieStr = document.cookie || '';
  const githubCookieStr = cookieStr
    .split('; ')
    .find((row) => row.startsWith('githubLogin='));

  return !!githubCookieStr;
};

const SIGN_IN_GITHUB_OAUTH = () => {
    let originURL = window?.location?.origin ?? "/";
    let githubOauth = 'https://github.com/login/oauth/authorize?client_id=45f5cee93a0396939229&state=';
    let encodedOriginURL = btoa(originURL)

    return githubOauth + encodedOriginURL;
}

const updateGitHubLink = () => {
    const githubMock = JSON.parse(localStorage.getItem('githubMock')) ?? {};
    const githubMockExpired = new Date().getTime() > (githubMock.expiresIn ?? 0);

    let signUpLink = GITHUB_MOCK_URL

    if (githubMock.visited && !githubMockExpired) {
        signUpLink = SIGN_IN_GITHUB_OAUTH()
    }

    const allLoginBtns = document.querySelectorAll('.btn-login');
    allLoginBtns.forEach((btn) => {
        btn.setAttribute('href', signUpLink);


        btn.addEventListener('click', (event) => {
            event.preventDefault()
            let githubMock = {
                visited: true,
                expiresIn: new Date().getTime() + 15 ** 9
            }
            localStorage.setItem('githubMock', JSON.stringify(githubMock))
            window.location = btn.getAttribute('href')
        })
    });
};

export { doesGitHubCookieExist, updateGitHubLink };
