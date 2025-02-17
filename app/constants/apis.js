import { APPS } from 'website-www/constants/urls';

export const JOIN_URL = `${APPS.API_BACKEND}/users/self/intro`;

export const APPLICATION_URL = (userId) => {
  return `${APPS.API_BACKEND}/users/${userId}/intro`;
};

export const USER_JOINED_LINK = (userId) => {
  return `${APPS.HOME}/intro?id=${userId}`;
};

export const USER_APPLICATION_LINK = (userId) => {
  return `${APPS.DASHBOARD}/applications?id=${userId}`;
};

export const APPLICATION_ID_LINK = (id) => {
  return `${APPS.DASHBOARD}/applications/?id=${id}`;
};

export const UPDATE_USER_STATUS = `${APPS.API_BACKEND}/users/status/self?userStatusFlag=true`;

export const UPDATE_USER_STATUS_FOR_DEV = `${APPS.API_BACKEND}/requests?dev=true`;

export const FETCH_USER_PROFILE = `${APPS.API_BACKEND}/users?profile=true`;
