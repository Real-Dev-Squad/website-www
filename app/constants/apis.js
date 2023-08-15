import ENV from 'website-www/config/environment';

export const BASE_API_URL = ENV.BASE_API_URL;
export const JOIN_URL = `${BASE_API_URL}/users/self/intro`;

export const USER_JOINED_LINK = (userId) => {
  return `Real Dev Squad Verification Link: ${ENV.APPS.HOME}intro?id=${userId}`;
};
