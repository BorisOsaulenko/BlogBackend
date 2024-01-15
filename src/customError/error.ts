export class CustomError extends Error {
  status: number;
  toastMessage: string;

  constructor(status: number, toastMessage: string) {
    super();
    this.status = status;
    this.toastMessage = toastMessage;
  }
}
