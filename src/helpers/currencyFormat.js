export const currencyFormat = (value, currency) => {
  if (currency.toUpperCase() === 'usd') {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
};
