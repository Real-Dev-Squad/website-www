import { APPS } from 'website-www/constants/urls';

export const JOIN_URL = `${APPS.API_BACKEND}/users/self/intro`;

export const APPLICATION_URL = (userId) => {
  return `${APPS.API_BACKEND}/users/${userId}/intro`;
};

export const USER_JOINED_LINK = (userId) => {
  return `Real Dev Squad Verification Link: ${APPS.HOME}/intro?id=${userId}`;
};
