/**
 * Utility to convert English numbers to Persian (Farsi) digits
 */
export function toPersianDigits(num: string | number): string {
  if (num === null || num === undefined) return '';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/[0-9]/g, (match) => persianDigits[parseInt(match, 10)]);
}

export function formatPriceToman(billions: number): string {
  return `${toPersianDigits(billions)} میلیارد تومان`;
}
