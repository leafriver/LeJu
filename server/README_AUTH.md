# 乐居商城用户认证API文档

## 概述

本系统提供了完整的用户认证功能，包括用户注册、登录、JWT token验证、用户信息管理等。

## 功能特性

- ✅ 用户注册与登录
- ✅ JWT token认证
- ✅ 密码加密存储（bcrypt）
- ✅ 输入数据验证
- ✅ 用户信息管理
- ✅ 权限控制（普通用户/管理员）
- ✅ 软删除支持

## API接口

### 基础信息
- 基础URL: `http://localhost:3001/api/auth`
- 认证方式: Bearer Token
- 数据格式: JSON

### 1. 用户注册

**接口**: `POST /auth/register`

**请求体**:
```json
{
  "username": "testuser",
  "password": "123456",
  "email": "test@example.com",
  "phone": "13800138000"
}
```

**响应**:
```json
{
  "success": true,
  "message": "用户注册成功",
  "data": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "phone": "13800138000",
    "role": 0,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**验证规则**:
- 用户名: 3-20字符，只能包含字母、数字、下划线
- 密码: 6-50字符
- 邮箱: 可选，必须是有效邮箱格式
- 手机号: 可选，必须是有效手机号格式

### 2. 用户登录

**接口**: `POST /auth/login`

**请求体**:
```json
{
  "username": "testuser",
  "password": "123456"
}
```

**响应**:
```json
{
  "success": true,
  "message": "登录成功",
  "data": {
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com",
      "phone": "13800138000",
      "role": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. 获取用户信息

**接口**: `GET /auth/profile`

**请求头**:
```
Authorization: Bearer <token>
```

**响应**:
```json
{
  "success": true,
  "message": "获取用户信息成功",
  "data": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "phone": "13800138000",
    "role": 0,
    "created_at": "2024-01-01T00:00:00.000Z",
    "last_login_at": "2024-01-01T12:00:00.000Z"
  }
}
```

### 4. 更新用户信息

**接口**: `PUT /auth/profile`

**请求头**:
```
Authorization: Bearer <token>
```

**请求体**:
```json
{
  "email": "newemail@example.com",
  "phone": "13900139000"
}
```

**响应**:
```json
{
  "success": true,
  "message": "用户信息更新成功",
  "data": {
    "success": true,
    "message": "用户信息更新成功"
  }
}
```

### 5. 修改密码

**接口**: `PUT /auth/change-password`

**请求头**:
```
Authorization: Bearer <token>
```

**请求体**:
```json
{
  "oldPassword": "123456",
  "newPassword": "654321"
}
```

**响应**:
```json
{
  "success": true,
  "message": "密码修改成功",
  "data": {
    "success": true,
    "message": "密码修改成功"
  }
}
```

### 6. 验证Token

**接口**: `POST /auth/verify-token`

**请求体**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**响应**:
```json
{
  "success": true,
  "message": "Token有效",
  "data": {
    "id": 1,
    "username": "testuser",
    "role": 0,
    "iat": 1704067200,
    "exp": 1704672000
  }
}
```

## 权限控制

### 中间件

1. **authenticateToken**: 验证JWT token，保护需要登录的接口
2. **requireAdmin**: 验证管理员权限，保护管理员专用接口
3. **optionalAuth**: 可选认证，不强制要求登录

### 用户角色

- `role: 0`: 普通用户
- `role: 1`: 管理员

## 安全特性

- 密码使用bcrypt加密存储
- JWT token有过期时间
- 输入数据严格验证
- SQL注入防护
- 软删除支持

## 环境配置

复制 `env.example` 为 `.env` 并配置以下环境变量：

```bash
# 数据库配置
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=leju_simple

# JWT配置
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Redis配置
REDIS_URL=redis://127.0.0.1:6379
```

## 测试

运行测试脚本：

```bash
npm run test-auth
```

测试内容包括：
- 用户注册
- 用户登录
- 获取用户信息
- 更新用户信息
- 修改密码
- Token验证
- 无效Token处理

## 前端集成

前端已经集成了完整的用户认证功能：

1. **用户状态管理**: `src/stores/userStore.ts`
2. **API服务**: `src/services/api.ts`
3. **登录页面**: `src/components/LoginPage.vue`
4. **注册页面**: `src/components/RegisterPage.vue`

### 使用示例

```typescript
import userStore from '../stores/userStore';

// 用户登录
const result = await userStore.login(username, password);
if (result.success) {
  // 登录成功
  router.push('/');
}

// 用户注册
const result = await userStore.register({
  username: 'testuser',
  password: '123456',
  email: 'test@example.com'
});

// 获取用户信息
const userInfo = userStore.getUserInfo();

// 检查登录状态
const isLoggedIn = userStore.checkLoginStatus();
```

## 注意事项

1. 确保数据库已创建并运行
2. 配置正确的环境变量
3. 前端API地址配置正确
4. JWT密钥在生产环境中应该使用强随机字符串
5. 定期更换JWT密钥
6. 监控登录失败次数，防止暴力破解

## 错误处理

所有API都返回统一的错误格式：

```json
{
  "success": false,
  "message": "错误描述信息"
}
```

常见HTTP状态码：
- `200`: 成功
- `201`: 创建成功
- `400`: 请求参数错误
- `401`: 未认证
- `403`: 权限不足
- `500`: 服务器内部错误
