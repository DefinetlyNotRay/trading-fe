import fs from "fs";
import path from "path";
import fetchPrice from "@/lib/fetchPrice"; // fixed import path

const configPath = path.join(process.cwd(), "config.json");
const orderLogPath = path.join(process.cwd(), "orders.json");

export async function POST(req) {
	const signal = await req.json();
	const config = JSON.parse(fs.readFileSync(configPath));
	const price = await fetchPrice(signal.symbol);

	let action = null;
	if (
		signal.plusDI > config.plusDI &&
		signal.minusDI < config.minusDI &&
		signal.adx > config.adx
	) {
		action = "BUY";
	} else if (
		signal.plusDI < config.plusDI &&
		signal.minusDI > config.minusDI &&
		signal.adx > config.adx
	) {
		action = "SELL";
	}

	if (!action) {
		return Response.json({ message: "Sinyal tidak valid" });
	}

	const entry = parseFloat(price);
	const tp =
		action === "BUY"
			? entry * (1 + config.takeProfit / 100)
			: entry * (1 - config.takeProfit / 100);
	const sl =
		action === "BUY"
			? entry * (1 - config.stopLoss / 100)
			: entry * (1 + config.stopLoss / 100);

	const order = {
		symbol: config.symbol,
		action,
		price_entry: entry.toFixed(2),
		tp_price: tp.toFixed(2),
		sl_price: sl.toFixed(2),
		leverage: `${config.leverage}x`,
		timeframe: config.timeframe,
		timestamp: new Date().toISOString(),
	};

	const orders = fs.existsSync(orderLogPath)
		? JSON.parse(fs.readFileSync(orderLogPath))
		: [];

	orders.push(order);
	fs.writeFileSync(orderLogPath, JSON.stringify(orders, null, 2));

	return Response.json(order);
}
