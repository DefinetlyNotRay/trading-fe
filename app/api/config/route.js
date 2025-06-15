import fs from "fs";
import path from "path";

const configPath = path.join(process.cwd(), "config.json");

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

export async function GET() {
	if (fs.existsSync(configPath)) {
		const config = JSON.parse(fs.readFileSync(configPath));
		return Response.json(config);
	} else {
		return Response.json(defaultConfig);
	}
}

export async function POST(req) {
	const body = await req.json();
	fs.writeFileSync(configPath, JSON.stringify(body, null, 2));
	return Response.json({ message: "Config disimpan" });
}
