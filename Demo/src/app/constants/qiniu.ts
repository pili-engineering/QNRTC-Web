export const RTC_APP_ID = process.env.TEST_ENV ? 'd79zybi3q' : 'd8lk7l4ed';
// export const RTC_APP_ID = 'dgip3ldfh';

export const HOST = process.env.TEST_ENV ? '' : 'https://api-demo.qnsdk.com';
export const PREFIX = '/v1/rtc';

export const API = {
  LIST_ROOM: `/rooms/app/${RTC_APP_ID}`,
  LIST_USERS: (appid, roomName) => `/users/app/${appid || RTC_APP_ID}/room/${roomName}`,
  GET_APP_CONFIG: (appid?) => `/app/${appid || RTC_APP_ID}`,
  JOIN_ROOM_TOKEN: (roomName, user, appid?) => `/token/app/${appid || RTC_APP_ID}/room/${roomName}/user/${user}`,
  CREATE_ROOM_TOKEN: (roomName, user, appid?) => `/token/admin/app/${appid || RTC_APP_ID}/room/${roomName}/user/${user}`,
};

export const LIVE_HOST = roomName => `https://pili-hdl.qnsdk.com/sdk-live/${roomName}.flv`;
export const HLS_HOST = roomName => `https://pili-hls.qnsdk.com/sdk-live/${roomName}.m3u8`
