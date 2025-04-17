import { SELF_USER_PROFILE_URL, SELF_USERS_URL } from '../constants/apis';
import apiRequest from './api-request';

const registerUser = (user) => apiRequest(SELF_USERS_URL, 'GET', user);

const newRegisterUser = async (signupDetails, roles) => {
  const getResponse = await apiRequest(SELF_USER_PROFILE_URL);
  const userData = await getResponse.json();

  const res = await registerUser({
    ...signupDetails,
    roles: {
      ...userData.roles,
      ...roles,
    },
  });
  return res;
};

export { registerUser, newRegisterUser };
