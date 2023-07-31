# QNRTC Web v4.2.1


## 简介

QNRTC Web 是七牛云推出的一款 Web 平台实时音视频 SDK，提供了音视频通话、发布、订阅、静音等功能，提供灵活的接口，支持高度定制以及二次开发。


## 功能

### SDK

- 新增本地录制功能
- 新增 QNRTC 配置接口


## 优化

- 增强摄像头切换接口，可通过多种方法选择并切换
- 优化了 TypeScript 类型标注


## 修复

### SDK

- 修复 iOS 15.1 Safari 视频发布/静音导致页面崩溃的问题

### Demo

- 修复 Safari 直播时，无法播放纯音频的问题
- 修复用户在取消屏幕共享时无法退出采集状态的问题


## 备注

- 本地录制功能在部分浏览器下无法使用，详细的浏览器支持情况可查看[MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker#browser_compatibility)


## 问题反馈

当你遇到任何问题时，可以提交 `issue` 来反馈问题，请尽可能地描述你所遇到的问题或异常，并附带相关的日志或错误信息。