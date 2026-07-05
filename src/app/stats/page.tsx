"use client";

import { Factory, ShoppingBag, ClipboardList, TrendingUp, DollarSign } from "lucide-react";
import { useFactories, useProducts, useOrders } from "@/lib/store";

export default function StatsPage() {
  const { factories } = useFactories();
  const { products } = useProducts();
  const { orders } = useOrders();

  const totalRevenue = orders.filter(o => o.status !== "已取消").reduce((s, o) => s + o.amount, 0);
  const completedOrders = orders.filter(o => o.status === "已完成").length;
  const pendingOrders = orders.filter(o => o.status === "待发货").length;
  const activeFactories = factories.filter(f => f.status === "合作中").length;
  const activeProducts = products.filter(p => p.status === "已上架").length;

  const cards = [
    { label: "总收入", value: `¥${totalRevenue}`, icon: DollarSign, color: "bg-green-500" },
    { label: "合作工厂", value: activeFactories, icon: Factory, color: "bg-blue-500" },
    { label: "在售商品", value: activeProducts, icon: ShoppingBag, color: "bg-orange-500" },
    { label: "总订单", value: orders.length, icon: ClipboardList, color: "bg-purple-500" },
    { label: "已完成", value: completedOrders, icon: TrendingUp, color: "bg-success" },
    { label: "待发货", value: pendingOrders, icon: ClipboardList, color: "bg-warning" },
  ];

  // Category breakdown
  const categories: Record<string, number> = {};
  products.forEach(p => { categories[p.category] = (categories[p.category] || 0) + 1; });
  const maxCat = Math.max(...Object.values(categories), 1);

  // Status breakdown for orders
  const orderStatuses = ["待发货", "已发货", "已完成", "已取消"].map(s => ({
    label: s,
    count: orders.filter(o => o.status === s).length,
  }));
  const maxOrder = Math.max(...orderStatuses.map(s => s.count), 1);

  return (
    <div className="px-4 pt-4 pb-2">
      <h1 className="text-[28px] font-bold tracking-tight mb-6">数据统计</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-card rounded-2xl p-4">
              <div className={`w-8 h-8 rounded-lg ${c.color} flex items-center justify-center mb-3`}>
                <Icon size={16} className="text-white" />
              </div>
              <p className="text-xl font-bold tracking-tight">{c.value}</p>
              <p className="text-xs text-text-secondary mt-0.5">{c.label}</p>
            </div>
          );
        })}
      </div>

      {/* Product Categories */}
      <div className="bg-card rounded-2xl p-4 mb-6">
        <h2 className="text-sm font-semibold mb-4">商品分类分布</h2>
        <div className="space-y-3">
          {Object.entries(categories).map(([cat, count]) => (
            <div key={cat}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">{cat}</span>
                <span className="text-xs font-medium">{count}</span>
              </div>
              <div className="w-full h-2 bg-bg rounded-full overflow-hidden">
                <div className="h-full bg-tint rounded-full transition-all duration-500" style={{ width: `${(count / maxCat) * 100}%` }} />
              </div>
            </div>
          ))}
          {Object.keys(categories).length === 0 && <p className="text-xs text-text-tertiary text-center py-4">暂无数据</p>}
        </div>
      </div>

      {/* Order Status */}
      <div className="bg-card rounded-2xl p-4 mb-6">
        <h2 className="text-sm font-semibold mb-4">订单状态分布</h2>
        <div className="space-y-3">
          {orderStatuses.map((s) => (
            <div key={s.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">{s.label}</span>
                <span className="text-xs font-medium">{s.count}</span>
              </div>
              <div className="w-full h-2 bg-bg rounded-full overflow-hidden">
                <div className="h-full bg-tint rounded-full transition-all duration-500" style={{ width: `${(s.count / maxOrder) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Factory Status */}
      <div className="bg-card rounded-2xl p-4 mb-6">
        <h2 className="text-sm font-semibold mb-3">工厂合作状态</h2>
        <div className="flex gap-2">
          {["合作中", "待确认", "已暂停"].map((s) => {
            const count = factories.filter(f => f.status === s).length;
            return (
              <div key={s} className="flex-1 bg-bg rounded-xl p-3 text-center">
                <p className="text-lg font-bold">{count}</p>
                <p className="text-[10px] text-text-secondary mt-0.5">{s}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
