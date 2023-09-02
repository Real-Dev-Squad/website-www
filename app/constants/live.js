export const ROLES = {
  host: 'host',
  maven: 'maven',
  moderator: 'moderator',
  guest: 'guest',
};
export const BUTTONS_TYPE = {
  SCREEN_SHARE: 'screen-share',
  COPY_LINK: 'copy-link',
  LEAVE_ROOM: 'leave-room',
};

export const API_METHOD = { POST: 'POST', GET: 'GET', PATCH: 'PATCH' };

export const PATCH_API_CONFIGS = {
  method: API_METHOD.PATCH,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

export const POST_API_CONFIGS = {
  method: API_METHOD.POST,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

export const GET_API_CONFIGS = {
  method: API_METHOD.GET,
  headers: {
    'Content-Type': 'application/json',
  },
};
