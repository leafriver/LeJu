# 乐居商城商品API接口文档

## 概述

这是一套完整的商品查询API接口，用于查询乐居商城中的所有商品数据。接口基于MySQL数据库，支持多种查询方式和分页功能。

## 接口列表

### 1. 健康检查
- **接口**: `GET /api/health`
- **描述**: 检查服务是否正常运行
- **响应示例**:
```json
{
  "success": true,
  "message": "商品服务运行正常",
  "timestamp": "2025-01-13T10:00:00.000Z"
}
```

### 2. 获取所有商品
- **接口**: `GET /api/products`
- **参数**:
  - `limit` (可选): 每页数量，默认100
  - `offset` (可选): 偏移量，默认0
- **响应示例**:
```json
{
  "success": true,
  "message": "查询成功",
  "data": [
    {
      "id": 4,
      "name": "山水画卷",
      "description": "精美的自然山水风景画，展现大自然的壮丽与宁静",
      "price": "299.00",
      "stock": 50,
      "main_image": "https://images.unsplash.com/...",
      "is_hot": 1,
      "is_new": 1,
      "created_at": "2025-08-13T09:57:24.000Z",
      "category_name": "自然风景"
    }
  ],
  "total": 1,
  "pagination": {
    "limit": 100,
    "offset": 0
  }
}
```

### 3. 按分类查询商品
- **接口**: `GET /api/products/category/:categoryId`
- **参数**:
  - `categoryId`: 分类ID
  - `limit` (可选): 每页数量，默认50
  - `offset` (可选): 偏移量，默认0
- **响应示例**: 同上，但会包含categoryId信息

### 4. 获取热门商品
- **接口**: `GET /api/products/hot`
- **参数**:
  - `limit` (可选): 返回数量，默认20
- **响应示例**: 同上，但只返回热门商品

### 5. 获取新品
- **接口**: `GET /api/products/new`
- **参数**:
  - `limit` (可选): 返回数量，默认20
- **响应示例**: 同上，但只返回新品

### 6. 按价格范围查询商品
- **接口**: `GET /api/products/price-range`
- **参数**:
  - `minPrice`: 最小价格
  - `maxPrice`: 最大价格
  - `limit` (可选): 每页数量，默认50
  - `offset` (可选): 偏移量，默认0
- **响应示例**: 同上，但会包含价格范围信息

### 7. 搜索商品
- **接口**: `GET /api/products/search`
- **参数**:
  - `keyword`: 搜索关键词
  - `limit` (可选): 每页数量，默认50
  - `offset` (可选): 偏移量，默认0
- **响应示例**: 同上，但会包含搜索关键词信息

### 8. 获取商品统计信息
- **接口**: `GET /api/products/stats`
- **响应示例**:
```json
{
  "success": true,
  "message": "获取统计信息成功",
  "data": {
    "totalProducts": 95,
    "categoryStats": [
      {
        "category_name": "自然风景",
        "product_count": 20
      }
    ],
    "hotProducts": 15,
    "newProducts": 20
  }
}
```

### 9. 获取所有分类
- **接口**: `GET /api/categories`
- **响应示例**:
```json
{
  "success": true,
  "message": "获取分类成功",
  "data": [
    {
      "id": 6,
      "name": "自然风景",
      "parent_id": 0,
      "sort_order": 1,
      "status": 1
    }
  ],
  "total": 1
}
```

## 分类ID对照表

根据数据库结构，分类ID对应关系如下：

| ID | 分类名称 | 商品数量 |
|----|----------|----------|
| 6  | 自然风景 | 20       |
| 7  | 城市建筑 | 15       |
| 8  | 人物肖像 | 15       |
| 9  | 科技数码 | 10       |
| 10 | 美食佳肴 | 10       |
| 11 | 艺术抽象 | 10       |
| 12 | 交通工具 | 10       |

## 使用示例

### 获取前10个商品
```bash
curl "http://localhost:3001/api/products?limit=10&offset=0"
```

### 获取自然风景分类的商品
```bash
curl "http://localhost:3001/api/products/category/6?limit=5"
```

### 获取价格在100-500之间的商品
```bash
curl "http://localhost:3001/api/products/price-range?minPrice=100&maxPrice=500&limit=10"
```

### 搜索包含"山水"的商品
```bash
curl "http://localhost:3001/api/products/search?keyword=山水&limit=5"
```

## 测试接口

项目包含一个测试脚本 `test_api.js`，可以用来测试所有接口：

```bash
# 测试所有接口
node test_api.js

# 测试特定接口
node test_api.js /products limit 5

# 测试分类查询
node test_api.js /products/category/6 limit 3
```

## 环境配置

确保以下环境变量已正确设置：

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=2021615
DB_NAME=leju_simple
```

## 安装依赖

```bash
npm install
```

## 启动服务

```bash
npm run server
```

服务将在 http://localhost:3001 启动，API接口前缀为 `/api`。

## 注意事项

1. 所有接口都支持CORS跨域请求
2. 分页参数 `limit` 和 `offset` 在所有列表接口中都可用
3. 价格查询支持小数
4. 搜索功能支持商品名称和描述的模糊匹配
5. 所有商品数据都包含分类名称信息
6. 接口返回的数据按创建时间倒序排列（新品优先）
