# QNRTCWeb v2.2.0

## 简介
QNRTCWeb 是七牛云推出的一款适用于 Web 平台的实时音视频 SDK，提供了包括音视频通话、静音、发布、订阅多种功能，提供灵活的接口，支持高度定制以及二次开发。

## 缺陷修复
- 修复弱网时可能会出现的重新发布/订阅失败
- 修复 WebAudio 因为 AutoPlay Policy 导致阻塞的情况
- 修复屏幕共享 enabled 参数无效的问题

## 优化
- 批量订阅 Track 时不会因为其中一个失败而导致整体失败 
- 当远端 Track 异常终止时，现在会自动重新订阅

## 功能
- 添加了混音模块
- 重新设计了外部音频导入的 API
- Chrome 72 现在支持无插件屏幕共享了
- 支持配置通过 TCP 来传输音视频数据
- 增加实时音量等级获取的 API

关于新功能的细节，可以参考文档站中的 [ReleaseNote](https://doc.qnsdk.com/rtn/web/blog/2019/04/30/v2.2.0-release)

## 问题反馈

当你遇到任何问题时，可以通过在 GitHub 的 repo 提交 `issues` 来反馈问题，请尽可能的描述清楚遇到的问题，如果有错误信息也一同附带，并且在 ```Labels``` 中指明类型为 bug 或者其他。

[通过这里查看已有的 issues 和提交 bug](https://github.com/pili-engineering/QNRTC-Web/issues)

