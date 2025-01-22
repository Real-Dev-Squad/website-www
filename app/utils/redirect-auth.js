import { AUTH } from '../constants/urls';

export default function redirectAuth() {
  let authUrl = AUTH.GITHUB_SIGN_IN;
  if (typeof window !== 'undefined') {
    const url = new URL(authUrl);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set('redirectURL', window.location.href);
    url.search = searchParams.toString();
    window.location.href = url.toString();
  }
}
