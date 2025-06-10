import React, { useState, useEffect } from "react";
import {
	CheckCircle,
	Settings,
	TrendingUp,
	Shield,
	Target,
	BarChart3,
	Clock,
	DollarSign,
} from "lucide-react";
import "./index.css";
import axios from "axios";
const API_URL = "trading-be-production.up.railway.app";

function ConfigForm() {
	const [config, setConfig] = useState({
		symbol: "BTCUSDT",
		timeframe: "5m",
		plusDI: 25,
		minusDI: 20,
		adx: 20,
		takeProfit: 2,
		stopLoss: 1,
		leverage: 10,
	});
	const [savedConfig, setSavedConfig] = useState(null);
	const [message, setMessage] = useState("");

	useEffect(() => {
		fetchConfig();
	}, []);

	const fetchConfig = async () => {
		try {
			const response = await axios.get(`${API_URL}/config`);
			setSavedConfig(response.data);
			setConfig(response.data);
		} catch (error) {
			console.error("Error fetching config:", error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setConfig({
			...config,
			[name]: name === "symbol" || name === "timeframe" ? value : Number(value),
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${API_URL}/config`, config);
			setMessage("Konfigurasi berhasil disimpan!");
			fetchConfig();
			setTimeout(() => setMessage(""), 3000);
		} catch (error) {
			console.error("Error saving config:", error);
			setMessage("Gagal menyimpan konfigurasi!");
		}
	};

	const handleReset = () => {
		setConfig(
			savedConfig || {
				symbol: "BTCUSDT",
				timeframe: "5m",
				plusDI: 25,
				minusDI: 20,
				adx: 20,
				takeProfit: 2,
				stopLoss: 1,
				leverage: 10,
			}
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-8 text-center">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
						<Settings className="w-8 h-8 text-white" />
					</div>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Konfigurasi Strategi Trading
					</h1>
					<p className="text-gray-600">
						Atur parameter strategi ADX untuk optimalisasi trading
					</p>
				</div>

				{/* Success Message */}
				{message && (
					<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
						<CheckCircle className="w-5 h-5 text-green-500" />
						<span className="text-green-800 font-medium">{message}</span>
					</div>
				)}

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Configuration Form */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
							<div className="space-y-8">
								{/* Trading Pair & Timeframe */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
										<TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
										Trading Setup
									</h3>
									<div className="grid md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Trading Symbol
											</label>
											<div className="relative">
												<DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
												<input
													type="text"
													className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
													name="symbol"
													value={config.symbol}
													onChange={handleChange}
													placeholder="BTCUSDT"
													required
												/>
											</div>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Timeframe
											</label>
											<div className="relative">
												<Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
												<select
													className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
													name="timeframe"
													value={config.timeframe}
													onChange={handleChange}
													required>
													<option value="1m">1 Minute</option>
													<option value="5m">5 Minutes</option>
													<option value="15m">15 Minutes</option>
													<option value="30m">30 Minutes</option>
													<option value="1h">1 Hour</option>
													<option value="4h">4 Hours</option>
													<option value="1d">1 Day</option>
												</select>
											</div>
										</div>
									</div>
								</div>

								{/* ADX Indicators */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
										<BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
										ADX Indicators
									</h3>
									<div className="grid md:grid-cols-3 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												+DI Threshold
											</label>
											<input
												type="number"
												className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
												name="plusDI"
												value={config.plusDI}
												onChange={handleChange}
												min="0"
												step="0.1"
												required
											/>
											<p className="text-xs text-gray-500 mt-1">
												Positive directional indicator
											</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												-DI Threshold
											</label>
											<input
												type="number"
												className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
												name="minusDI"
												value={config.minusDI}
												onChange={handleChange}
												min="0"
												step="0.1"
												required
											/>
											<p className="text-xs text-gray-500 mt-1">
												Negative directional indicator
											</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												ADX Minimum
											</label>
											<input
												type="number"
												className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
												name="adx"
												value={config.adx}
												onChange={handleChange}
												min="0"
												step="0.1"
												required
											/>
											<p className="text-xs text-gray-500 mt-1">
												Trend strength indicator
											</p>
										</div>
									</div>
								</div>

								{/* Risk Management */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
										<Shield className="w-5 h-5 mr-2 text-green-600" />
										Risk Management
									</h3>
									<div className="grid md:grid-cols-3 gap-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Take Profit (%)
											</label>
											<div className="relative">
												<Target className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
												<input
													type="number"
													className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
													name="takeProfit"
													value={config.takeProfit}
													onChange={handleChange}
													min="0.1"
													step="0.1"
													required
												/>
											</div>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Stop Loss (%)
											</label>
											<div className="relative">
												<Shield className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
												<input
													type="number"
													className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
													name="stopLoss"
													value={config.stopLoss}
													onChange={handleChange}
													min="0.1"
													step="0.1"
													required
												/>
											</div>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												Leverage
											</label>
											<input
												type="number"
												className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
												name="leverage"
												value={config.leverage}
												onChange={handleChange}
												min="1"
												max="125"
												step="1"
												required
											/>
											<p className="text-xs text-gray-500 mt-1">
												1x - 125x leverage
											</p>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex space-x-4 pt-6 border-t border-gray-100">
									<button
										type="submit"
										className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
										onClick={handleSubmit}>
										Simpan Konfigurasi
									</button>
									<button
										type="button"
										className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
										onClick={handleReset}>
										Reset
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Active Configuration Display */}
					<div className="lg:col-span-1">
						{savedConfig && (
							<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
									<CheckCircle className="w-5 h-5 mr-2 text-green-600" />
									Konfigurasi Aktif
								</h3>
								<div className="space-y-4">
									<div className="flex justify-between items-center py-2 border-b border-gray-100">
										<span className="text-sm font-medium text-gray-600">
											Symbol
										</span>
										<span className="text-sm font-bold text-gray-900">
											{savedConfig.symbol}
										</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b border-gray-100">
										<span className="text-sm font-medium text-gray-600">
											Timeframe
										</span>
										<span className="text-sm font-bold text-gray-900">
											{savedConfig.timeframe}
										</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b border-gray-100">
										<span className="text-sm font-medium text-gray-600">
											+DI
										</span>
										<span className="text-sm font-bold text-purple-600">
											{savedConfig.plusDI}
										</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b border-gray-100">
										<span className="text-sm font-medium text-gray-600">
											-DI
										</span>
										<span className="text-sm font-bold text-purple-600">
											{savedConfig.minusDI}
										</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b border-gray-100">
										<span className="text-sm font-medium text-gray-600">
											ADX
										</span>
										<span className="text-sm font-bold text-purple-600">
											{savedConfig.adx}
										</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b border-gray-100">
										<span className="text-sm font-medium text-gray-600">
											Take Profit
										</span>
										<span className="text-sm font-bold text-green-600">
											{savedConfig.takeProfit}%
										</span>
									</div>
									<div className="flex justify-between items-center py-2 border-b border-gray-100">
										<span className="text-sm font-medium text-gray-600">
											Stop Loss
										</span>
										<span className="text-sm font-bold text-red-600">
											{savedConfig.stopLoss}%
										</span>
									</div>
									<div className="flex justify-between items-center py-2">
										<span className="text-sm font-medium text-gray-600">
											Leverage
										</span>
										<span className="text-sm font-bold text-orange-600">
											{savedConfig.leverage}x
										</span>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ConfigForm;
