# QNRTC Web Demo

## 运行

```
yarn install
npm run start
```

## 注意事项
- Chrome 只允许 localhost 或者 https 页面访问媒体设备(摄像头)，开发时请确保通过 localhost 来访问

## 代码说明

使用 mobx 和 react 进行开发，关于和连麦服务核心相关的代码在
[AppStore](./src/app/stores/AppStore.ts) 和
[RoomPage](./src/app/containers/RoomPage/index.tsx) 中    

