import * as dayjs from 'dayjs';
/**
 * Date helper
 */
export class DateHelper {
  /**
   * Add days
   * @param value
   * @param unit
   * @returns
   */
  static add(value: number, unit: dayjs.ManipulateType) {
    return dayjs().add(30, unit);
  }
  // format date
  static format(date) {
    const d = new Date(date);
    return d.toISOString();
  }
  static formatDate(date) {
    const d = new Date(date);
    return d.toDateString();
  }

  static now() {
    const date = new Date();
    return date;
  }

  static nowString() {
    const date = new Date();
    return date.toISOString();
  }

  static nowDate() {
    const date = new Date();
    return date.toDateString();
  }

  static addDays(dateData, days: number) {
    days = Number(days);
    const date = new Date(dateData.valueOf());
    date.setDate(date.getDate() + days);
    return date.toDateString();
  }
}
