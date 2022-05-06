import { Log } from '../infrastructure/log';

export class TextSelection {
  static set(element) {
    if (document.body.createTextRange) {
      const range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      Log.error('text.selection', 'Could not select text in element: Unsupported browser.');
    }
  }

  static clear() {
    if (window.getSelection) {
      const selection = window.getSelection();
      selection.removeAllRanges();
    }
  }
}
