// 工厂日记
export const factoryDiaries = [
  {
    id: 1,
    title: "第一批白T的诞生",
    date: "2026.06.15",
    image: "/images/factory-1.svg",
    excerpt: "凌晨三点，佛山的工厂灯火通明。我们终于确认了第一批纯白T恤的面料——32支精梳棉，触感像婴儿皮肤。",
    tag: "面料确认",
    likes: 234,
  },
  {
    id: 2,
    title: "跟车去了趟面料市场",
    date: "2026.06.10",
    image: "/images/factory-2.svg",
    excerpt: "中大布匹市场走了一整天，从几百种面料里挑出了三种备选。老板说我们太挑剔，但我们不想将就。",
    tag: "面料采购",
    likes: 189,
  },
  {
    id: 3,
    title: "版型调整了五次",
    date: "2026.06.05",
    image: "/images/factory-3.svg",
    excerpt: "为了让肩线刚好落在正确的位置，我们和版师反复调整了五次。每次只改一厘米，但穿上身的感觉完全不同。",
    tag: "打版调整",
    likes: 312,
  },
];

// 打样记录
export const samplingRecords = [
  {
    id: 1,
    title: "001号 · 极简白T",
    status: "完成",
    date: "2026.06.18",
    image: "/images/sample-1.svg",
    details: "32支精梳棉 / 200g / Oversize版型",
    round: 3,
  },
  {
    id: 2,
    title: "002号 · 基础卫衣",
    status: "进行中",
    date: "2026.06.20",
    image: "/images/sample-2.svg",
    details: "380g纯棉毛圈 / 落肩设计 / 加绒内里",
    round: 2,
  },
  {
    id: 3,
    title: "003号 · 直筒西裤",
    status: "待开始",
    date: "2026.06.22",
    image: "/images/sample-3.svg",
    details: "TR面料 / 微弹 / 利落剪裁",
    round: 0,
  },
];

// 创业日志
export const startupLogs = [
  {
    id: 1,
    title: "从零开始，我们为什么要做这个品牌",
    date: "2026.06.01",
    image: "/images/startup-1.svg",
    excerpt: "市面上不缺衣服，但缺让人安心的衣服。我们想做那种穿上就不想脱下来的基础款——不贵，但绝不廉价。",
    readTime: "3 min",
  },
  {
    id: 2,
    title: "第一个月：踩过的坑和学到的事",
    date: "2026.06.15",
    image: "/images/startup-2.svg",
    excerpt: "找工厂被拒了七次，面料商嫌我们量太小，快递费比衣服还贵。但每踩一个坑，我们就离目标更近一步。",
    readTime: "5 min",
  },
  {
    id: 3,
    title: "第一批货终于要出了",
    date: "2026.06.21",
    image: "/images/startup-3.svg",
    excerpt: "从想法到成品，整整三个月。100件白T，每一件都经过我们的手。不多，但每一件都对得起这个名字。",
    readTime: "4 min",
  },
];

// 今日推荐穿搭
export const todayOutfits = [
  {
    id: 1,
    title: "极简日常",
    image: "/images/outfit-1.svg",
    items: ["白色基础T", "黑色直筒裤", "帆布鞋"],
    likes: 456,
  },
  {
    id: 2,
    title: "通勤休闲",
    image: "/images/outfit-2.svg",
    items: ["灰色卫衣", "深蓝牛仔裤", "白色运动鞋"],
    likes: 328,
  },
  {
    id: 3,
    title: "周末出街",
    image: "/images/outfit-3.svg",
    items: ["黑色oversize T", "工装短裤", "帆布包"],
    likes: 289,
  },
];

// 热门单品
export const hotItems = [
  {
    id: 1,
    name: "极简白T · 32支精梳棉",
    price: 89,
    image: "/images/item-1.svg",
    tag: "首批上新",
  },
  {
    id: 2,
    name: "基础黑T · 同款不同色",
    price: 89,
    image: "/images/item-2.svg",
    tag: "热销",
  },
  {
    id: 3,
    name: "灰色卫衣 · 380g毛圈",
    price: 169,
    image: "/images/item-3.svg",
    tag: "打样中",
  },
  {
    id: 4,
    name: "帆布托特包",
    price: 59,
    image: "/images/item-4.svg",
    tag: "即将上架",
  },
];

