export const convertCurrency = (amount, fromCurrency, toCurrency, currencyRates) => {
  const from = fromCurrency.toUpperCase();
  const to = toCurrency.toUpperCase();

  if (!currencyRates) {
    console.error(`Currency conversion rates not available for ${fromCurrency} to ${toCurrency}`);
    return null;
  }

  let convertedAmount = amount;
  if (from !== 'EUR') {
    convertedAmount /= currencyRates[from];
  }

  if (to !== 'EUR') {
    convertedAmount *= currencyRates[to];
  }

  convertedAmount = Math.round(convertedAmount * 100) / 100;

  return convertedAmount;
};
