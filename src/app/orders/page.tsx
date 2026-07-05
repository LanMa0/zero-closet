"use client";

import { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { useOrders } from "@/lib/store";
import type { Order } from "@/lib/types";
import FormModal from "@/components/FormModal";

const tabs: { label: string; value: Order["status"] | "全部" }[] = [
  { label: "全部", value: "全部" },
  { label: "待发货", value: "待发货" },
  { label: "已发货", value: "已发货" },
  { label: "已完成", value: "已完成" },
  { label: "已取消", value: "已取消" },
];

const statusColors: Record<Order["status"], string> = {
  "待发货": "bg-warning/10 text-warning",
  "已发货": "bg-tint/10 text-tint",
  "已完成": "bg-success/10 text-success",
  "已取消": "bg-gray-200 text-text-secondary",
};

export default function OrdersPage() {
  const { orders, update, remove } = useOrders();
  const [filter, setFilter] = useState<Order["status"] | "全部">("全部");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusId, setStatusId] = useState<string | null>(null);

  const filtered = filter === "全部" ? orders : orders.filter((o) => o.status === filter);
  const confirmDelete = () => { if (deleteId) { remove(deleteId); setDeleteId(null); } };
  const changeStatus = (id: string, status: Order["status"]) => { update(id, { status }); setStatusId(null); };

  return (
    <div className="px-4 pt-4 pb-2">
      <h1 className="text-[28px] font-bold tracking-tight mb-4">订单管理</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-bg rounded-xl p-1 mb-4 overflow-x-auto hide-scrollbar">
        {tabs.map((t) => (
          <button key={t.value} onClick={() => setFilter(t.value)} className={`flex-1 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${filter === t.value ? "bg-card shadow-sm text-text-primary" : "text-text-secondary"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((o) => (
          <div key={o.id} className="bg-card rounded-2xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-semibold">{o.productName} × {o.quantity}</p>
                <p className="text-xs text-text-secondary mt-0.5">{o.customer} · {o.createdAt}</p>
              </div>
              <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${statusColors[o.status]}`}>{o.status}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-lg font-bold">¥{o.amount}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setStatusId(o.id)} className="flex-1 flex items-center justify-center gap-1 py-2 bg-bg rounded-lg text-xs font-medium active:bg-gray-200 transition-colors">
                更改状态 <ChevronDown size={12} />
              </button>
              <button onClick={() => setDeleteId(o.id)} className="w-10 flex items-center justify-center py-2 bg-bg rounded-lg text-destructive active:bg-red-50 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-16 text-sm text-text-tertiary">暂无订单数据</div>}
      </div>

      {/* Status Change */}
      <FormModal open={statusId !== null} onClose={() => setStatusId(null)} title="更改订单状态">
        <div className="space-y-2">
          {(["待发货", "已发货", "已完成", "已取消"] as Order["status"][]).map((s) => (
            <button key={s} onClick={() => changeStatus(statusId!, s)} className="w-full py-3 bg-bg rounded-xl text-sm font-medium text-left px-4 active:bg-gray-200 transition-colors">
              {s}
            </button>
          ))}
        </div>
      </FormModal>

      <FormModal open={deleteId !== null} onClose={() => setDeleteId(null)} title="确认删除">
        <p className="text-sm text-text-secondary mb-6">确定要删除该订单吗？</p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteId(null)} className="flex-1 py-3 bg-bg rounded-xl text-sm font-medium">取消</button>
          <button onClick={confirmDelete} className="flex-1 py-3 bg-destructive text-white rounded-xl text-sm font-semibold">删除</button>
        </div>
      </FormModal>

      <div className="h-4" />
    </div>
  );
}
