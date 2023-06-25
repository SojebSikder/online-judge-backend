/**
 * StringHelper
 * @class StringHelper
 * @author Sojeb Sikder <sojebsikder@gmail.com>
 */
export class StringHelper {
  /**
   * Capitalize the first letter of a string.
   * @param string
   * @returns
   */
  public static cfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Uncapitalize the first letter of a string.
   * @param string
   * @returns
   */
  public static ucfirst(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  public static trim(str: string, chr: string) {
    const rgxtrim = !chr
      ? new RegExp('^\\s+|\\s+$', 'g')
      : new RegExp('^' + chr + '+|' + chr + '+$', 'g');
    return str.replace(rgxtrim, '');
  }
  public static rtrim(str: string, chr: string) {
    const rgxtrim = !chr ? new RegExp('\\s+$') : new RegExp(chr + '+$');
    return str.replace(rgxtrim, '');
  }
  public static ltrim(str: string, chr: string) {
    const rgxtrim = !chr ? new RegExp('^\\s+') : new RegExp('^' + chr + '+');
    return str.replace(rgxtrim, '');
  }
}
