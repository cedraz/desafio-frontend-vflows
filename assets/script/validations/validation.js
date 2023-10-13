export default class Validation {
  checkLength(string, min, max) {
    if (string.length < min || string.length > max) {
      return false;
    }
    return true;
  }
}
