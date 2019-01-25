import { action, observable } from 'mobx';
import { randomNumberGen } from '../common/utils';

export interface MessageInfo {
  key: number;
  message: string;
}

export interface AlertMessage {
  title: string;
  content: string;
  show: boolean;
  onclose?: () => void;
}

export class MessageStore {


  public stack: MessageInfo[] = [];

  @observable
  public alertMessage: AlertMessage = {
    title: "",
    content: "",
    show: false,
    onclose: undefined,
  };

  @observable
  public open: boolean = false;

  @observable
  public messageInfo: MessageInfo = { key: 0, message: '' };

  @action.bound
  public showAlert(msg: Partial<AlertMessage>): void {
    const message = {
      show: true,
      title: msg.title || "注意",
      content: msg.content || "",
    };
    this.alertMessage = message;
  }

  @action.bound
  public closeAlert(): void {
    this.alertMessage.show = false;
    if (this.alertMessage.onclose) {
      this.alertMessage.onclose();
    }
  }

  @action.bound
  public close(event: React.SyntheticEvent<any>, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }
    this.open = false;
  }

  @action.bound
  public show(message: string) {
    const msg = { key: randomNumberGen(), message };
    this.stack.push(msg);

    if (this.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.open = false;
    } else {
      this.processQueue();
    }
  }

  @action.bound
  public processQueue() {
    if (this.stack.length > 0) {
      this.messageInfo = this.stack.shift() as MessageInfo;
      this.open = true;
    }
  }

  @observable
  loadingOpen: boolean = false;

  @observable
  loadingText: string = '';

  @action.bound
  public showLoading(text: string = 'loading') {
    this.loadingOpen = true;
    this.loadingText = text;
  }

  @action.bound
  public hideLoading() {
    this.loadingOpen = false;
    this.loadingText = '';
  }

  @action.bound
  public setLoadingText(text: string) {
    this.loadingText = text;
  }
}

export default new MessageStore();
