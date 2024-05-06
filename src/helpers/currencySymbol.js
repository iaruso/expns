export const currencySymbol = (currencyCode) => {
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
