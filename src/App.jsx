import React, { useState } from "react";
import { Bot, Settings, BarChart3, TrendingUp, Activity } from "lucide-react";
import ConfigForm from "./ConfigForm";
import OrderList from "./OrderList";
import "./index.css";
function App() {
	const [activeTab, setActiveTab] = useState("config");

	const tabs = [
		{
			id: "config",
			label: "Konfigurasi",
			icon: Settings,
			description: "Atur parameter strategi trading",
			color: "blue",
		},
		{
			id: "orders",
			label: "Daftar Order",
			icon: BarChart3,
			description: "Monitor order yang dieksekusi",
			color: "purple",
		},
	];

	const getTabColorClasses = (tabId, isActive) => {
		const colors = {
			config: {
				active: "bg-blue-50 text-blue-700 border-blue-200",
				inactive: "text-gray-600 hover:text-blue-600 hover:bg-blue-50",
			},
			orders: {
				active: "bg-purple-50 text-purple-700 border-purple-200",
				inactive: "text-gray-600 hover:text-purple-600 hover:bg-purple-50",
			},
		};
		return colors[tabId] ? colors[tabId][isActive ? "active" : "inactive"] : "";
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
			{/* Header */}
			<div className="bg-white shadow-sm border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-6 py-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
								<Bot className="w-8 h-8 text-white" />
							</div>
							<div>
								<h1 className="text-3xl font-bold text-gray-900">
									Trading Bot Dashboard
								</h1>
								<p className="text-gray-600 mt-1">
									Kelola strategi dan monitor performa trading otomatis
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-2 text-gray-600">
							<Activity className="w-5 h-5" />
							<span className="text-sm font-medium">Live Trading</span>
						</div>
					</div>
				</div>
			</div>

			{/* Navigation Tabs */}
			<div className="max-w-7xl mx-auto px-6 py-6">
				<div className="mb-8">
					<div className="flex space-x-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
						{tabs.map((tab) => {
							const Icon = tab.icon;
							const isActive = activeTab === tab.id;

							return (
								<button
									key={tab.id}
									className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
										isActive
											? `${getTabColorClasses(
													tab.id,
													true
											  )} shadow-sm border transform scale-105`
											: `${getTabColorClasses(
													tab.id,
													false
											  )} hover:transform hover:scale-102`
									}`}
									onClick={() => setActiveTab(tab.id)}>
									<Icon className={`w-5 h-5 ${isActive ? "" : "opacity-70"}`} />
									<div className="text-left">
										<div className="font-semibold">{tab.label}</div>
										<div
											className={`text-xs ${
												isActive ? "opacity-80" : "opacity-60"
											}`}>
											{tab.description}
										</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>

				{/* Tab Content */}
				<div className="transition-all duration-300">
					{activeTab === "config" && (
						<div className="animate-fade-in">
							<ConfigForm />
						</div>
					)}
					{activeTab === "orders" && (
						<div className="animate-fade-in">
							<OrderList />
						</div>
					)}
				</div>
			</div>

			{/* Quick Stats Footer */}
			<div className="bg-white border-t border-gray-200 mt-12">
				<div className="max-w-7xl mx-auto px-6 py-6">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-blue-600">24/7</div>
							<div className="text-sm text-gray-600">Monitoring Aktif</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-green-600">ADX</div>
							<div className="text-sm text-gray-600">Strategi Utama</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-purple-600">Auto</div>
							<div className="text-sm text-gray-600">Eksekusi Order</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-orange-600">Risk</div>
							<div className="text-sm text-gray-600">Management</div>
						</div>
					</div>
				</div>
			</div>

			{/* Custom Styles */}
			<style jsx>{`
				.animate-fade-in {
					animation: fadeIn 0.3s ease-in-out;
				}

				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.hover\\:scale-102:hover {
					transform: scale(1.02);
				}
			`}</style>
		</div>
	);
}

export default App;
