export interface SampleRecord {
  id: string;
  productName: string;
  round: number;
  status: '进行中' | '已完成' | '待开始';
  date: string;
  image: string;
  details: string;
}

export interface CooperationRecord {
  id: string;
  date: string;
  type: '下单' | '打样' | '对账' | '验货' | '其他';
  description: string;
  amount?: number;
}

export interface Factory {
  id: string;
  name: string;
  contact: string;
  phone: string;
  wechat: string;
  address: string;
  status: '合作中' | '待确认' | '已暂停';
  notes: string;
  images?: string[];
  samples?: SampleRecord[];
  cooperationRecords?: CooperationRecord[];
  createdAt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  costPrice?: number;
  status: '已上架' | '打样中' | '待上架' | '已下架';
  image: string;
  images?: string[];
  description: string;
  factoryId: string;
  sku?: string;
  stock?: number;
  sizes?: string[];
  colors?: ProductColor[];
  createdAt: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  amount: number;
  cost?: number;
  status: '待发货' | '已发货' | '已完成' | '已取消';
  customer: string;
  phone?: string;
  address?: string;
  trackingNo?: string;
  note?: string;
  createdAt: string;
}

export interface Inspiration {
  id: string;
  title: string;
  image: string;
  tags: string[];
  favorite: boolean;
  source: string;
  note: string;
  createdAt: string;
}

export interface UserInfo {
  name: string;
  avatar: string;
  bio: string;
  role: string;
  email: string;
  phone: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  sku: string;
  stock: number;
  reserved: number;
  location: string;
  updatedAt: string;
}

export interface InsightItem {
  id: string;
  title: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'stable';
  category: string;
  updatedAt: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
