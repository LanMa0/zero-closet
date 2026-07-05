"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Factory, ShoppingBag, BarChart3, User } from "lucide-react";

const tabs = [
  { href: "/", label: "首页", icon: LayoutDashboard },
  { href: "/factories", label: "工厂", icon: Factory },
  { href: "/products", label: "商品", icon: ShoppingBag },
  { href: "/stats", label: "数据", icon: BarChart3 },
  { href: "/profile", label: "我的", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-separator">
      <div className="max-w-lg mx-auto flex items-center justify-around h-[52px] px-2 safe-area-bottom">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 w-14 transition-colors duration-200 ${
                active ? "text-tint" : "text-text-tertiary"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2 : 1.5} />
              <span className="text-[10px] leading-none font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
