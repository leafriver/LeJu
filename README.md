# 乐居商城 - 全栈电商平台

[![Vue](https://img.shields.io/badge/Vue-3.5.18-4FC08D?style=flat&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.6-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.19.0+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

一个基于现代技术栈构建的全栈电商平台，包含完整的前端用户界面和后端API服务。项目采用前后端分离架构，前端使用Vue 3 + TypeScript + Vite构建，后端使用Node.js + Express + MySQL + Redis构建。

## 📋 目录

- [项目概述](#项目概述)
- [功能特性](#功能特性)
- [技术架构](#技术架构)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [核心功能详解](#核心功能详解)
- [API文档](#api文档)
- [开发指南](#开发指南)
- [部署说明](#部署说明)
- [测试](#测试)
- [性能优化](#性能优化)
- [常见问题](#常见问题)
- [贡献指南](#贡献指南)

## 🎯 项目概述

乐居商城是一个功能完整的电商平台示例项目，旨在展示现代Web应用开发的最佳实践。项目包含用户认证、商品管理、购物车、订单处理、支付流程等完整的电商业务逻辑。

### 项目亮点

- 🚀 **现代化技术栈**: Vue 3 + TypeScript + Vite + Node.js
- 🎨 **响应式设计**: 支持PC端和移动端适配
- 🔐 **完整认证系统**: JWT token + 用户权限管理
- 🛒 **完整购物流程**: 从浏览商品到支付完成的闭环
- 📱 **支付模拟**: 支持支付宝、微信、银行卡等多种支付方式
- 🗄️ **数据持久化**: MySQL数据库 + Redis缓存
- 🔧 **开发友好**: 热重载、类型检查、代码规范

## ✨ 功能特性

### 前端功能

#### 🏠 首页与导航
- **智能导航栏**: 固定顶部导航，支持用户状态切换
- **搜索功能**: 关键词搜索 + 热门搜索推荐
- **分类导航**: 商品分类筛选，支持多级分类
- **商品展示**: 网格布局，支持分页浏览
- **促销信息**: 包邮、优惠券、限时活动展示

#### 🛍️ 商品系统
- **商品列表**: 分页展示，每页9条商品
- **商品详情**: 完整商品信息，图片轮播，规格选择
- **商品评价**: 用户评分和评论系统
- **相关推荐**: 智能商品推荐算法

#### 🛒 购物车
- **购物车管理**: 添加、删除、修改数量
- **实时计算**: 商品总价、优惠金额、运费计算
- **批量操作**: 全选、批量删除、清空购物车
- **持久化存储**: 本地存储，页面刷新不丢失

#### 💳 订单与支付
- **订单结算**: 收货地址、配送方式、支付方式选择
- **地址管理**: 多地址支持，默认地址设置
- **支付流程**: 支付宝、微信、银行卡支付模拟
- **订单跟踪**: 订单状态实时更新

#### 👤 用户中心
- **用户认证**: 登录、注册、密码找回
- **个人资料**: 用户信息管理，头像上传
- **订单历史**: 历史订单查询和管理
- **地址簿**: 收货地址管理
- **安全设置**: 密码修改、账户安全

#### 📱 响应式设计
- **多端适配**: PC端、平板、手机端完美适配
- **触摸友好**: 移动端触摸操作优化
- **性能优化**: 懒加载、图片压缩、代码分割

### 后端功能

#### 🔐 认证系统
- **JWT认证**: 基于Token的用户认证
- **权限控制**: 角色基础的访问控制
- **安全防护**: 密码加密、SQL注入防护
- **会话管理**: 用户登录状态管理

#### 🗄️ 数据管理
- **商品管理**: CRUD操作，库存管理
- **用户管理**: 用户信息、权限管理
- **订单管理**: 订单创建、状态更新
- **库存管理**: 实时库存监控

#### 🚀 性能优化
- **Redis缓存**: 热点数据缓存
- **数据库优化**: 索引优化、查询优化
- **负载均衡**: 集群部署支持
- **限流保护**: API访问频率限制

## 🏗️ 技术架构

### 前端技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **Vue** | 3.5.18 | 渐进式JavaScript框架 |
| **TypeScript** | 5.8.0 | 类型安全的JavaScript超集 |
| **Vite** | 7.0.6 | 下一代前端构建工具 |
| **Vue Router** | 4.5.1 | Vue.js官方路由管理器 |
| **Pinia** | 3.0.3 | Vue状态管理库 |

### 后端技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **Node.js** | 20.19.0+ | JavaScript运行时环境 |
| **Express** | 4.18.2 | Web应用框架 |
| **MySQL2** | 3.6.5 | MySQL数据库驱动 |
| **Redis** | 5.3.2 | 内存数据库，用于缓存 |
| **JWT** | 9.0.2 | JSON Web Token认证 |

### 开发工具

| 工具 | 版本 | 说明 |
|------|------|------|
| **Vue DevTools** | 8.0.0 | Vue开发调试工具 |
| **TypeScript** | 5.8.0 | 类型检查工具 |
| **ESLint** | - | 代码质量检查 |
| **Prettier** | - | 代码格式化工具 |

## 🚀 快速开始

### 环境要求

- **Node.js**: 20.19.0 或更高版本
- **MySQL**: 8.0 或更高版本
- **Redis**: 6.0 或更高版本
- **npm**: 9.0 或更高版本

### 安装步骤

#### 1. 克隆项目

```bash
git clone <repository-url>
cd leju
```

#### 2. 安装前端依赖

```bash
npm install
```

#### 3. 安装后端依赖

```bash
cd server
npm install
cd ..
```

#### 4. 环境配置

复制环境配置文件：

```bash
# 后端环境配置
cp server/env.example server/.env

# 编辑配置文件
nano server/.env
```

配置示例：

```env
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=leju_db

# Redis配置
REDIS_URL=redis://127.0.0.1:6379

# JWT密钥
JWT_SECRET=your_jwt_secret_key

# 服务器配置
PORT=3001
NODE_ENV=development
```

#### 5. 数据库初始化

```bash
# 创建数据库
mysql -u root -p -e "CREATE DATABASE leju_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 导入表结构
mysql -u root -p leju_db < server/sql/leju_simple.sql

# 导入示例数据
mysql -u root -p leju_db < server/sql/insert_products.sql
```

#### 6. 启动服务

```bash
# 启动后端服务（新终端）
cd server
npm run server

# 启动前端开发服务器（新终端）
npm run dev
```

#### 7. 访问应用

- **前端**: http://localhost:5173
- **后端API**: http://localhost:3001

### 开发命令

```bash
# 前端开发
npm run dev              # 启动开发服务器
npm run build            # 构建生产版本
npm run preview          # 预览构建结果
npm run type-check       # TypeScript类型检查

# 后端开发
npm run server           # 启动后端服务器
npm run loadtest         # 性能测试
npm run test-api         # API测试
npm run test-auth        # 认证测试
```

## 📁 项目结构

```
leju/
├── 📁 src/                          # 前端源代码
│   ├── 📁 components/               # Vue组件
│   │   ├── 📄 HomePage.vue         # 首页组件
│   │   ├── 📄 ProductDetailPage.vue # 商品详情页
│   │   ├── 📄 CartPage.vue         # 购物车页面
│   │   ├── 📄 CheckoutPage.vue     # 结算页面
│   │   ├── 📄 LoginPage.vue        # 登录页面
│   │   ├── 📄 RegisterPage.vue     # 注册页面
│   │   ├── 📄 ProfilePage.vue      # 用户中心
│   │   ├── 📄 NavBar.vue           # 导航栏组件
│   │   ├── 📄 SiteFooter.vue       # 页脚组件
│   │   └── 📁 pay/                 # 支付相关组件
│   │       ├── 📄 PayAlipay.vue    # 支付宝支付
│   │       ├── 📄 PayWeChat.vue    # 微信支付
│   │       └── 📄 PayCard.vue      # 银行卡支付
│   ├── 📁 stores/                   # 状态管理
│   │   ├── 📄 userStore.ts         # 用户状态管理
│   │   ├── 📄 cartStore.ts         # 购物车状态管理
│   │   ├── 📄 addressStore.ts      # 地址簿状态管理
│   │   └── 📄 catalogStore.ts      # 商品目录状态管理
│   ├── 📁 router/                   # 路由配置
│   │   └── 📄 index.ts             # 路由定义和守卫
│   ├── 📁 services/                 # API服务
│   │   └── 📄 api.ts               # API接口封装
│   ├── 📁 assets/                   # 静态资源
│   │   ├── 📄 base.css             # 基础样式
│   │   ├── 📄 main.css             # 主样式
│   │   └── 📄 logo.svg             # Logo图标
│   ├── 📄 App.vue                   # 根组件
│   └── 📄 main.ts                   # 应用入口
├── 📁 server/                       # 后端源代码
│   ├── 📄 app.js                    # 主应用文件
│   ├── 📄 productRouter.js          # 商品路由
│   ├── 📄 userRouter.js             # 用户路由
│   ├── 📄 productService.js         # 商品服务
│   ├── 📄 userService.js            # 用户服务
│   ├── 📄 authMiddleware.js         # 认证中间件
│   ├── 📄 fsService.js              # 秒杀服务
│   ├── 📁 sql/                      # 数据库脚本
│   │   ├── 📄 leju_simple.sql      # 数据库表结构
│   │   ├── 📄 insert_products.sql  # 示例数据
│   │   └── 📄 create_tables_simple.sql # 简化表结构
│   └── 📄 package.json              # 后端依赖配置
├── 📄 package.json                  # 前端依赖配置
├── 📄 vite.config.ts                # Vite配置文件
├── 📄 tsconfig.json                 # TypeScript配置
└── 📄 README.md                     # 项目文档
```

## 🔧 核心功能详解

### 用户认证系统

#### 登录流程
1. 用户输入用户名和密码
2. 前端验证表单数据
3. 发送登录请求到后端
4. 后端验证用户凭据
5. 生成JWT token并返回
6. 前端保存token到localStorage
7. 更新用户状态，跳转到首页

#### 注册流程
1. 用户填写注册信息
2. 前端表单验证
3. 发送注册请求到后端
4. 后端创建新用户账户
5. 返回注册成功消息
6. 引导用户登录

#### 权限控制
- **路由守卫**: 需要认证的页面自动跳转登录
- **API保护**: 敏感接口需要有效token
- **角色权限**: 基于用户角色的功能访问控制

### 商品管理系统

#### 商品展示
- **分页加载**: 支持大量商品数据的分页展示
- **分类筛选**: 按商品分类进行筛选
- **搜索功能**: 关键词搜索商品
- **排序功能**: 按价格、销量、评分排序

#### 商品详情
- **图片展示**: 多角度商品图片
- **规格选择**: 商品规格、颜色、尺寸选择
- **库存显示**: 实时库存数量
- **相关推荐**: 智能商品推荐

### 购物车系统

#### 核心功能
- **添加商品**: 从商品列表或详情页添加
- **数量管理**: 增加、减少、删除商品
- **价格计算**: 实时计算总价、优惠、运费
- **持久化存储**: 本地存储购物车数据

#### 高级特性
- **批量操作**: 全选、批量删除
- **优惠券**: 支持优惠券应用
- **库存检查**: 添加时检查库存状态

### 订单系统

#### 订单流程
1. **购物车确认**: 选择要购买的商品
2. **地址选择**: 选择或添加收货地址
3. **配送选择**: 选择配送方式和时间
4. **支付方式**: 选择支付方式
5. **订单确认**: 确认订单信息
6. **支付处理**: 完成支付流程
7. **订单跟踪**: 跟踪订单状态

#### 地址管理
- **多地址支持**: 保存多个收货地址
- **默认地址**: 设置默认收货地址
- **地址验证**: 省市区三级联动选择
- **一键回填**: 快速填充收货信息

### 支付系统

#### 支付方式
- **支付宝**: 模拟支付宝支付流程
- **微信支付**: 模拟微信支付流程
- **银行卡**: 模拟银行卡支付流程

#### 支付流程
1. 选择支付方式
2. 生成支付订单
3. 显示支付二维码
4. 用户扫码支付
5. 支付结果确认
6. 订单状态更新

## 📚 API文档

### 认证接口

#### 用户登录
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**响应示例:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "username": "testuser",
      "email": "test@example.com",
      "role": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 用户注册
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "password": "string",
  "email": "string",
  "phone": "string"
}
```

#### 获取用户信息
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### 商品接口

#### 获取商品列表
```http
GET /api/products?page=1&limit=9&category=electronics
```

#### 获取商品详情
```http
GET /api/products/:id
```

#### 搜索商品
```http
GET /api/products/search?q=keyword&page=1&limit=9
```

### 订单接口

#### 创建订单
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "1",
      "quantity": 2
    }
  ],
  "address": {
    "name": "收货人",
    "phone": "13800138000",
    "province": "广东省",
    "city": "深圳市",
    "district": "南山区",
    "detail": "详细地址"
  },
  "paymentMethod": "alipay"
}
```

#### 获取订单列表
```http
GET /api/orders?page=1&limit=10
Authorization: Bearer <token>
```

### 秒杀接口

#### 获取秒杀商品
```http
GET /api/flash-sale/products
```

#### 参与秒杀
```http
POST /api/flash-sale/participate
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "1",
  "quantity": 1
}
```

## 🛠️ 开发指南

### 代码规范

#### Vue组件规范
- 使用Composition API和`<script setup>`语法
- 组件名使用PascalCase命名
- Props使用TypeScript类型定义
- 事件名使用kebab-case命名

#### TypeScript规范
- 严格类型检查
- 接口定义清晰
- 避免使用any类型
- 使用泛型提高代码复用性

#### 样式规范
- 使用CSS变量定义主题色彩
- 响应式设计优先
- 组件样式作用域隔离
- 使用BEM命名规范

### 状态管理

#### Store设计原则
- 单一职责原则
- 状态不可变性
- 异步操作处理
- 持久化存储

#### 使用示例
```typescript
// 用户状态管理
import { userStore } from '@/stores/userStore'

// 登录
const loginResult = await userStore.login(username, password)

// 获取用户信息
const userInfo = userStore.getUserInfo()

// 检查登录状态
const isLoggedIn = userStore.checkLoginStatus()
```

### 路由管理

#### 路由配置
```typescript
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: { requiresAuth: true } // 需要认证
  }
]
```

#### 路由守卫
```typescript
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !userStore.checkLoginStatus()) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
```

### 错误处理

#### 全局错误处理
```typescript
// 全局错误处理器
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误:', err)
  // 显示用户友好的错误消息
}
```

#### API错误处理
```typescript
try {
  const response = await api.getData()
  // 处理成功响应
} catch (error) {
  if (error.response?.status === 401) {
    // 未授权，跳转登录
    router.push('/login')
  } else {
    // 其他错误处理
    showErrorMessage(error.message)
  }
}
```

## 🚀 部署说明

### 生产环境配置

#### 环境变量
```env
NODE_ENV=production
PORT=3001
DB_HOST=production-db-host
DB_PASSWORD=production-db-password
JWT_SECRET=production-jwt-secret
REDIS_URL=production-redis-url
```

#### 前端构建
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

#### 后端部署
```bash
# 使用PM2管理进程
npm install -g pm2

# 启动应用
pm2 start server/app.js --name "leju-server"

# 查看状态
pm2 status

# 重启应用
pm2 restart leju-server
```

### Docker部署

#### Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["npm", "run", "server"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DB_HOST=mysql
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mysql
      - redis
  
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: leju_db
    volumes:
      - mysql_data:/var/lib/mysql
  
  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data

volumes:
  mysql_data:
  redis_data:
```

### Nginx配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 前端静态文件
    location / {
        root /var/www/leju/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # 后端API代理
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🧪 测试

### 测试策略

#### 单元测试
- 使用Vitest进行单元测试
- 测试覆盖率目标80%以上
- 重点测试业务逻辑和工具函数

#### 集成测试
- API接口测试
- 数据库操作测试
- 认证流程测试

#### E2E测试
- 用户完整购物流程
- 支付流程测试
- 响应式布局测试

### 测试命令

```bash
# 运行所有测试
npm test

# 运行单元测试
npm run test:unit

# 运行E2E测试
npm run test:e2e

# 生成测试覆盖率报告
npm run test:coverage
```

### 测试示例

#### 组件测试
```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HomePage from '@/components/HomePage.vue'

describe('HomePage', () => {
  it('renders product list correctly', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.find('.product-grid').exists()).toBe(true)
  })
})
```

#### API测试
```typescript
import { describe, it, expect } from 'vitest'
import { authApi } from '@/services/api'

describe('Auth API', () => {
  it('should login successfully with valid credentials', async () => {
    const result = await authApi.login({
      username: 'testuser',
      password: 'testpass'
    })
    expect(result.success).toBe(true)
  })
})
```

## ⚡ 性能优化

### 前端优化

#### 代码分割
- 路由级别的代码分割
- 组件懒加载
- 第三方库按需引入

#### 资源优化
- 图片懒加载和压缩
- CSS和JavaScript压缩
- 静态资源CDN加速

#### 缓存策略
- 浏览器缓存优化
- Service Worker缓存
- 本地存储优化

### 后端优化

#### 数据库优化
- 索引优化
- 查询语句优化
- 连接池管理

#### 缓存策略
- Redis热点数据缓存
- 数据库查询结果缓存
- 静态资源缓存

#### 负载均衡
- 集群部署
- 负载分发
- 健康检查

### 监控指标

#### 性能指标
- 页面加载时间
- API响应时间
- 数据库查询时间

#### 业务指标
- 用户活跃度
- 订单转化率
- 支付成功率

## ❓ 常见问题

### 开发环境问题

#### Q: 前端热重载不工作？
A: 检查Vite配置和端口设置，确保没有端口冲突。

#### Q: 后端数据库连接失败？
A: 检查MySQL服务状态、数据库配置和网络连接。

#### Q: Redis连接失败？
A: 确保Redis服务正在运行，检查连接URL和端口。

### 生产环境问题

#### Q: 静态资源加载失败？
A: 检查Nginx配置和文件路径，确保权限设置正确。

#### Q: API请求超时？
A: 检查服务器负载、数据库性能和网络延迟。

#### Q: 内存使用过高？
A: 检查内存泄漏、优化数据库查询、调整Node.js内存限制。

### 性能问题

#### Q: 页面加载缓慢？
A: 启用代码分割、优化图片、使用CDN加速。

#### Q: 数据库查询慢？
A: 添加数据库索引、优化查询语句、使用缓存。

## 🤝 贡献指南

### 贡献方式

#### 提交Issue
- 报告Bug
- 提出新功能建议
- 改进建议

#### 提交PR
- Fork项目
- 创建功能分支
- 提交代码变更
- 创建Pull Request

### 开发流程

1. **Fork项目**: 在GitHub上Fork项目到自己的账户
2. **克隆项目**: 克隆Fork的项目到本地
3. **创建分支**: 创建功能分支进行开发
4. **开发功能**: 实现新功能或修复Bug
5. **测试验证**: 确保代码通过所有测试
6. **提交代码**: 提交代码并推送到远程分支
7. **创建PR**: 在GitHub上创建Pull Request
8. **代码审查**: 等待维护者审查和合并

### 代码规范

- 遵循项目的代码风格
- 添加必要的注释和文档
- 确保代码通过所有测试
- 提交信息清晰明了

### 联系方式

- **项目维护者**: [维护者姓名]
- **邮箱**: [邮箱地址]
- **GitHub**: [GitHub地址]

## 📄 许可证

本项目采用 [MIT License](LICENSE) 许可证。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户。

---

**乐居商城** - 让电商开发更简单 🚀

*最后更新时间: 2024年12月*
