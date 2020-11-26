# QNRTCWeb v2.4.0

## 简介
QNRTCWeb 是七牛云推出的一款适用于 Web 平台的实时音视频 SDK，提供了包括音视频通话、静音、发布、订阅多种功能，提供灵活的接口，支持高度定制以及二次开发。

## 功能
- 合流配置中增加参数 maxRate/minRate/holdLastFrame
- 增加接收已订阅远端用户发布的 track 状态信息
- 增加 remote-user-reconnecting 和 remote-user-reconnected 监听事件
- 增加信令连接异常回调

## 修复问题
- 修复 rtt 信息获取始终为 0 的问题，兼容 Chrome 和 Firefox 浏览器
- 修复 Firefox 中偶现找不到 lastReport 报错
- 修复 Firefox 中偶现 peerconnection 报错

## 优化
- 增加数据上报 App 进入前/后台事件
- 增加数据上报权限事件
- 优化丢包率浏览器兼容及计算方式 
- 修改 transportPolicy 默认值为 preferUdp

## 问题反馈
当你遇到任何问题时，可以通过在 GitHub 的 repo 提交 `issues` 来反馈问题，请尽可能的描述清楚遇到的问题，如果有错误信息也一同附带，并且在 ```Labels``` 中指明类型为 bug 或者其他。

[通过这里查看已有的 issues 和提交 bug](https://github.com/pili-engineering/QNRTC-Web/issues)