import { decodeAudioData, TrackBaseInfo } from 'pili-rtc-web';
import seedrandom from 'seedrandom';

export function randomNumberGen(): number {
  const buf = new Uint8Array(1);
  window.crypto.getRandomValues(buf);
  return buf[0];
}

export const verifyId = (str: string): boolean =>
  /^[0-9a-zA-z-_]{3,}$/.test(str);


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
