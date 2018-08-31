# QNRTCWeb v1.2.0 发布

## 简介
QNRTCWeb 是七牛云推出的一款适用于 Web 平台的实时音视频 SDK，提供了包括音视频通话、静音、发布、订阅多种功能，提供灵活的接口，支持高度定制以及二次开发。

## API 变动

### 取消发布/取消订阅 更变为同步方法

```javascript
myRTC.unpublish()
myRTC.unsubscribe(xxx)
```

## 功能

### 增加持续订阅模式
普通订阅需要和对端的发布状态耦合，即只有发布方发布才订阅，发布方取消发布即订阅结束。    
持续订阅是指无视对端的发布状态，无论他是否发布都可以发起订阅并返回一个 Stream 对象。   
这个 Stream 对象可以立刻调用其的 play 方法，SDK 会自动检测对端的发布状态将媒体数据填充进 Stream 对象。  
只有当主动调用 unsubscribe 或者对端退出房间持续订阅才会结束。

```javascript
// 这里 myRTC 指的是实例化的 QNRTCSession 对象
// 第二个参数为 true，代表使用持续订阅模式订阅
const stream = await myRTC.subscribe(userId, true);
```

### 自动切换媒体设备的逻辑可以配置

```javascript
// 关闭自动切换设备（默认打开
deviceManager.autoSwitch = false;
```

### 增加媒体设备事件区分设备插入/设备拔出

```javascript
deviceManager.on("device-add", (device) => {
  console.log("检测到新设备"，device);
});
deviceManager.on("device-remove", (device) => {
  console.log("设备被移除"，device);
});
```

### 重复调用 getLocalStream 会自动切流（如果正在发布）

```javascript
const stream = await deviceManger.getLocalStream({ video: { enabled: true } });
await myRTC.publish(stream);

// 会自动切换到新的流上
await deviceManager.getLocalStream({ screen: { enabled: true }});

// 如果需要同时采集复数的流，可以实例化一个新的 deviceManager
import { DeviceManager } from "pili-rtc-web";
const newDeviceManager = new DeviceManager();
```

### 采集的分辨率支持范围配置

```javascript
const stream = await deviceManager.getLocalStream({
  video: {
    enabled: true,
    // width 希望能取到1280
    // 如果不能就在 600-1500的范围内选择一个摄像头支持的值，还是不能就抛出错误
    width: { min: 600, max: 1500, ideal: 1280 },
    // height 希望能取到720，如果失败就抛出错误
    height: { exact: 720 },
  }
})
```

### 增加音频采集参数控制 WebRTC 的一些音频优化选项

```javascript
deviceManager.getLocalStream({
  audio: {
    enabled: true,
    autoGainControl: false, // 关闭自动增益，默认打开
    echoCancellation: false, // 关闭回声消除，默认打开
    noiseSuppression: false, // 关闭噪声抑制，默认打开
  }
});
```

## 缺陷

* 修复 roomToken 非法无限重试的问题
* 修复 IE 引入 SDK 的 js 报错问题
* 修复 Firefox 候选交换导致连麦失败的问题


## 优化
* 增加连麦在弱网环境下的稳定性
* stream 的 onAudioBuffer 方法现在会直接返回 AudioBuffer 对象

## 问题反馈

当你遇到任何问题时，可以通过在 GitHub 的 repo 提交 `issues` 来反馈问题，请尽可能的描述清楚遇到的问题，如果有错误信息也一同附带，并且在 ```Labels``` 中指明类型为 bug 或者其他。

[通过这里查看已有的 issues 和提交 bug](https://github.com/pili-engineering/QNRTC-Web/issues)
