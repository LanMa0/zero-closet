"use client";

import { useState } from "react";
import { Plus, Search, Phone, MessageCircle, MapPin, Edit3, Trash2 } from "lucide-react";
import { useFactories } from "@/lib/store";
import type { Factory } from "@/lib/types";
import FormModal from "@/components/FormModal";

const emptyForm: Omit<Factory, "id" | "createdAt"> = {
  name: "",
  contact: "",
  phone: "",
  wechat: "",
  address: "",
  status: "待确认",
  notes: "",
  images: [],
  samples: [],
  cooperationRecords: [],
};

const statusColors: Record<Factory["status"], string> = {
  "合作中": "bg-success/10 text-success",
  "待确认": "bg-warning/10 text-warning",
  "已暂停": "bg-gray-200 text-text-secondary",
};

export default function FactoriesPage() {
  const { factories, add, update, remove } = useFactories();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = factories.filter((f) =>
    f.name.includes(search) || f.contact.includes(search) || f.address.includes(search)
  );

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModal("add"); };
  const openEdit = (f: Factory) => { setForm(f); setEditId(f.id); setModal("edit"); };
  const save = () => {
    if (editId) update(editId, form);
    else add(form);
    setModal(null);
  };
  const confirmDelete = () => { if (deleteId) { remove(deleteId); setDeleteId(null); } };

  return (
    <div className="px-4 pt-4 pb-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[28px] font-bold tracking-tight">工厂管理</h1>
        <button onClick={openAdd} className="w-9 h-9 rounded-full bg-tint flex items-center justify-center active:scale-95 transition-transform">
          <Plus size={18} className="text-white" />
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜索工厂名称、联系人、地址" className="w-full bg-card rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder:text-text-tertiary outline-none border border-transparent focus:border-tint transition-colors" />
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((f) => (
          <div key={f.id} className="bg-card rounded-2xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold">{f.name}</h3>
                <p className="text-xs text-text-secondary mt-0.5">{f.contact}</p>
              </div>
              <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${statusColors[f.status]}`}>{f.status}</span>
            </div>
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Phone size={12} /> {f.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <MessageCircle size={12} /> 微信: {f.wechat}
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <MapPin size={12} /> {f.address}
              </div>
            </div>
            {f.notes && <p className="text-xs text-text-secondary bg-bg rounded-lg px-3 py-2 mb-3">{f.notes}</p>}
            <div className="flex items-center gap-2">
              <button onClick={() => openEdit(f)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-bg rounded-lg text-xs font-medium text-text-primary active:bg-gray-200 transition-colors">
                <Edit3 size={13} /> 编辑
              </button>
              <button onClick={() => setDeleteId(f.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-bg rounded-lg text-xs font-medium text-destructive active:bg-red-50 transition-colors">
                <Trash2 size={13} /> 删除
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-16 text-sm text-text-tertiary">暂无工厂数据</div>}
      </div>

      {/* Add / Edit Modal */}
      <FormModal open={modal !== null} onClose={() => setModal(null)} title={modal === "edit" ? "编辑工厂" : "新增工厂"}>
        <div className="space-y-4">
          {[
            { k: "name", label: "工厂名称", ph: "请输入工厂名称" },
            { k: "contact", label: "联系人", ph: "请输入联系人姓名" },
            { k: "phone", label: "手机号", ph: "请输入手机号" },
            { k: "wechat", label: "微信号", ph: "请输入微信号" },
            { k: "address", label: "地址", ph: "请输入详细地址" },
          ].map((f) => (
            <div key={f.k}>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{f.label}</label>
              <input value={(form as any)[f.k]} onChange={(e) => set(f.k, e.target.value)} placeholder={f.ph} className="w-full bg-bg rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-tint transition-colors" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">合作状态</label>
            <div className="flex gap-2">
              {(["合作中", "待确认", "已暂停"] as Factory["status"][]).map((s) => (
                <button key={s} onClick={() => set("status", s)} className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${form.status === s ? "bg-tint text-white" : "bg-bg text-text-secondary"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">备注</label>
            <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="添加备注信息" rows={3} className="w-full bg-bg rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-tint transition-colors resize-none" />
          </div>
          <button onClick={save} className="w-full py-3 bg-tint text-white rounded-xl text-sm font-semibold active:opacity-80 transition-opacity">保存</button>
        </div>
      </FormModal>

      {/* Delete Confirm */}
      <FormModal open={deleteId !== null} onClose={() => setDeleteId(null)} title="确认删除">
        <p className="text-sm text-text-secondary mb-6">删除后无法恢复，确定要删除该工厂吗？</p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteId(null)} className="flex-1 py-3 bg-bg rounded-xl text-sm font-medium">取消</button>
          <button onClick={confirmDelete} className="flex-1 py-3 bg-destructive text-white rounded-xl text-sm font-semibold">删除</button>
        </div>
      </FormModal>

      <div className="h-4" />
    </div>
  );
}
