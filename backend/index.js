import express from "express";
import fs from "fs";
import cors from "cors";
import fetchPrice from "./fetchPrice.js";

const app = express();
app.use(cors()); // Ini cukup untuk kebanyakan kasus

app.use(express.json({ type: "*/*" }));

const configPath = "./config.json";
const orderLogPath = "./orders.json";

const defaultConfig = {
	symbol: "BTCUSDT",
	timeframe: "5m",
	plusDI: 25,
	minusDI: 20,
	adx: 20,
	takeProfit: 2,
	stopLoss: 1,
	leverage: 10,
};

app.post("/config", (req, res) => {
	fs.writeFileSync(configPath, JSON.stringify(req.body, null, 2));
	res.json({ message: "Config disimpan" });
});

app.get("/config", (req, res) => {
	if (fs.existsSync(configPath)) {
		const config = JSON.parse(fs.readFileSync(configPath));
		res.json(config);
	} else {
		res.json(defaultConfig);
	}
});

app.post("/webhook", async (req, res) => {
	const signal = req.body;
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

	if (!action) return res.json({ message: "Sinyal tidak valid" });

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

	res.json(order);
});

app.get("/orders", (req, res) => {
	const orders = fs.existsSync(orderLogPath)
		? JSON.parse(fs.readFileSync(orderLogPath))
		: [];
	res.json(orders);
});

app.listen(5000, () => console.log("Server jalan di http://localhost:5000"));
