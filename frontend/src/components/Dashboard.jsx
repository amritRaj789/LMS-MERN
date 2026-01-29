import React from "react";

const stats = [
  { title: "Users", value: "1,245" },
  { title: "Revenue", value: "₹82,400" },
  { title: "Orders", value: "312" },
  { title: "Growth", value: "+12%" },
];


const Dashboard = () => {
    
    return (
    <div className="min-h-screen bg-gray-100 p-6">
        {/* Header */}
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
            Dashboard
            </h1>
            <p className="text-gray-500">
            Welcome back! Here's a quick overview.
            </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
            <div
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h2 className="text-2xl font-semibold text-gray-800 mt-2">
                {stat.value}
                </h2>
            </div>
            ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
            </h2>
            <ul className="space-y-3">
            <li className="flex justify-between text-sm text-gray-600">
                <span>User John registered</span>
                <span>2 mins ago</span>
            </li>
            <li className="flex justify-between text-sm text-gray-600">
                <span>Order #123 placed</span>
                <span>10 mins ago</span>
            </li>
            <li className="flex justify-between text-sm text-gray-600">
                <span>Payment received</span>
                <span>1 hour ago</span>
            </li>
            </ul>
        </div>
    </div>
    )
}

export default Dashboard;