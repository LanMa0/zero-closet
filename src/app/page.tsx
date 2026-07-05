"use client";

import Link from "next/link";
import { Factory, ShoppingBag, ClipboardList, TrendingUp, ArrowRight, ChevronRight } from "lucide-react";
import { useFactories, useProducts, useOrders } from "@/lib/store";

export default function Dashboard() {
  const { factories } = useFactories();
  const { products } = useProducts();
  const { orders } = useOrders();

  const stats = [
    { label: "合作工厂", value: factories.filter(f => f.status === "合作中").length, icon: Factory, href: "/factories", color: "bg-blue-500" },
    { label: "在售商品", value: products.filter(p => p.status === "已上架").length, icon: ShoppingBag, href: "/products", color: "bg-orange-500" },
    { label: "待发货", value: orders.filter(o => o.status === "待发货").length, icon: ClipboardList, href: "/orders", color: "bg-red-500" },
    { label: "本月收入", value: "¥" + orders.filter(o => o.status !== "已取消").reduce((s, o) => s + o.amount, 0), icon: TrendingUp, href: "/stats", color: "bg-green-500" },
  ];

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="px-4 pt-4 pb-2">
      {/* Header */}
      <div className="mb-6">
        <p className="text-text-secondary text-sm">欢迎回来</p>
        <h1 className="text-[28px] font-bold tracking-tight mt-0.5">0°C的衣柜</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} href={s.href} className="bg-card rounded-2xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform">
              <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center`}>
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                <p className="text-xs text-text-secondary mt-0.5">{s.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-2xl overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-separator">
          <h2 className="text-sm font-semibold">快捷操作</h2>
        </div>
        <div className="divide-y divide-separator">
          {[
            { label: "新增工厂", href: "/factories" },
            { label: "新增商品", href: "/products" },
            { label: "查看订单", href: "/orders" },
          ].map((a) => (
            <Link key={a.label} href={a.href} className="flex items-center justify-between px-4 py-3.5 active:bg-gray-50 transition-colors">
              <span className="text-sm">{a.label}</span>
              <ChevronRight size={16} className="text-text-tertiary" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-separator">
          <h2 className="text-sm font-semibold">最近订单</h2>
          <Link href="/orders" className="flex items-center gap-0.5 text-xs text-tint">
            全部 <ArrowRight size={12} />
          </Link>
        </div>
        <div className="divide-y divide-separator">
          {recentOrders.map((o) => (
            <div key={o.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{o.productName} × {o.quantity}</p>
                <p className="text-xs text-text-secondary mt-0.5">{o.customer} · {o.createdAt}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">¥{o.amount}</p>
                <p className={`text-xs mt-0.5 ${
                  o.status === "已完成" ? "text-success" :
                  o.status === "待发货" ? "text-warning" :
                  o.status === "已发货" ? "text-tint" : "text-text-tertiary"
                }`}>{o.status}</p>
              </div>
            </div>
          ))}
          {recentOrders.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-text-tertiary">暂无订单</div>
          )}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
