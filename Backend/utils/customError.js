export default class CustomeError extends Error {
  constructor(message, code) {
    super(message)
    this.code = code
    this.message = message
    this.isOperational = true
  }
}
