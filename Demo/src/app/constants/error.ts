export const HTTP_STATUS_ERROR = (code, msg) => {
  switch (code) {
    default:
      return DEFAULT_STATUS_ERROR(code, msg);
  }
};

export const DEFAULT_STATUS_ERROR = (code, msg) => new Error(`10001: HTTP状态码错误,Code: ${code}, Msg: ${msg}`);

export const FETCH_ERROR = e => new Error(`10002: 网络错误`);
