import { decodeAudioData, TrackBaseInfo } from 'pili-rtc-web';
import seedrandom from 'seedrandom';

export function randomNumberGen(): number {
  const buf = new Uint8Array(1);
  window.crypto.getRandomValues(buf);
  return buf[0];
}

export const verifyUserId = (str: string): boolean =>
  /^[a-zA-Z0-9_-]{3,50}$/.test(str);

export const verifyRoomId = (str: string): boolean =>
  /^[a-zA-Z0-9_-]{3,64}$/.test(str);

export function decodeAudioFileToBuffer(file: File): Promise<AudioBuffer> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      decodeAudioData(data).then(resolve);
    };

    reader.readAsArrayBuffer(file);
  });
}

export function getTrackNmae(track: TrackBaseInfo): string {
  switch (track.tag) {
    case "screen":
      return "屏幕共享";
    case "camera":
      return "摄像头";
    default:
      break;
  }
  if (track.kind === "audio") {
    return "音频";
  } else {
    return "视频";
  }
}

export function getColorFromUserId(userId: string): string {
  const colors = [
    '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#009688', '#4caf50', '#ff9800', '#795548',
  ];
  const rand = seedrandom(userId);
  return colors[Math.min(Math.floor(rand() * 8), 7)];
}

export function timeout(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function retrying(
  func: (stop: (err?: any) => void) => Promise<any>,
  timeout: number
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    let flag = true;
    const stop = (err: any) => {
      flag = false;
      reject(err);
    };
    setTimeout(stop, timeout, new Error('timeout!'));
    while (flag) {
      try {
        const res = await func(stop);
        resolve(res);
        return;
      } catch (e) {
        console.log('retrying', e, flag);
      }
    }
  });
}

export function randomStringGen(strLength: number = 5): string {
  const arr = new Uint8Array((strLength || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}

function dec2hex (dec: number): string {
  return ("0" + dec.toString(16)).substr(-2);
}
