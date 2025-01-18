import { AUTH } from '../constants/urls';

export default function () {
  let authUrl = AUTH.GITHUB_SIGN_IN;
  if (typeof window !== 'undefined' && window.location) {
    const separator = authUrl.includes('?') ? '&' : '?';
    authUrl = `${authUrl}${separator}redirectURL=${encodeURIComponent(window.location.href)}`;
    window.open(authUrl, '_self');
  }
}
