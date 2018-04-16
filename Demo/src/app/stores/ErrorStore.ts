import { observable, action } from 'mobx';

interface AlertError {
  show: boolean;
  title?: string;
  content: string;
  enter?: string;
  cancel?: string;
  onEnter?: () => void;
  onCancel?: () => void;
}

interface ToastError {
  show: boolean;
  content: string;
  action?: string;
  onAction?: string;
}

interface Loading {
  show: boolean;
  content: string;
}

export class ErrorStore {
  @observable
  public alertError: AlertError;

  @observable
  public toastError: ToastError;

  @observable
  public loading: Loading;

  public constructor() {
    this.alertError = {
      show: false,
      title: '错误！',
      enter: '确定',
      content: '',
    };

    this.toastError = {
      show: false,
      content: '',
    };

    this.loading = {
      show: false,
      content: '',
    };
  }

  @action
  public closeAlert = () => {
    this.alertError.show = false;
  }

  @action
  public closeToast = () => {
    this.toastError.show = false;
  }

  @action
  public closeLoading = () => {
    this.loading.show = false;
  }

  @action
  public showAlert = (alertError: AlertError) => {
    this.alertError = alertError;
  }

  @action
  public showToast = (toastError: ToastError) => {
    this.toastError = toastError;
  }

  @action
  public showLoading = (loading: Loading) => {
    this.loading = loading;
  }
}
