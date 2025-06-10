import fetch from "node-fetch";

export default async function fetchPrice(symbol) {
	const res = await fetch(
		`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
	);
	const data = await res.json();
	return data.price;
}
