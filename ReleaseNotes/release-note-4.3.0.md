# QNRTCWeb v4.3.0

## 简介
QNRTCWeb 是七牛云推出的一款适用于 Web 平台的实时音视频 SDK，提供了包括音视频通话、静音、发布、订阅多种功能，提供灵活的接口，支持高度定制以及二次开发。

## 调整
- 移除 QNAudioMixer 类
- MicophoneTrack 移除 createAudoMusicMixer 与 createAudioEffectMixer 方法

## 修复
- 解决 iOS safari 混音模块无法使用的问题
- 解决部分机型离开房间音频资源未正确释放的问题

## 新增 
- LocalAudioTrack 添加 addAudioFilter 与 removeAudioFilter 方法
- QNRTC 添加 createAudoMusicMixer 与 createAudioEffectMixer 方法

## 问题反馈
当你遇到任何问题时，可以通过在 GitHub 的 repo 提交 `issues` 来反馈问题，请尽可能的描述清楚遇到的问题，如果有错误信息也一同附带，并且在 `Labels` 中指明类型为 bug 或者其他。

[通过这里查看已有的 issues 和提交 bug](https://github.com/pili-engineering/QNRTC-Web/issues)
