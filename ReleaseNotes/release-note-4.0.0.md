# QNRTCWeb v4.0.0

## 简介
QNRTCWeb 是七牛云推出的一款适用于 Web 平台的实时音视频 SDK，提供了包括音视频通话、静音、发布、订阅多种功能，提供灵活的接口，支持高度定制以及二次开发。

## 更新内容

4.x 版本是在老版本基础上做的一次全量重构，**不**向下兼容。主要更新内容有：
- 新增核心类 QNRTC 和 QNRTCClient，移除 TrackModeSession 类
- 新增 QNLocalTrack 和 QNRemoteTrack 及其衍生的子类，对不同类型的音视频轨道做了区分，并提供了丰富的控制接口

## 问题反馈
当你遇到任何问题时，可以通过在 GitHub 的 repo 提交 `issues` 来反馈问题，请尽可能的描述清楚遇到的问题，如果有错误信息也一同附带，并且在 ```Labels``` 中指明类型为 bug 或者其他。

[通过这里查看已有的 issues 和提交 bug](https://github.com/pili-engineering/QNRTC-Web/issues)