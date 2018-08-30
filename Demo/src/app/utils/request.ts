import {
  HOST, PREFIX,
  HTTP_STATUS_ERROR,
} from '../constants';


export async function request(path: string, dataType?: 'json' | 'text', method?: string, body?: any): Promise<any> {
  try {
    const res = await fetch(`${HOST}${PREFIX}${path}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: method || 'GET',
      body: body ? JSON.stringify(body) : null,
    });

    if (!res.ok) {
      throw HTTP_STATUS_ERROR(res.status, res.statusText);
    }

    switch (dataType) {
      case 'text':
        return res.text();
      case 'json':
      default:
        return res.json();
    }

  } catch (e) {
    throw e;
  }
}

export async function waitResponse(url: string, timeout: number): Promise<void> {
  let flag = true;
  const fetchPromise = async () => {
    while (flag) {
      try {
        const res = await fetch(url);
        if (res.status !== 200) {
          throw new Error(res.status.toString());
        }
        break;
      } catch (e) {
        console.log(e, flag);
      }
    }
  };
  const timeoutPromise = () => new Promise(resolve => {
    setTimeout(resolve, timeout, "timeout");
  });

  const v = await Promise.race([fetchPromise(), timeoutPromise()]);
  flag = false;
  console.log('v', v);
  if (v === "timeout") {
    throw new Error('timeout!');
  }
}
