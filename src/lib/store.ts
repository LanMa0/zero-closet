"use client";

import { useCallback, useMemo } from "react";
import type { Factory, Product, Order, UserInfo, InventoryItem, InsightItem } from "./types";
import { createStorageService, usePersistedCollection, usePersistedValue } from "./storage";

// ─── Default Data ───────────────────────────────────────────

const defaultFactories: Factory[] = [
  {
    id: "f1",
    name: "佛山市嘉禾制衣厂",
    contact: "李经理",
    phone: "13800138001",
    wechat: "jiahe_li",
    address: "广东省佛山市禅城区张槎街道工业路88号",
    status: "合作中",
    notes: "主力工厂，质量稳定，交期准时",
    createdAt: "2026-03-10",
  },
  {
    id: "f2",
    name: "中山市恒达针织厂",
    contact: "王总",
    phone: "13900139002",
    wechat: "hengda_wang",
    address: "广东省中山市沙溪镇隆兴工业区",
    status: "待确认",
    notes: "正在洽谈中，报价待确认",
    createdAt: "2026-05-20",
  },
  {
    id: "f3",
    name: "东莞市长安宏图制衣厂",
    contact: "张师傅",
    phone: "13700137003",
    wechat: "hongtu_zhang",
    address: "广东省东莞市长安镇锦厦社区工业园",
    status: "已暂停",
    notes: "之前合作过，版型不错但交期偏慢",
    createdAt: "2026-01-15",
  },
];

const defaultProducts: Product[] = [
  {
    id: "p1",
    name: "极简白T · 32支精梳棉",
    category: "上衣",
    price: 89,
    status: "已上架",
    image: "/images/item-1.svg",
    description: "32支精梳棉，200g，Oversize版型，亲肤透气",
    factoryId: "f1",
    createdAt: "2026-06-01",
  },
  {
    id: "p2",
    name: "基础黑T · 同款不同色",
    category: "上衣",
    price: 89,
    status: "已上架",
    image: "/images/item-2.svg",
    description: "与白T同款面料，经典黑色",
    factoryId: "f1",
    createdAt: "2026-06-05",
  },
  {
    id: "p3",
    name: "灰色卫衣 · 380g毛圈",
    category: "上衣",
    price: 169,
    status: "打样中",
    image: "/images/item-3.svg",
    description: "380g纯棉毛圈，落肩设计，加绒内里",
    factoryId: "f2",
    createdAt: "2026-06-10",
  },
  {
    id: "p4",
    name: "帆布托特包",
    category: "配饰",
    price: 59,
    status: "待上架",
    image: "/images/item-4.svg",
    description: "12安帆布，手提单肩两用",
    factoryId: "f1",
    createdAt: "2026-06-12",
  },
];

const defaultOrders: Order[] = [
  { id: "o1", productId: "p1", productName: "极简白T", quantity: 2, amount: 178, status: "已完成", customer: "张三", createdAt: "2026-06-15" },
  { id: "o2", productId: "p2", productName: "基础黑T", quantity: 1, amount: 89, status: "已发货", customer: "李四", createdAt: "2026-06-17" },
  { id: "o3", productId: "p1", productName: "极简白T", quantity: 3, amount: 267, status: "待发货", customer: "王五", createdAt: "2026-06-19" },
  { id: "o4", productId: "p4", productName: "帆布托特包", quantity: 1, amount: 59, status: "已取消", customer: "赵六", createdAt: "2026-06-20" },
];

const defaultUser: UserInfo = {
  name: "归零",
  avatar: "/images/avatar.svg",
  bio: "从零开始做衣服的人",
  role: "品牌主理人",
  email: "zero@0cwardrobe.com",
  phone: "13800000000",
};

const defaultInventory: InventoryItem[] = [
  {
    id: "inv-1",
    productId: "p1",
    sku: "SKU-001",
    stock: 128,
    reserved: 12,
    location: "佛山仓",
    updatedAt: "2026-06-20",
  },
];

const defaultInsights: InsightItem[] = [
  {
    id: "insight-1",
    title: "周成交增长",
    value: "+17%",
    delta: "+8%",
    trend: "up",
    category: "sales",
    updatedAt: "2026-06-20",
  },
];

// ─── Storage instance ─────────────────────────────────────

const storage = createStorageService({
  factories: defaultFactories,
  products: defaultProducts,
  orders: defaultOrders,
  inventory: defaultInventory,
  insights: defaultInsights,
  user: defaultUser,
});

// ─── Hooks ──────────────────────────────────────────────────

export function useFactories() {
  const { items: factories, ready, create, update, remove } = usePersistedCollection<Factory>(storage, "factories", defaultFactories);

  const add = useCallback((f: Omit<Factory, "id" | "createdAt">) => {
    create({
      ...f,
      id: undefined,
      createdAt: undefined,
    } as Omit<Factory, "id" | "createdAt"> & Partial<Pick<Factory, "id" | "createdAt">>);
  }, [create]);

  const updateFactory = useCallback((id: string, data: Partial<Factory>) => {
    update(id, data);
  }, [update]);

  const removeFactory = useCallback((id: string) => {
    remove(id);
  }, [remove]);

  return { factories, add, update: updateFactory, remove: removeFactory, ready };
}

export function useProducts() {
  const { items: products, ready, create, update, remove } = usePersistedCollection<Product>(storage, "products", defaultProducts);

  const add = useCallback((p: Omit<Product, "id" | "createdAt">) => {
    create({
      ...p,
      id: undefined,
      createdAt: undefined,
    } as Omit<Product, "id" | "createdAt"> & Partial<Pick<Product, "id" | "createdAt">>);
  }, [create]);

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    update(id, data);
  }, [update]);

  const removeProduct = useCallback((id: string) => {
    remove(id);
  }, [remove]);

  return { products, add, update: updateProduct, remove: removeProduct, ready };
}

export function useOrders() {
  const { items: orders, ready, update, remove } = usePersistedCollection<Order>(storage, "orders", defaultOrders);

  const updateOrder = useCallback((id: string, data: Partial<Order>) => {
    update(id, data);
  }, [update]);

  const removeOrder = useCallback((id: string) => {
    remove(id);
  }, [remove]);

  return { orders, update: updateOrder, remove: removeOrder, ready };
}

export function useUser() {
  const { value: user, ready, set } = usePersistedValue<UserInfo>(storage, "user", defaultUser);

  const update = useCallback((data: Partial<UserInfo>) => {
    set({ ...user, ...data });
  }, [set, user]);

  return { user, update, ready };
}

export function useInventory() {
  return usePersistedCollection<InventoryItem>(storage, "inventory", defaultInventory);
}

export function useInsights() {
  return usePersistedCollection<InsightItem>(storage, "insights", defaultInsights);
}

export const storageService = storage;

export function useStorage() {
  return useMemo(() => storageService, []);
}
