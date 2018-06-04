/*
 * WechatPage.tsx
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
import * as React from 'react';

import * as styles from './style.css';

interface Props {
}

interface State {
}

export class WechatPage extends React.Component<Props, State> {
  public render(): JSX.Element {
    return (
      <div className={styles.container}>
        <img className={styles.img} src={require("../../../assets/images/arrow.png")} />
        <div className={styles.text}>
          <p> Web SDK 不支持微信浏览器环境 </p>
          <p> 请点击右上角选择用浏览器打开</p>
          <p> 支持 Safari(iOS 11+) Chrome(Android 5.0+)</p>
        </div>
      </div>
    );
  }
}
