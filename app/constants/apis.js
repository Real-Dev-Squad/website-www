import ENV from 'website-www/config/environment';

const BASE_API_URL = ENV.BASE_API_URL;
export const JOIN_URL = `${BASE_API_URL}/users/self/intro`;

export const USER_JOINED_LINK = (userId)=>{
    return `https://api.realdevsquad.com/users/${userId}/intro`;
}