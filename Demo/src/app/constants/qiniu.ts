export const RTC_APP_ID = 'd8lk7l4ed'; // 正式 appid
// export const RTC_APP_ID = 'dbvtilrmq'; // 测试 appid

export const HOST = 'https://api-demo.qnsdk.com';
export const PREFIX = '/v1/rtc';

export const API = {
  LIST_ROOM: `/rooms/app/${RTC_APP_ID}`,
  JOIN_ROOM_TOKEN: (roomName, user) => `/token/app/${RTC_APP_ID}/room/${roomName}/user/${user}`,
  CREATE_ROOM_TOKEN: (roomName, user) => `/token/admin/app/${RTC_APP_ID}/room/${roomName}/user/${user}`,
};
