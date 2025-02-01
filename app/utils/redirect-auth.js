import { AUTH } from '../constants/urls';

/**
 * Redirects to the GitHub authorization URL with the current window's location
 * as the redirect URL.
 * @function redirectAuth
 * @memberof utils
 */

export default function redirectAuth() {
  let authUrl = AUTH.GITHUB_SIGN_IN;
  if (typeof window !== 'undefined' && window.location) {
    const url = new URL(authUrl);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set('redirectURL', window.location.href);
    url.search = searchParams.toString();
    window.location.href = url.toString();
  }
}
