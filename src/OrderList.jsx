import React, { useState, useEffect } from "react";
import {
	RefreshCw,
	TrendingUp,
	TrendingDown,
	Clock,
	DollarSign,
	Target,
	Shield,
	BarChart3,
	Calendar,
	Loader2,
} from "lucide-react";
import axios from "axios";
const API_URL = "trading-be-production.up.railway.app";

function OrderList() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchOrders();
	}, []);

	const fetchOrders = async () => {
		try {
			// Data yang berada di orders.json hanya data dummy/hardcoded
			setLoading(true);
			const response = await axios.get(`${API_URL}/orders`);
			setOrders([response.data]);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching orders:", error);
			setLoading(false);
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleString("id-ID", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const getActionIcon = (action) => {
		return action === "BUY" ? (
			<TrendingUp className="w-4 h-4" />
		) : (
			<TrendingDown className="w-4 h-4" />
		);
	};

	const getActionColor = (action) => {
		return action === "BUY"
			? "bg-green-100 text-green-800 border-green-200"
			: "bg-red-100 text-red-800 border-red-200";
	};

	const getRowBgColor = (action) => {
		return action === "BUY"
			? "bg-green-50 hover:bg-green-100"
			: "bg-red-50 hover:bg-red-100";
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center justify-between">
						<div>
							<div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
								<BarChart3 className="w-6 h-6 text-white" />
							</div>
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								Daftar Order Trading
							</h1>
							<p className="text-gray-600">
								Monitor semua order trading yang telah dieksekusi
							</p>
						</div>
						<button
							className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
							onClick={fetchOrders}
							disabled={loading}>
							<RefreshCw
								className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
							/>
							Refresh
						</button>
					</div>
				</div>

				{/* Content */}
				<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
					{loading ? (
						<div className="flex items-center justify-center py-16">
							<div className="text-center">
								<Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
								<p className="text-gray-600 font-medium">
									Memuat data order...
								</p>
							</div>
						</div>
					) : orders.length === 0 ? (
						<div className="text-center py-16">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
								<BarChart3 className="w-8 h-8 text-gray-400" />
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								Belum Ada Order
							</h3>
							<p className="text-gray-600 mb-6">
								Order trading akan muncul di sini setelah dieksekusi
							</p>
							<button
								onClick={fetchOrders}
								className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200">
								<RefreshCw className="w-4 h-4 mr-2" />
								Coba Lagi
							</button>
						</div>
					) : (
						<div className="overflow-x-auto">
							{/* Desktop Table */}
							<div className="hidden lg:block">
								<table className="w-full">
									<thead className="bg-gray-50 border-b border-gray-200">
										<tr>
											<th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
												<div className="flex items-center">
													<Calendar className="w-4 h-4 mr-2" />
													Waktu
												</div>
											</th>
											<th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
												<div className="flex items-center">
													<DollarSign className="w-4 h-4 mr-2" />
													Symbol
												</div>
											</th>
											<th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
												Aksi
											</th>
											<th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
												Entry Price
											</th>
											<th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
												<div className="flex items-center justify-end">
													<Target className="w-4 h-4 mr-2" />
													Take Profit
												</div>
											</th>
											<th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
												<div className="flex items-center justify-end">
													<Shield className="w-4 h-4 mr-2" />
													Stop Loss
												</div>
											</th>
											<th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
												Leverage
											</th>
											<th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
												<div className="flex items-center justify-center">
													<Clock className="w-4 h-4 mr-2" />
													Timeframe
												</div>
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										{orders.map((order, index) => (
											<tr
												key={index}
												className={`${getRowBgColor(
													order.action
												)} transition-colors duration-200`}>
												<td className="px-6 py-4 text-sm text-gray-900 font-medium">
													{formatDate(order.timestamp)}
												</td>
												<td className="px-6 py-4">
													<span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
														{order.symbol}
													</span>
												</td>
												<td className="px-6 py-4 text-center">
													<span
														className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${getActionColor(
															order.action
														)}`}>
														{getActionIcon(order.action)}
														<span className="ml-1">{order.action}</span>
													</span>
												</td>
												<td className="px-6 py-4 text-sm text-gray-900 font-mono text-right">
													${order.price_entry}
												</td>
												<td className="px-6 py-4 text-sm text-green-600 font-mono text-right">
													${order.tp_price}
												</td>
												<td className="px-6 py-4 text-sm text-red-600 font-mono text-right">
													${order.sl_price}
												</td>
												<td className="px-6 py-4 text-center">
													<span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded">
														{order.leverage}
													</span>
												</td>
												<td className="px-6 py-4 text-center">
													<span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded">
														{order.timeframe}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{/* Mobile Cards */}
							<div className="lg:hidden">
								<div className="p-4 space-y-4">
									{orders.map((order, index) => (
										<div
											key={index}
											className={`${getRowBgColor(
												order.action
											)} rounded-lg p-4 border border-gray-200`}>
											<div className="flex items-center justify-between mb-3">
												<div className="flex items-center space-x-2">
													<span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
														{order.symbol}
													</span>
													<span
														className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${getActionColor(
															order.action
														)}`}>
														{getActionIcon(order.action)}
														<span className="ml-1">{order.action}</span>
													</span>
												</div>
												<div className="text-xs text-gray-500">
													{formatDate(order.timestamp)}
												</div>
											</div>

											<div className="grid grid-cols-2 gap-3 text-sm">
												<div>
													<span className="text-gray-600">Entry:</span>
													<div className="font-mono font-medium">
														${order.price_entry}
													</div>
												</div>
												<div>
													<span className="text-gray-600">Leverage:</span>
													<div className="font-medium text-orange-600">
														{order.leverage}
													</div>
												</div>
												<div>
													<span className="text-gray-600">Take Profit:</span>
													<div className="font-mono font-medium text-green-600">
														${order.tp_price}
													</div>
												</div>
												<div>
													<span className="text-gray-600">Stop Loss:</span>
													<div className="font-mono font-medium text-red-600">
														${order.sl_price}
													</div>
												</div>
											</div>

											<div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
												<span className="text-xs text-gray-500">Timeframe</span>
												<span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
													{order.timeframe}
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Order Summary */}
				{orders.length > 0 && (
					<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
							<div className="flex items-center">
								<div className="p-2 bg-blue-100 rounded-lg">
									<BarChart3 className="w-6 h-6 text-blue-600" />
								</div>
								<div className="ml-4">
									<p className="text-sm text-gray-600">Total Orders</p>
									<p className="text-2xl font-bold text-gray-900">
										{orders.length}
									</p>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
							<div className="flex items-center">
								<div className="p-2 bg-green-100 rounded-lg">
									<TrendingUp className="w-6 h-6 text-green-600" />
								</div>
								<div className="ml-4">
									<p className="text-sm text-gray-600">Buy Orders</p>
									<p className="text-2xl font-bold text-green-600">
										{orders.filter((order) => order.action === "BUY").length}
									</p>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
							<div className="flex items-center">
								<div className="p-2 bg-red-100 rounded-lg">
									<TrendingDown className="w-6 h-6 text-red-600" />
								</div>
								<div className="ml-4">
									<p className="text-sm text-gray-600">Sell Orders</p>
									<p className="text-2xl font-bold text-red-600">
										{orders.filter((order) => order.action === "SELL").length}
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default OrderList;
