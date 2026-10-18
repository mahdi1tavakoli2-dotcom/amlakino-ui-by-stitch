/**
 * Utility to convert English numbers to Persian (Farsi) digits and format Iranian Tomans
 */
export function toPersianDigits(num: string | number | null | undefined): string {
  if (num === null || num === undefined) return '';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/[0-9]/g, (match) => persianDigits[parseInt(match, 10)]);
}

export function parsePersianDigitsToNumber(text: string): number {
  if (!text) return 0;
  const persianDigitsMap: Record<string, string> = {
    '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
    '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
  };
  const sanitized = text
    .replace(/[۰-۹]/g, (match) => persianDigitsMap[match] || match)
    .replace(/[^0-9.]/g, '');
  return parseFloat(sanitized) || 0;
}

export function formatPriceToman(billions: number): string {
  return `${toPersianDigits(billions)} میلیارد تومان`;
}
