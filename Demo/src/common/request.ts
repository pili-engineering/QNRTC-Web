
export default (input: RequestInfo, method?: string, body?: any): Promise<string | any> => {
  return fetch(input, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: method || 'GET',
    body: body ? JSON.stringify(body) : null,
  })
  .then(res => {
    if (!res.ok) return Promise.reject(new Error(res.statusText));
    const contentType = res.headers.get('content-type')
    if (contentType) {
      if (contentType.includes('text/plain')) {
        return res.text();
      } else if (contentType.includes('application/json')) {
        return res.json();
      } else {
        return res.text();
      }
    }
  });
};
