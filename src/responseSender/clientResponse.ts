class Response {
  status: number;
  message: string;
  additionalData: any;
  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export default Response;
