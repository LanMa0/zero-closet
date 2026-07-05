"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera, ChevronRight, LogOut, Settings, Bell, Shield, Info, HelpCircle } from "lucide-react";
import { useUser } from "@/lib/store";
import FormModal from "@/components/FormModal";

const menuItems = [
  { icon: Settings, label: "个人资料", action: "edit" as const },
  { icon: Bell, label: "通知设置", action: "info" as const },
  { icon: Shield, label: "隐私设置", action: "info" as const },
  { icon: Info, label: "关于我们", action: "about" as const },
  { icon: HelpCircle, label: "帮助与反馈", action: "info" as const },
];

export default function ProfilePage() {
  const { user, update } = useUser();
  const [editOpen, setEditOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState("");
  const [form, setForm] = useState({ name: "", bio: "", email: "", phone: "", role: "" });
  const avatarRef = useRef<HTMLInputElement>(null);

  const openEdit = () => {
    setForm({ name: user.name, bio: user.bio, email: user.email, phone: user.phone, role: user.role });
    setEditOpen(true);
  };

  const saveProfile = () => { update(form); setEditOpen(false); };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === "string") update({ avatar: reader.result }); };
    reader.readAsDataURL(file);
  };

  const handleMenu = (action: string, label: string) => {
    if (action === "edit") openEdit();
    else if (action === "about") setAboutOpen(true);
    else { setInfoTitle(label); setInfoOpen(true); }
  };

  return (
    <div className="px-4 pt-4 pb-2">
      <h1 className="text-[28px] font-bold tracking-tight mb-6">我的</h1>

      {/* Profile Card */}
      <div className="bg-card rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => avatarRef.current?.click()} className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-bg">
            <Image src={user.avatar} alt="头像" fill className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
              <Camera size={16} className="text-white" />
            </div>
          </button>
          <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold truncate">{user.name}</h2>
            <p className="text-xs text-text-secondary mt-0.5">{user.role}</p>
            <p className="text-xs text-text-secondary mt-0.5 truncate">{user.bio}</p>
          </div>
          <button onClick={openEdit} className="px-3 py-1.5 bg-bg rounded-lg text-xs font-medium active:bg-gray-200 transition-colors">编辑</button>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-card rounded-2xl overflow-hidden mb-6">
        <div className="divide-y divide-separator">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} onClick={() => handleMenu(item.action, item.label)} className="flex items-center gap-3 w-full px-4 py-3.5 active:bg-gray-50 transition-colors">
                <Icon size={18} className="text-text-secondary" />
                <span className="flex-1 text-sm text-left">{item.label}</span>
                <ChevronRight size={16} className="text-text-tertiary" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-destructive bg-card rounded-2xl active:bg-red-50 transition-colors">
        <LogOut size={16} />
        退出登录
      </button>

      {/* Edit Profile Modal */}
      <FormModal open={editOpen} onClose={() => setEditOpen(false)} title="编辑个人资料">
        <div className="space-y-4">
          {[
            { k: "name", label: "昵称", ph: "请输入昵称" },
            { k: "role", label: "角色", ph: "品牌主理人" },
            { k: "bio", label: "简介", ph: "一句话介绍自己" },
            { k: "email", label: "邮箱", ph: "your@email.com" },
            { k: "phone", label: "手机号", ph: "请输入手机号" },
          ].map((f) => (
            <div key={f.k}>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">{f.label}</label>
              <input value={(form as any)[f.k]} onChange={(e) => setForm((p) => ({ ...p, [f.k]: e.target.value }))} placeholder={f.ph} className="w-full bg-bg rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-tint transition-colors" />
            </div>
          ))}
          <button onClick={saveProfile} className="w-full py-3 bg-tint text-white rounded-xl text-sm font-semibold active:opacity-80 transition-opacity">保存</button>
        </div>
      </FormModal>

      {/* About Modal */}
      <FormModal open={aboutOpen} onClose={() => setAboutOpen(false)} title="关于我们">
        <div className="text-center py-6">
          <p className="text-2xl font-bold mb-1">0°C的衣柜</p>
          <p className="text-xs text-text-secondary mb-4">v1.0.0</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            从工厂打样到上架，记录每一件衣服的诞生。<br />
            我们相信，好衣服值得被认真对待。
          </p>
        </div>
      </FormModal>

      {/* Info Modal */}
      <FormModal open={infoOpen} onClose={() => setInfoOpen(false)} title={infoTitle}>
        <div className="text-center py-8">
          <p className="text-sm text-text-secondary">该功能正在开发中，敬请期待</p>
        </div>
      </FormModal>

      <div className="h-4" />
    </div>
  );
}
