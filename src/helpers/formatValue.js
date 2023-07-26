export const formatValue = (balance) => {
	const formattedBalance = parseFloat(balance).toFixed(2);
	const [wholePart, decimalPart] = formattedBalance.split(".");
	const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	return `${formattedWholePart},${decimalPart}`;
};