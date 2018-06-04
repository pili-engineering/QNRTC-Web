# 七牛 Javascript RTC SDK DOC

## 导航
 - [使用教程](#6-教程)
 - [API LIST](#7-api-list)
 - [事件列表](#8-事件列表)
 - [基本类型](#9-基本类型)
 - [错误处理](#10-错误处理)

## 1 概述
该 SDK 是基于 WebRTC 技术实现的一款多人实时音视频通话 SDK

## 2 阅读对象
本文档为开发者文档，阅读本文档前请确认   
- 有 Web 开发经验
- 有 HTML5 媒体 API 的基本知识
- 拥有七牛账户并且开通直播云服务

## 3 使用前提
开发者需要通过 [Server-API](https://github.com/pili-engineering/QNRTC-Server/blob/master/docs/api.md) 的说明，在后台搭建一个后台服务。前端通过请求搭建好的后台服务获取到一个房间的 `roomToken` 后，就开始进入该 SDK 工作流程。

## 4 引入方式
我们为开发者提供了 2 种引用方式

### 4.1 NPM
```shell
npm install --save pili-rtc-web
```
```javascript
import { QNRTCSession } from 'pili-rtc-web';
const myRTC = new QNRTCSession();

// 或者使用 default export
import QNRTC from 'pili-rtc-web';
const myRTC = new QNRTC.QNRTCSession();
```

### 4.2 直接引入
[下载地址](https://github.com/pili-engineering/QNRTC-Web/releases)  
```
<script src="./build/pili-rtc-web.js"></script>
<script>
var myRTC = new QNRTC.QNRTCSession();
</script>
```



## 5 代码格式说明

基于 Chrome 已经基本支持 async/await（或者使用 babel 等工具），其语法在复杂异步场景下逻辑处理更有优势，所以下面的代码将会用这种方式编写
当然，实际开发过程中，你也可以根据自己的喜好使用 Promise 的方案来编写      
如果你对 async/await 不了解，可以参考 [async 介绍](http://www.ruanyifeng.com/blog/2015/05/async.html)      


## 6 教程

### 6.1 简单开始，第一次发布

这里教程我们会使用 async/await 的方式来编写，请确保下面的代码运行在一个 async
函数包裹之下。比如 async iife。

```javascript
(async () => {
  // code goes here
})();
```

如果你想使用 promise，可以对下面的代码做一些简单的替换

```javascript
try {
  const a = await some_method();
} catch(e) {
  console.log(e);
}

// promise 写法
some_method().then(a => {
  
}).catch(e => {
  console.log(e);
})
```

好了，准备就绪之后，让我们准备开始进行第一次发布吧。 首先准备一个带 `<video>` 标签的页面，我们将会把摄像头预览放在这个元素中
```html
<body>
  <video id="localplayer" />
</body>
```

在开始发布之前，我们必须先加入一个房间。      
因为发布/订阅/控制等操作都是对应一个房间完成的，也就是说我们在一个房间内开始发布，房间的其他用户都可以获取到我们的数据流。      
在这里我们需要 1 个已知参数，`roomToken`， 关于这个参数的获取请参照上文提到的 [Server-API](https://github.com/pili-engineering/QNRTC-Server/blob/master/docs/api.md)    


```javascript
const myRTC = new QNRTC.QNRTCSession(); // 初始化我们的 SDK (QNRTC的引入方式见上)
try {
  const users = await myRTC.joinRoomWithToken(roomToken); // 加入房间

  // 因为 await 的特性，当代码执行到这里的时候，joinRoomWithToken 这个异步请求已经完成
  // 如果过程中出现错误，会直接 throw 出来，如果需要处理只要 try/catch 就好
  // 这里的 users 表示该房间中已经存在的用户，具体可以参照 API 文档
  // 你也随时可以通过 myRTC.users 获取当前的用户列表
  console.log('current users', users);
} catch (e) {
  // 加入房间失败，关于错误处理可以参考下文的 错误处理 一节
  console.log('join room error!', e);
}

```

加入房间完成，开始发布吧  
在发布之前，我们需要通过本机的媒体设备采集本地的媒体数据

```javascript
// 使用内置的 deviceManager 对象采集本地媒体数据
const stream = await QNRTC.deviceManager.getLocalStream();

// 页面上的 vide 元素
const localVideo = document.getElementById('localplayer');

// 拿到 stream 对象后，调用 play 就可以播放了
// 参数为想要播放在哪个 video 元素上
// 这里第二个参数代表用 静音模式 来播放，本地预览的时候一般我们会设置成静音
stream.play(localVideo, true);
```
此时，我们应该已经可以在页面上预览到我们本地的媒体流了。下一步，就是将这个媒体流发布到房间中。

```javascript

// 发布自己本地的流
try {
  await myRTC.publish(stream)
} catch (e) {
  console.log('publish error!', e);
}

// done! 代码执行到这里说明发布成功
// 我们可以根据这个特性很方便地设定 publishState 等参数
```
如果没有报错的话说明你的媒体流已经顺利发布到这个房间，下一步，让我们订阅这个刚刚发布的流


###  6.2 订阅用户

SDK不允许用户自己订阅自己，所以这里我们需要另一个用户来做测试，让我们新准备一个页面    
这里页面也需要一个 video 元素，用于播放我们订阅的流

```html
<video id="remoteplayer"></video>
```

重复上面加入房间的步骤，注意这里必须要保证 2 个页面的用户名不同。   
加入房间后，让我们开始订阅吧。

```javascript
... // 加入房间后

const remoteVideo = document.getElementById('remoteplayer');

// 获取当前房间所有用户
const users = myRTC.users;
for (let i = 0; i < users.length>; i +=1) {
  const user = users[i];

  // 如果这个用户正在发布，我们就订阅他
  if (user.published) {
    try {
      // 通过用户的 userId 订阅目标用户
      // 这里返回和我们最初从本地获取媒体流时的返回格式一样
      // 都是封装后的 Stream 对象
      const remoteStream = await myRTC.subscribe(user.userId);

      // 同样，调用 play 方法，选择页面上的 video 元素，就可以播放啦
      remoteStream.play(remoteVideo);
    } catch (e) {
      console.log('subscribe error!', e);
    }
  }
}
```

## 7 API LIST
无论手动还是模块引入，SDK 都会暴露一个 QNRTC 对象，该对象整合了 SDK 所有的独立模块

|模块名称|用途|
|:------:|:------:|
|[Stream](#71-stream)|包装了媒体流数据的对象|
|[QNRTCSession](#72-qnercsession-api)|核心类,创建 QNRTC 实例|
|[deviceManager](#73-devicemanager)|设备管理模块，一般用来捕获本地的媒体数据|
|[log](#74-log)|控制打印的 log 信息|

### 7.1 Stream
在介绍主要的房间/发布/订阅操作相关的 API 前，我想先介绍 Stream 这个基础类    
媒体流是包含了媒体数据(视频，音频)的数据流，也就是我们在连麦过程中需要最经常操作的一种数据。    
Stream 将媒体流进行了包装并结合了一些实际的业务数据   

#### 成员
|name|类型|介绍|
|----|----|----|
|userId|string|标记当前这个流属于哪个用户|
|isDestroyed|boolean|这个流是否已经被销毁（发布者取消发布，发布者失去连接, 取消订阅...）|
|muteAudio|boolean|表示该流是否被静音|
|muteVideo|boolean|表示该流是否被黑屏|
|enableAudio|boolean|表示该流是否有音频轨道|
|enableVideo|boolean|表示该流是否有视频轨道|

#### play 播放媒体流 (同步)
|参数|类型|备注|
|----|----|----|
|containerElement|HTMLElement|用来放置 video/audio 元素的上层 DOM 对象|
|isMute|boolean|是否用 静音模式 播放|

SDK 会在指定的元素下自动创建相应的 video/audio 元素播放媒体流   
自动创建的元素有一个公共的 class 名称，`qnrtc-stream-player`   

```javascript
const containerElement = document.get...

stream.play(containerElement);
```

#### onAudioBuffer 获取音频 PCM 数据 (同步)
|参数|类型|备注|
|----|----|----|
|callback|(buffer: Float32Array) => any|接收音频数据的回调|
|bufferSize|number|每次获取的音频数据长度，默认为 4096 (只能为 2 的 n 次方，且处于 256 - 16384 之间)|

通过指定的 callback 获取音频数据

```javascript
stream.onAudioBuffer(buffer => {
  // buffer 为一个长度为 2048 的 Float32Array
  console.log('get audio buffer data', buffer);
}, 2048)
```

#### getCurrentTimeDomainData 获取当前音频的时域数据 (同步)

通常用于音频可视化的数据，可以配合 requestAnimationFrame 和 canvas
实现绘制声波图   
返回: 尺寸为 2048 的 Unit8Array

示例代码参考 [AudioWave](../QNRTCWebDemo/src/app/components/AudioWave/index.tsx)

#### getCurrentFrequencyData 获取当前音频的频域数据 (同步)

通常用于音频可视化的数据，可以配合 requestAnimationFrame 和 canvas
实现绘制音域图   
返回: 尺寸为 2048 的 Unit8Array

示例代码参考 [AudioWave](../QNRTCWebDemo/src/app/components/AudioWave/index.tsx)

#### getStats 获取当前传输状态信息 (同步)

包括丢包率，实时码率等信息    
返回的具体格式参考下面的返回类型介绍    

返回: [StatsReport](#statsreport-状态信息)

```javascript
const report = stream.getStats();
console.log("音频丢包数", report.audioPacketLoss);
```


### 7.2 QNRTCSession API

#### 成员
|name|类型|介绍|
|----|----|----|
|users|[User](#user-用户信息)[]|房间当前的用户信息|
|subscribedUsers|[User](#user-用户信息)[]|房间当前的已经订阅的用户信息|

#### 构造函数
创建 QNRTC 实例

```javascript
const myRTC = new QNRTC.QNRTCSession()
```

#### joinRoomWithToken 加入房间(异步)
加入房间

|参数|类型|介绍|
|----|----|----|
|roomToken|string|房间 token，获取方式请阅读 <a href="http://docs.qnsdk.com/webrtc/server-api.pdf">Server-API</a> 文档|


|返回|类型|介绍|
|----|----|----|
|users|<a href="#user-用户信息">User</a>[]|返回房间当前的 User 信息，User 详细见类型介绍|

```javascript
try {
  const users = await myRTC.joinRoomWithToken(...);
} catch(e) {
  console.log('joinRoomWithToken Error!', e);
}

// or use Promise
myRTC.joinRoomWithToken(...).then((users) => {
  console.log('join success!');
}).catch(e => {
  console.log('joinRoomWithToken Error!', e);
})
```

#### publish 发布视频流(异步)
发布一个流到当前房间

|参数|类型|介绍|
|----|----|----|
|stream|<a href="#71-stream">Stream</a>|流对象，从 <a href="#73-devicemanager">deviceManager</a> 中获取|

```javascript
try {
  const stream = await QNRTC.deviceManager.getLocalStream();
  await myRTC.publish(stream);
} catch(e) {
  console.log('publish Error!', e);
}

// or use Promise
QNRTC.deviceManager.getLocalStream()
  .then(stream => myRTC.publish(stream))
  .then(() => {
    console.log('publish success');
  }).catch(e => {
    console.log('publish Error!', e);
  });
```

#### unpublish 取消发布(异步)
停止向房间推流，取消发布

```javascript
await myRTC.unpublish();

// or use Promise
myRTC.unpublish().then(() => console.log('un publish')).catch(console.error)
```

#### subscribe 订阅用户(异步)
订阅一名用户，获取该用户发布的流

|参数|类型|介绍|
|----|----|----|
|userId|string|该用户的用户 id|

|返回|类型|介绍|
|----|----|----|
|stream|[Stream](#71-stream)|订阅的流对象，调用 play 方法来播放|

```javascript
const video = document.getElementById('video');

try {
  const stream = await myRTC.subscribe(userId);
  stream.play(video);
} catch(e) {
  console.log('subscribe Error!', e);
}

// or use Promise
myRTC.subscribe(userId).then((stream) => {
  stream.play(video);
  console.log('subscribe success!');
}).catch(e => {
  console.log('subscribe Error!', e);
})

```

#### unsubscribe 取消订阅(异步)
取消订阅一名用户

|参数|类型|介绍|
|----|----|----|
|userId|string|该用户的用户 id|

```javascript
try {
  await myRTC.unsubscribe(userId);
} catch(e) {
  console.log('subscribe Error!', e);
}

// or use Promise
myRTC.unsubscribe(userId).then(() => {
  console.log('unsubscribe success!');
}).catch(e => {
  console.log('unsubscribe Error!', e);
})

```

#### mute 静音/黑屏(同步)
将发布中的视频流静音或者黑屏

|参数|类型|介绍|
|----|----|----|
|muteAudio|boolean|是否静音|
|muteVideo|boolean|是否黑屏(默认 false)|

```javascript
// 黑屏
myRTC.mute(false, true);

// 静音
myRTC.mute(true);
```

#### kickoutUser 踢人(异步)
将用户踢出房间（如果调用者没有管理权限会抛出错误）

|参数|类型|介绍|
|----|----|----|
|userId|string|该用户的用户 id|

```javascript
try {
  await myRTC.kickoutUser(userId);
} catch(e) {
  console.log('kickoutUser error', e);
}

// or use Promise
myRTC.kickoutUser(userId).then(() => {}).catch(e => {
  console.log('kickoutUser error', e);
})
```


#### leaveRoom 离开房间(同步)
离开当前房间

```javascript
myRTC.leaveRoom();
```

#### setDefaultMergeStream 使用默认布局开启合流 (同步)
使用 SDK 默认的模版布局开启合流，默认布局会展示所有发布用户的流并铺满整个画布   
SDK 会默认监听房间内所有流的状态，将其排版在合流画布上    
如果您想自定义画布布局或者控制某些用户的流是否显示的话，请使用下面的手动合流接口    

*如果使用默认布局，请确认房间内同时只有一个用户调用*

|参数|类型|介绍|
|----|----|----|
|width|number|合流画布的宽度（app的设定）|
|height|number|合流画布的高度（app的设定）|

```javascript
myRTC.setDefaultMergeStream(1920, 1080); // 尺寸请对应 app 的合流设定
```

#### setMergeStreamLayout 设置合流参数 (同步)
通过调用这个接口，客户端可以设置特定用户在合流画布上的尺寸和位置   
指定的用户必须处于`正在发布`的状态，否则不会有任何作用。

|参数|类型|介绍|
|----|----|----|
|userId|string|指定用户的用户 id|
|option|[MergeOption](#mergeoption-合流配置)|合流配置，具体见类型介绍|


```javascript
// 当有用户发布时，设置其合流参数
myRTC.on("user-publish", (user) => {
  myRTC.setMergeStreamLayout(user.userId, {
    x: 0, y: 0, w: 1920, h: 1080, visible: true,
  });
});
```

#### stopMergeStream 停止合流 (同步)
停止当前的合流，如果需要重新开始合流，再次调用相应的 `setMergeStreamLayout` 即可。  

```javascript
myRTC.stopMergeStream();
```

#### on / off / once / removeAllListeners 事件操作
通过 QNRTCSession 实例可以给各种事件挂钩子，具体的事件实现参考 [EventEmitter](https://github.com/Olical/EventEmitter)
具体的事件列表参考下文

```javascript
// 监听事件
myRTC.on('user-join', handleUserJoin);

// 只监听一次
myRTC.once('user-join', handleUserJoin);

// 取消监听
myRTC.off('user-join', handleUserJoin);

// 取消所有监听
myRTC.removeAllListeners('user-join');

```

### 7.3 deviceManager
deviceManager 是一个用来管理本地媒体设备的对象，一般用来捕获本地的媒体流

#### 成员
|name|类型|介绍|
|----|----|----|
|deviceInfo|MediaDeviceInfo[]|房间当前的设备列表|
|audioDevice|MediaDeviceInfo|当前使用的音频设备, @default 代表使用系统默认设备|
|videoDevice|MediaDeviceInfo|当前使用的视频设备, @default 代表使用系统默认设备|

#### getLocalStream 获取本地媒体流 (异步)
获取本地的媒体数据

<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>类型</th>
      <th>备注</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>recordConfig</td>
      <td>
        {</br>
          audio: { enabled: boolean, bitrate?: number }, </br>
          video: { </br>
            enabled: boolean, frameRate?: number, </br>
            height?: number, width?: number, </br>
            bitrate?: number, </br>
          }</br>
        }</br>
      </td>
      <td>
        带 ? 的为可选项 </br>
        enabled 代表是否开启视频/音频轨道 </br>
        bitrate 代表码率(kb/s)，默认音频 64, 视频 512 </br>
        frameRate 代表视频帧率 </br>
        width/height 代表视频分辨率 </br>
      </td>
    </tr>
  </tbody>
</table>

|返回|类型|备注|
|----|----|----|
|stream|[Stream](#71-stream)|本地的 stream 对象|

如果不传入参数则使用默认参数：开启音视频、视频分辨率 640*480、码率 600 kbps。

```javascript
try {
  const localStream = await QNRTC.deviceManager.getLocalStream({
    audio: { enabled: true },
    video: { enabled: true, bitrate: 1024, frameRate: 30 },
  });
} catch (e) {
  console.log('getLocalStream Error!', e);
}

// or use promise
QNRTC.deviceManager.getLocalStream({
  audio: { enabled: true },
  video: { enabled: true, bitrate: 1024, frameRate: 30 },
}).then(localStream => {
  ...
}).catch(e => {
  console.log('getLocalStream Error!', e);
})
```

#### setVolume 设置采集音量 (同步)
|参数|类型|备注|
|----|----|----|
|value|number|基于当前音量的增益数值，1 不改变，0 静音|

Safari 暂时不支持该方法

```javascript
QNRTC.deviceManager.setVolume(10);
```

#### Event: device-update 检测到设备列表更新 (事件)
```javascript
QNRTC.deviceManager.on("device-update", () => {
  console.log("current devices", QNRTC.deviceManager.deviceInfo);
});
```

#### changeDevice 切换采集设备 (同步)
|参数|类型|备注|
|----|----|----|
|type|string|"audio" 或者 "video"|
|deviceId|string|设备 id|

使用指定的 deviceId 采集, 可以在发布中途调用   
如果在发布中途调用, safari 11+/chrome 65+ 会进行流的热替换     
其余版本会用新的流自动重新发布一次

```javascript
QNRTC.deviceManager.changeDevice("video", "your device id");
```

### 7.4 log

用于控制 SDK 打印在控制台上的信息

#### setLevel

设置打印等级，一共有 4 个等级 `disable` `warning` `debug` `log`   
设置为 `disable` 后将不会打印数据, 默认为 `log`

```javascript
import { log } from 'pili-rtc-web';

// 关闭 SDK 的 console 打印
log.setLevel("disable");
```

## 8 事件列表

|事件名称|描述|参数|备注|
|----|----|----|----|
|user-leave|有用户离开房间|(user: [User](#user-用户信息))|user: 离开的用户|
|user-join|有用户加入房间|(user: [User](#user-用户信息))|user: 加入的用户|
|user-publish|有用户开始发布|(user: [User](#user-用户信息))|user: 发布的用户|
|user-unpublish|有用户取消发布|(user: [User](#user-用户信息))|user: 取消发布的用户|
|room-state-change|房间状态改变|(state: [RoomState](#roomstate-房间状态))|表示房间状态的number数字，具体见类型介绍|
|mute|房间用户修改静音/黑屏状态|({userId : string, streamId: string, muteAudio: boolean, muteVideo: boolean})|
|disconnect|和房间失去连接|无|房间被关闭/被踢出房间都会触发|
|kicked|被踢出房间|(userId: string)|执行踢出命令的用户 id|
|error|错误|(error: QNRTCError)|非正常流程抛出的错误，一般出现在自动断线重连过程中|


## 9 基本类型

### User 用户信息

```javascript
User {
  userId: string
  published: boolean // 如果 true 表示该用户正在推流
}
```

### StatsReport 状态信息

```typescript
StatsReport {
  bandwidth: number;           // 带宽
  videoBitrate: number;        // 视频码率
  audioBitrate: number;        // 音频码率
  videoBytes: number;          // 视频传输字节
  videoPackets: number;        // 视频传输包数量
  videoPacketLoss: number;     // 视频丢包数
  videoPacketLossRate: number; // 视频丢包率
  audioBytes: number;          // 音频传输字节
  audioPackets: number;        // 音频传输包数 
  audioPacketLoss: number;     // 音频丢包数
  audioPacketLossRate: number; // 音频丢包率
}
```

### MergeOption 合流配置

```typescript
MergeOption {
  x: number;
  y: number;
  w: number;
  h: number;
  z: number; // z 控制画面的覆盖等级，z 值大的流会盖住 z 值小的流
  visible: boolean; // 是否显示
}
```


### RoomState 房间状态

```typescript
enum RoomState {
  Idle = 0, // 未连接
  Connecting = 1, // 连接中
  Connected = 2, // 已连接到房间
  Reconnecting = 3, // 正在尝试重新连接
}
```

## 10 错误处理
所有SDK处理的错误都会抛出一个`QNRTCError`，包含`code`和`message`信息

```javascript
try {
  await myRTC.kickoutUser('xxx')
} catch(e) {
  switch (e.code) {
    case 10051:
      console.log('没有权限踢人！');
      break;
    default:
      console.log('其他错误', e.code, e.message);
      break;
  }
}
```

### 10.1 错误列表

|代码|描述|可能触发的函数|
|----|----|----|
|10001|roomToken 错误|joinRoomWithToken|
|10002|roomToken 过期|joinRoomWithToken|
|10003|room 已经被关闭|joinRoomWithToken|
|10011|room 人满|joinRoomWithToken|
|10012|room 不存在|joinRoomWithToken|
|10021|用户不存在|publish unpublish subscribe unsubscribe kickoutUser|
|10031|发布流不存在|unpublish subscribe unsubscribe|
|10032|发布流信息不匹配|unpublish|
|10041|订阅流不存在|unsubscribe|
|10042|订阅流信息不匹配|subscribe|
|10044|无法订阅自己|subscribe|
|10051|没有权限|publish kickoutUser|
|10052|server 端不可用|publish subscribe|
|11000|unexpected error||
|11001|获取 AuthToken 失败|joinRoomWithToken|
|11002|推流 ice 失败|publish|
|11003|订阅 ice 失败|subscribe|
|11004|SDK 端无法获取目标订阅用户的流|subscribe|
|11005|无法创建订阅 p2p 连接|subscribe|
|11006|无法创建发布 p2p 连接|publish|
|11007|不支持远端的媒体格式|publish subscribe|
