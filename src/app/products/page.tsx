"use client";

import { useState, useRef } from "react";
import { Plus, Search, Edit3, Trash2, Camera } from "lucide-react";
import Image from "next/image";
import { useProducts, useFactories } from "@/lib/store";
import type { Product } from "@/lib/types";
import FormModal from "@/components/FormModal";

const emptyForm: Omit<Product, "id" | "createdAt"> = {
  name: "", category: "上衣", price: 0, status: "待上架", image: "/images/item-1.svg", description: "", factoryId: "",
};

const statusColors: Record<Product["status"], string> = {
  "已上架": "bg-success/10 text-success",
  "打样中": "bg-warning/10 text-warning",
  "待上架": "bg-gray-200 text-text-secondary",
  "已下架": "bg-gray-200 text-text-secondary",
};

export default function ProductsPage() {
  const { products, add, update, remove } = useProducts();
  const { factories } = useFactories();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const filtered = products.filter((p) => p.name.includes(search) || p.category.includes(search));
  const set = (k: string, v: string | number) => setForm((p) => ({ ...p, [k]: v }));

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModal("add"); };
  const openEdit = (p: Product) => { console.log("[Products] openEdit", p.id); setForm(p); setEditId(p.id); setModal("edit"); };
  const save = () => {
    console.log("[Products] save", { editId, form });
    if (editId) update(editId, form);
    else add(form);
    setModal(null);
  };
  const confirmDelete = () => { if (deleteId) { remove(deleteId); setDeleteId(null); } };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === "string") set("image", reader.result); };
    console.log("[Products] handleImg file:", file && file.name);
    reader.readAsDataURL(file);
  };

  return (
    <div className="px-4 pt-4 pb-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[28px] font-bold tracking-tight">商品管理</h1>
        <button onClick={openAdd} className="w-9 h-9 rounded-full bg-tint flex items-center justify-center active:scale-95 transition-transform">
          <Plus size={18} className="text-white" />
        </button>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜索商品名称或分类" className="w-full bg-card rounded-xl pl-9 pr-4 py-2.5 text-sm placeholder:text-text-tertiary outline-none border border-transparent focus:border-tint transition-colors" />
      </div>

      <div className="space-y-3">
        {filtered.map((p) => (
          <div key={p.id} className="bg-card rounded-2xl p-4 flex gap-3">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-bg">
              <Image src={p.image} alt={p.name} fill className="object-cover" unoptimized />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold truncate">{p.name}</h3>
                  <p className="text-xs text-text-secondary mt-0.5">{p.category}</p>
                </div>
                <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${statusColors[p.status]}`}>{p.status}</span>
              </div>
              <p className="text-sm font-bold mt-1.5">¥{p.price}</p>
              <div className="flex items-center gap-2 mt-2.5">
                <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-bg rounded-lg text-xs font-medium active:bg-gray-200 transition-colors">
                  <Edit3 size={12} /> 编辑
                </button>
                <button onClick={() => setDeleteId(p.id)} className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-bg rounded-lg text-xs font-medium text-destructive active:bg-red-50 transition-colors">
                  <Trash2 size={12} /> 删除
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-16 text-sm text-text-tertiary">暂无商品数据</div>}
      </div>

      <FormModal open={modal !== null} onClose={() => setModal(null)} title={modal === "edit" ? "编辑商品" : "新增商品"}>
        <div className="space-y-4">
          {/* Image upload */}
          <div className="flex justify-center">
            <button onClick={() => imgRef.current?.click()} className="relative w-20 h-20 rounded-xl overflow-hidden bg-bg">
              <Image src={form.image} alt="商品图" fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Camera size={16} className="text-white" />
              </div>
            </button>
            <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleImg} />
          </div>
          {[
            { k: "name", label: "商品名称", ph: "请输入商品名称", type: "text" },
            { k: "category", label: "分类", ph: "上衣/裤装/外套/配饰", type: "text" },
            { k: "price", label: "价格", ph: "0", type: "number" },
            { k: "description", label: "描述", ph: "商品描述", type: "textarea" },
          ].map((f) => (
            <div key={f.k}>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea value={(form as any)[f.k]} onChange={(e) => set(f.k, e.target.value)} placeholder={f.ph} rows={3} className="w-full bg-bg rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-tint transition-colors resize-none" />
              ) : (
                <input type={f.type} value={(form as any)[f.k]} onChange={(e) => set(f.k, f.type === "number" ? Number(e.target.value) : e.target.value)} placeholder={f.ph} className="w-full bg-bg rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-tint transition-colors" />
              )}
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">状态</label>
            <div className="flex gap-2">
              {(["已上架", "打样中", "待上架"] as Product["status"][]).map((s) => (
                <button key={s} onClick={() => set("status", s)} className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${form.status === s ? "bg-tint text-white" : "bg-bg text-text-secondary"}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">关联工厂</label>
            <select value={form.factoryId} onChange={(e) => set("factoryId", e.target.value)} className="w-full bg-bg rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-tint transition-colors">
              <option value="">请选择工厂</option>
              {factories.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
          <button onClick={save} className="w-full py-3 bg-tint text-white rounded-xl text-sm font-semibold active:opacity-80 transition-opacity">保存</button>
        </div>
      </FormModal>

      <FormModal open={deleteId !== null} onClose={() => setDeleteId(null)} title="确认删除">
        <p className="text-sm text-text-secondary mb-6">确定要删除该商品吗？</p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteId(null)} className="flex-1 py-3 bg-bg rounded-xl text-sm font-medium">取消</button>
          <button onClick={confirmDelete} className="flex-1 py-3 bg-destructive text-white rounded-xl text-sm font-semibold">删除</button>
        </div>
      </FormModal>

      <div className="h-4" />
    </div>
  );
}
