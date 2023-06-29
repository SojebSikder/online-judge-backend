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
  public static cfirst(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Slugify a string.
   * @param string
   * @returns
   */
  public static slugify(string: string) {
    return string
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }

  /**
   * Generate a random string.
   * @param length
   * @returns
   */
  public static randomString(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++)
      result += characters.charAt(Math.floor(Math.random() * charactersLength));

    return result;
  }

  /**
   * Uncapitalize the first letter of a string.
   * @param string
   * @returns
   */
  public static ucfirst(string: string) {
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
