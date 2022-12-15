import { LOGIN_COOKIE_NAME } from '../constants/cookie';

export default function checkAuth() {
  return document.cookie.includes(LOGIN_COOKIE_NAME);
}
