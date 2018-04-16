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

*请使用最新版 Chrome 进行开发以支持 WebRTC*

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

好了，准备就绪之后，让我们准备开始进行第一次发布吧。 首先准备一个带 `<video>` 标签的页面，我们将会把摄像头预览放在这个元素中
```html
<body>
  <video id="localplayer" autoplay muted />
</body>
```

在开始发布之前，我们必须先加入一个房间。      
因为发布/订阅/控制等操作都是对应一个房间完成的，也就是说我们在一个房间内开始发布，房间的其他用户都可以获取到我们的数据流。      
在这里我们需要 1 个已知参数，`roomToken`， 关于这个参数的获取请参照上文提到的 [Server-API](https://github.com/pili-engineering/QNRTC-Server/blob/master/docs/api.md)    

```javascript
const myRTC = new QNRTC.QNRTCSession(); // 初始化我们的 SDK (QNRTC的引入方式见上)
try {
  const { streams, users } = await myRTC.joinRoomWithToken(roomToken); // 加入房间

  // 因为 await 的特性，当代码执行到这里的时候，joinRoomWithToken 这个异步请求已经完成
  // 如果过程中出现错误，会直接 throw 出来，如果需要处理只要 try/catch 就好
  // 这里的 streams 和 users 表示该房间中已经存在的用户和流，具体可以参照 API 文档
  console.log('room info', streams, users);
} catch (e) {
  // 加入房间失败，关于错误处理可以参考下文的 错误处理 一节
  console.log('join room error!', e);
}

```

加入房间完成，开始发布吧  
关于拉取本地 stream 的详细说明参考 [getUserMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)

```javascript
// 通过 HTML5 设备 API 获取摄像头权限拉取 stream
const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
// 将摄像头的流设置到 <video> 标签中方便查看
const localVideo = document.getElementById('localplayer');
localVideo.srcObject = stream;

// 发布自己本地的流
try {
  await myRTC.publish(stream)
} catch (e) {
  console.log('publish error!', e);
}

// done! 代码执行到这里说明发布成功
// 我们可以根据这个特性很方便地设定 publishState 等参数
```



###  6.2 订阅其他用户

接着上文，当我们进入房间后，SDK 会返回给你当前房间的 stream  和 user 信息。其中 stream 表示当前房间发布的流相关信息，user 表示当前房间所有的用户信息。这些信息的具体结构参考 API文档 

当有用户发布时，我们就可以通过获取他的 userId 来订阅他，userId 字段包含在上述 2 项信息中

```html
<video id="remoteplayer" autoplay ></video>
```

同样，我们也需要一个 video 元素来播放我们订阅的流信息

```javascript
...
const userId = stream[0].userId; // 这里通过房间信息获取正在发布的用户 id，正式开发需要通过事件监听更新流和用户的状态，具体见下文
const remoteVideo = document.getElementById('remoteplayer');

await myRTC.subscribe(userId, remoteVideo)

// done! 当代码运行到这里的时候，video 元素已经开始正常播放视频了
```

## 7 API LIST
无论手动还是模块引入，SDK 都会暴露一个 QNRTC 对象，该对象整合了 SDK 所有的独立模块(目前暂时为一个)

|模块名称|用途|
|:------:|:------:|
|QNRTCSession|核心类,创建 QNRTC 实例|

### 7.1 QNRTCSession API

#### 构造函数
创建 QNRTC 实例

```javascript
const myRTC = new QNRTC.QNRTCSession()
```

#### joinRoomWithToken 加入房间(异步)
<details open>
<summary open="true">加入房间</summary>
<br>
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
      <td>roomToken</td>
      <td>string</td>
     <td>房间 token，获取方式请阅读 <a href="http://docs.qnsdk.com/webrtc/server-api.pdf">Server-API</a> 文档</td>
    </tr>  
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th>返回</th>
      <th>类型</th>
      <th>备注</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>roomInfo</td>
      <td><a href="#roominfo-房间信息">RoomInfo</a></td>
      <td>房间信息包括 Stream 和 User 信息，房间信息详细见类型介绍</td>
    </tr> 
  </tbody>
</table>
</details>

  ```javascript
  try {
    const roomInfo = await myRTC.joinRoomWithToken(...);
  } catch(e) {
    console.log('joinRoomWithToken Error!', e);
  }
  
  // or use Promise
  myRTC.joinRoomWithToken(...).then((roomInfo) => {
    console.log('join success!');
  }).catch(e => {
    console.log('joinRoomWithToken Error!', e);
  })
  ```

#### roomInfo 获取房间内当前信息
获取房间信息 [RoomInfo](#roominfo-房间信息)

可以随时通过访问 roomInfo 字段获取当前的房间信息

```javascript
var currentRoomInfo = myRTC.roomInfo;
console.log('current users', currentRoomInfo.users);
```

#### publish 发布视频流(异步)
<details open>
<summary open="true">发布一个流到当前房间</summary>
<br>
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
      <td>mediaStream</td>
      <td>MediaStream</td>
      <td>媒体流对象，一般从 getUserMedia 中获取</td>
    </tr>
  </tbody>
</table>
</details>

```javascript
try {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  await myRTC.publish(mediaStream);
} catch(e) {
  console.log('publish Error!', e);
}

// or use Promise
navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  .then(mediaStream => myRTC.publish(mediaStream))
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
<details open>
<summary open="true">订阅一名用户，获取该用户发布的流</summary>
<br>
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
      <td>userId</td>
      <td>string</td>
      <td>该用户的用户 id</td>
    </tr>
    <tr>
      <td>video</td>
      <td>HTMLVideoElement</td>
      <td>用来播放订阅流的 video 标签容器</td>
    </tr>
  </tbody>
</table>
</details>

```javascript
const video = document.getElementById('video');

try {
  await myRTC.subscribe(userId, video);
} catch(e) {
  console.log('subscribe Error!', e);
}

// or use Promise
myRTC.subscribe(userId, video).then(() => {
  console.log('subscribe success!');
}).catch(e => {
  console.log('subscribe Error!', e);
})

```

#### unsubscribe 取消订阅(异步)
<details open>
<summary open="true">取消订阅一名用户（SDK 不会销毁之前订阅提供的 video 标签）</summary>
<br>
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
      <td>userId</td>
      <td>string</td>
      <td>该用户的用户 id</td>
    </tr>
  </tbody>
</table>
</details>

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
<details open>
<summary open="true">
将发布中的视频流静音或者黑屏
</summary>
<br>
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
      <td>muteAudio</td>
      <td>boolean</td>
      <td>是否静音</td>
    </tr>
    <tr>
      <td>muteVideo</td>
      <td>boolean</td>
      <td>是否黑屏(默认 false )</td>
    </tr>
  </tbody>
</table>
</details>

```javascript
// 黑屏
myRTC.mute(false, true);

// 静音
myRTC.mute(true);
```

#### kickoutUser 踢人(异步)
<details open>
<summary open="true">
将用户踢出房间（如果调用者没有管理权限会抛出错误）
</summary>
<br>
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
      <td>userId</td>
      <td>string</td>
      <td>用户 id</td>
    </tr>
  </tbody>
</table>
</details>

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

## 8 事件列表

|事件名称|描述|参数|备注|
|----|----|----|----|
|user-leave|有用户离开房间|(user: [User](#user-用户信息))|user: 离开的用户|
|user-join|有用户加入房间|(user: [User](#user-用户信息))|user: 加入的用户|
|add-stream|有用户开始推流|(stream: [Stream](#stream-流信息))|stream: 推的流|
|remove-stream|有用户结束推流|(stream: [Stream](#stream-流信息))|stream: 结束推的流|
|room-state-change|房间状态改变|(state: [RoomState](#roomstate-房间状态))|表示房间状态的number数字，具体见类型介绍|
|mute|房间用户修改静音/黑屏状态|({userId : string, streamId: string, muteAudio: boolean, muteVideo: boolean})|
|disconnect|和房间失去连接|无|房间被关闭/被踢出房间都会触发|
|kicked|被踢出房间|(userId: string)|执行踢出命令的用户 id|

mute user-leave user-join add-stream remove-stream 等事件触发时，房间内的信息都会被更新, 请通过 [roomInfo](#roominfo-获取房间内当前信息) 来获取当前信息

```javascripe
myRTC.on("mute", (d) => {
  currentUsers = myRTC.roomInfo.users;
  currentStreams = myRTC.roomInfo.streams;
  ... // 做 mute 相关的操作
})
```


## 9 基本类型

### Stream 流信息

```javascript
Stream {
  streamId: string
  userId: string
  enableAudio: boolean  // enable 表示流 是否有 音/视频轨道
  enableVideo: boolean
  muteAudio: boolean // mute 表示流 是否 disable 音/视频轨道
  muteVideo: boolean
  mediaStream: MediaStream
}
```

### User 用户信息

```javascript
User {
  userId: string
  publishStream?: Stream //如果存在表示该用户正在推流
}
```

### RoomInfo 房间信息

```typescript
RoomInfo {
  users: User[]
  streams: Stream[]
  roomName: string
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
