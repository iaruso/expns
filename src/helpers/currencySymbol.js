export function getCurrencySymbol(currencyCode) {
  switch (currencyCode) {
    case 'eur':
      return '€';
    case 'gbp':
      return '£';
    case 'usd':
      return '$';
    default:
      return '';
  }
}