// 衣柜分类
export const wardrobeCategories = [
  { id: 1, name: "全部", count: 12 },
  { id: 2, name: "上衣", count: 5 },
  { id: 3, name: "裤装", count: 3 },
  { id: 4, name: "外套", count: 2 },
  { id: 5, name: "配饰", count: 2 },
];

// 我的衣柜衣物
export const wardrobeItems = [
  {
    id: 1,
    name: "极简白T",
    category: "上衣",
    image: "/images/wardrobe-1.svg",
    color: "#FFFFFF",
    addedDate: "2026.06.18",
  },
  {
    id: 2,
    name: "黑色直筒裤",
    category: "裤装",
    image: "/images/wardrobe-2.svg",
    color: "#000000",
    addedDate: "2026.06.16",
  },
  {
    id: 3,
    name: "灰色卫衣",
    category: "上衣",
    image: "/images/wardrobe-3.svg",
    color: "#808080",
    addedDate: "2026.06.14",
  },
  {
    id: 4,
    name: "卡其风衣",
    category: "外套",
    image: "/images/wardrobe-4.svg",
    color: "#C4A882",
    addedDate: "2026.06.12",
  },
  {
    id: 5,
    name: "帆布鞋",
    category: "配饰",
    image: "/images/wardrobe-5.svg",
    color: "#F5F5DC",
    addedDate: "2026.06.10",
  },
  {
    id: 6,
    name: "深蓝牛仔裤",
    category: "裤装",
    image: "/images/wardrobe-6.svg",
    color: "#1E3A5F",
    addedDate: "2026.06.08",
  },
];

// 收藏穿搭
export const savedOutfits = [
  {
    id: 1,
    title: "All Black 极简",
    image: "/images/saved-1.svg",
    items: 3,
  },
  {
    id: 2,
    title: "黑白配经典",
    image: "/images/saved-2.svg",
    items: 3,
  },
  {
    id: 3,
    title: "灰色层次感",
    image: "/images/saved-3.svg",
    items: 4,
  },
];

// 最近搭配记录
export const recentStyles = [
  {
    id: 1,
    date: "今天",
    outfit: "白T + 黑色直筒裤 + 帆布鞋",
    image: "/images/recent-1.svg",
  },
  {
    id: 2,
    date: "昨天",
    outfit: "灰色卫衣 + 深蓝牛仔裤",
    image: "/images/recent-2.svg",
  },
  {
    id: 3,
    date: "06.19",
    outfit: "黑色oversize T + 工装短裤",
    image: "/images/recent-3.svg",
  },
];

// AI分析结果
export const aiAnalysisResult = {
  style: "极简主义",
  season: "春夏",
  occasion: "日常休闲",
  colorTone: "黑白灰",
  confidence: 92,
  tips: [
    "这件白T的版型偏oversize，适合搭配修身下装",
    "建议搭配深色裤子，形成经典的黑白对比",
    "可以加入一条简约项链作为点缀",
  ],
};

// AI推荐搭配
export const aiRecommendations = [
  {
    id: 1,
    title: "方案A · 极简通勤",
    image: "/images/saved-1.svg",
    matchScore: 95,
    items: ["白T（已上传）", "黑色西裤", "皮质乐福鞋"],
  },
  {
    id: 2,
    title: "方案B · 周末休闲",
    image: "/images/saved-2.svg",
    matchScore: 88,
    items: ["白T（已上传）", "水洗牛仔裤", "帆布鞋"],
  },
  {
    id: 3,
    title: "方案C · 街头风格",
    image: "/images/saved-3.svg",
    matchScore: 82,
    items: ["白T（已上传）", "工装裤", "帆布托特包"],
  },
];

// 用户信息
export const userInfo = {
  name: "归零",
  avatar: "/images/avatar.svg",
  bio: "从零开始做衣服的人",
  wardrobeCount: 12,
  outfitsCount: 28,
  followersCount: 1024,
  followingCount: 56,
};

// 设置项
export const settingsItems = [
  { id: 1, label: "个人资料", icon: "User" },
  { id: 2, label: "通知设置", icon: "Bell" },
  { id: 3, label: "隐私设置", icon: "Shield" },
  { id: 4, label: "深色模式", icon: "Moon" },
  { id: 5, label: "关于我们", icon: "Info" },
  { id: 6, label: "帮助与反馈", icon: "HelpCircle" },
];
