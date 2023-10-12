export default class OfflineError extends Error {
  constructor() {
    super("No Internet");
    this.name = this.constructor.name;
  }
}
