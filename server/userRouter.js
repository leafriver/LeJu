const express = require('express');
const { body, validationResult } = require('express-validator');
const userService = require('./userService');
const { authenticateToken, requireAdmin } = require('./authMiddleware');

const router = express.Router();

// 验证结果处理中间件
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: '输入数据验证失败',
      errors: errors.array()
    });
  }
  next();
};

// 用户注册
router.post('/register', [
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('用户名长度必须在3-20个字符之间')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('用户名只能包含字母、数字和下划线'),
  body('password')
    .isLength({ min: 6, max: 50 })
    .withMessage('密码长度必须在6-50个字符之间'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('邮箱格式不正确'),
  body('phone')
    .optional()
    .matches(/^1[3-9]\d{9}$/)
    .withMessage('手机号格式不正确')
], handleValidationErrors, async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;

    // 调用用户服务进行注册
    const user = await userService.register({
      username,
      password,
      email,
      phone
    });

    res.status(201).json({
      success: true,
      message: '用户注册成功',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// 用户登录
router.post('/login', [
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空'),
  body('password')
    .notEmpty()
    .withMessage('密码不能为空')
], handleValidationErrors, async (req, res) => {
  try {
    const { username, password } = req.body;

    // 调用用户服务进行登录
    const result = await userService.login({ username, password });

    res.json({
      success: true,
      message: '登录成功',
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
});

// 获取当前用户信息（需要登录）
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.getUserById(userId);

    res.json({
      success: true,
      message: '获取用户信息成功',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// 更新用户信息（需要登录）
router.put('/profile', [
  authenticateToken,
  body('email')
    .optional()
    .isEmail()
    .withMessage('邮箱格式不正确'),
  body('phone')
    .optional()
    .matches(/^1[3-9]\d{9}$/)
    .withMessage('手机号格式不正确')
], handleValidationErrors, async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    const result = await userService.updateUser(userId, updateData);

    res.json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// 修改密码（需要登录）
router.put('/change-password', [
  authenticateToken,
  body('oldPassword')
    .notEmpty()
    .withMessage('原密码不能为空'),
  body('newPassword')
    .isLength({ min: 6, max: 50 })
    .withMessage('新密码长度必须在6-50个字符之间')
], handleValidationErrors, async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const result = await userService.changePassword(userId, oldPassword, newPassword);

    res.json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// 获取所有用户（仅管理员）
router.get('/users', [authenticateToken, requireAdmin], async (req, res) => {
  try {
    // 这里可以添加分页和搜索功能
    // 暂时返回简单的用户列表
    res.json({
      success: true,
      message: '获取用户列表成功',
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// 删除用户（仅管理员）
router.delete('/users/:userId', [authenticateToken, requireAdmin], async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await userService.deleteUser(userId);

    res.json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// 验证token有效性
router.post('/verify-token', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token不能为空'
      });
    }

    const decoded = await userService.verifyToken(token);
    
    res.json({
      success: true,
      message: 'Token有效',
      data: decoded
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token无效'
    });
  }
});

module.exports = router;
