// AppError is a convenience class for throwing errors that will be recognised
// across the app.

export default class AppError {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}
