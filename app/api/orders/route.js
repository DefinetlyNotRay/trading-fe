import fs from "fs";
import path from "path";

const orderLogPath = path.join(process.cwd(), "orders.json");

export async function GET() {
	try {
		let orders = [];

		if (fs.existsSync(orderLogPath)) {
			const data = fs.readFileSync(orderLogPath, "utf8");

			try {
				orders = JSON.parse(data);
			} catch (err) {
				console.error("Failed to parse orders.json:", err);
				return new Response(JSON.stringify({ error: "Invalid JSON format" }), {
					status: 500,
					headers: { "Content-Type": "application/json" },
				});
			}
		}

		return new Response(JSON.stringify(orders), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("GET /api/orders failed:", error);
		return new Response(
			JSON.stringify({
				error: "Internal Server Error",
				details: error.message,
			}),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}
