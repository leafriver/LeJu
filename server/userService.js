const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '2021615',
  database: process.env.DB_NAME || 'leju_simple',
  charset: 'utf8mb4'
};

// JWT密钥
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// 登录失败限制配置
const LOGIN_ATTEMPTS_CONFIG = {
  MAX_ATTEMPTS: 5,           // 最大失败次数
  LOCKOUT_DURATION: 15 * 60 * 1000,  // 锁定时间（15分钟）
  RESET_AFTER_SUCCESS: true  // 登录成功后重置失败次数
};

class UserService {
  constructor() {
    this.pool = mysql.createPool(dbConfig);
  }

  // 创建数据库连接
  async getConnection() {
    return await this.pool.getConnection();
  }

  // 密码强度验证
  validatePasswordStrength(password) {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('密码长度至少为8位');
    }
    
    if (password.length > 50) {
      errors.push('密码长度不能超过50位');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('密码必须包含至少一个大写字母');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('密码必须包含至少一个小写字母');
    }
    
    if (!/\d/.test(password)) {
      errors.push('密码必须包含至少一个数字');
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('密码必须包含至少一个特殊字符');
    }
    
    // 检查常见弱密码
    const weakPasswords = ['123456', 'password', 'qwerty', 'admin', '123456789'];
    if (weakPasswords.includes(password.toLowerCase())) {
      errors.push('密码过于简单，请选择更复杂的密码');
    }
    
    // 检查连续字符
    if (/(.)\1{2,}/.test(password)) {
      errors.push('密码不能包含连续重复的字符');
    }
    
    // 检查键盘序列
    const keyboardSequences = ['qwerty', 'asdfgh', 'zxcvbn', '123456789'];
    if (keyboardSequences.some(seq => password.toLowerCase().includes(seq))) {
      errors.push('密码不能包含键盘序列');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors,
      score: this.calculatePasswordScore(password)
    };
  }

  // 计算密码强度分数
  calculatePasswordScore(password) {
    let score = 0;
    
    // 基础分数
    score += Math.min(password.length * 2, 20);
    
    // 字符类型多样性
    if (/[A-Z]/.test(password)) score += 10;
    if (/[a-z]/.test(password)) score += 10;
    if (/\d/.test(password)) score += 10;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 15;
    
    // 额外加分
    if (password.length > 12) score += 5;
    if (password.length > 16) score += 5;
    
    // 减分项
    if (/(.)\1{2,}/.test(password)) score -= 10;
    if (/123|abc|qwe/i.test(password)) score -= 15;
    
    return Math.max(0, Math.min(score, 100));
  }

  // 检查登录失败次数和锁定状态
  async checkLoginAttempts(username) {
    try {
      const connection = await this.getConnection();
      
      // 查找用户的登录失败记录
      const [attempts] = await connection.execute(
        'SELECT failed_attempts, last_failed_attempt, is_locked, lockout_until FROM users WHERE (username = ? OR email = ?) AND is_deleted = 0',
        [username, username]
      );
      
      connection.release();
      
      if (attempts.length === 0) {
        return { canLogin: true, reason: null };
      }
      
      const user = attempts[0];
      
      // 检查是否被锁定
      if (user.is_locked && user.lockout_until) {
        const lockoutUntil = new Date(user.lockout_until);
        const now = new Date();
        
        if (now < lockoutUntil) {
          const remainingTime = Math.ceil((lockoutUntil - now) / 1000 / 60);
          return { 
            canLogin: false, 
            reason: `账户已被锁定，请${remainingTime}分钟后再试`,
            remainingTime: remainingTime
          };
        } else {
          // 锁定时间已过，重置锁定状态
          await this.resetLoginAttempts(user.id);
          return { canLogin: true, reason: null };
        }
      }
      
      // 检查失败次数
      if (user.failed_attempts >= LOGIN_ATTEMPTS_CONFIG.MAX_ATTEMPTS) {
        // 达到最大失败次数，锁定账户
        await this.lockAccount(user.id);
        return { 
          canLogin: false, 
          reason: `登录失败次数过多，账户已被锁定${LOGIN_ATTEMPTS_CONFIG.LOCKOUT_DURATION / 1000 / 60}分钟`
        };
      }
      
      return { canLogin: true, reason: null };
    } catch (error) {
      console.error('检查登录失败次数失败:', error);
      return { canLogin: true, reason: null }; // 出错时允许登录
    }
  }

  // 记录登录失败
  async recordLoginFailure(username) {
    try {
      const connection = await this.getConnection();
      
      // 查找用户
      const [users] = await connection.execute(
        'SELECT id, failed_attempts FROM users WHERE (username = ? OR email = ?) AND is_deleted = 0',
        [username, username]
      );
      
      if (users.length === 0) {
        connection.release();
        return;
      }
      
      const user = users[0];
      const newFailedAttempts = (user.failed_attempts || 0) + 1;
      
      // 更新失败次数和最后失败时间
      await connection.execute(
        'UPDATE users SET failed_attempts = ?, last_failed_attempt = CURRENT_TIMESTAMP WHERE id = ?',
        [newFailedAttempts, user.id]
      );
      
      connection.release();
    } catch (error) {
      console.error('记录登录失败失败:', error);
    }
  }

  // 锁定账户
  async lockAccount(userId) {
    try {
      const connection = await this.getConnection();
      
      const lockoutUntil = new Date(Date.now() + LOGIN_ATTEMPTS_CONFIG.LOCKOUT_DURATION);
      
      await connection.execute(
        'UPDATE users SET is_locked = 1, lockout_until = ? WHERE id = ?',
        [lockoutUntil, userId]
      );
      
      connection.release();
    } catch (error) {
      console.error('锁定账户失败:', error);
    }
  }

  // 重置登录失败次数
  async resetLoginAttempts(userId) {
    try {
      const connection = await this.getConnection();
      
      await connection.execute(
        'UPDATE users SET failed_attempts = 0, last_failed_attempt = NULL, is_locked = 0, lockout_until = NULL WHERE id = ?',
        [userId]
      );
      
      connection.release();
    } catch (error) {
      console.error('重置登录失败次数失败:', error);
    }
  }

  // 用户注册
  async register(userData) {
    const { username, password, email, phone } = userData;
    
    try {
      // 验证密码强度
      const passwordValidation = this.validatePasswordStrength(password);
      if (!passwordValidation.isValid) {
        throw new Error(`密码强度不足：${passwordValidation.errors.join('，')}`);
      }
      
      const connection = await this.getConnection();
      
      // 检查用户名是否已存在
      const [existingUsers] = await connection.execute(
        'SELECT id FROM users WHERE username = ? AND is_deleted = 0',
        [username]
      );
      
      if (existingUsers.length > 0) {
        connection.release();
        throw new Error('用户名已存在');
      }

      // 检查邮箱是否已存在
      if (email) {
        const [existingEmails] = await connection.execute(
          'SELECT id FROM users WHERE email = ? AND is_deleted = 0',
          [email]
        );
        
        if (existingEmails.length > 0) {
          connection.release();
          throw new Error('邮箱已被注册');
        }
      }

      // 加密密码
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // 插入新用户
      const [result] = await connection.execute(
        'INSERT INTO users (username, password, email, phone, role, failed_attempts, is_locked) VALUES (?, ?, ?, ?, 0, 0, 0)',
        [username, hashedPassword, email || null, phone || null]
      );

      connection.release();

      // 返回用户信息（不包含密码）
      return {
        id: result.insertId,
        username,
        email,
        phone,
        role: 0,
        created_at: new Date(),
        passwordStrength: passwordValidation.score
      };
    } catch (error) {
      throw error;
    }
  }

  // 用户登录
  async login(credentials) {
    const { username, password } = credentials;
    
    try {
      // 检查登录失败次数和锁定状态
      const loginCheck = await this.checkLoginAttempts(username);
      if (!loginCheck.canLogin) {
        throw new Error(loginCheck.reason);
      }
      
      const connection = await this.getConnection();
      
      // 查找用户
      const [users] = await connection.execute(
        'SELECT id, username, password, email, phone, role FROM users WHERE (username = ? OR email = ?) AND is_deleted = 0',
        [username, username]
      );
      
      if (users.length === 0) {
        connection.release();
        await this.recordLoginFailure(username);
        throw new Error('用户名或密码错误');
      }

      const user = users[0];

      // 验证密码
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        connection.release();
        await this.recordLoginFailure(username);
        throw new Error('用户名或密码错误');
      }

      // 登录成功，重置失败次数
      if (LOGIN_ATTEMPTS_CONFIG.RESET_AFTER_SUCCESS) {
        await this.resetLoginAttempts(user.id);
      }

      // 更新最后登录时间
      await connection.execute(
        'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?',
        [user.id]
      );

      connection.release();

      // 生成JWT token
      const token = jwt.sign(
        { 
          id: user.id, 
          username: user.username, 
          role: user.role 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // 返回用户信息和token
      return {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        token
      };
    } catch (error) {
      throw error;
    }
  }

  // 验证JWT token
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('无效的token');
    }
  }

  // 获取用户信息
  async getUserById(userId) {
    try {
      const connection = await this.getConnection();
      
      const [users] = await connection.execute(
        'SELECT id, username, email, phone, role, created_at, last_login_at FROM users WHERE id = ? AND is_deleted = 0',
        [userId]
      );
      
      connection.release();

      if (users.length === 0) {
        throw new Error('用户不存在');
      }

      return users[0];
    } catch (error) {
      throw error;
    }
  }

  // 更新用户信息
  async updateUser(userId, updateData) {
    try {
      const connection = await this.getConnection();
      
      const allowedFields = ['email', 'phone'];
      const updateFields = [];
      const updateValues = [];

      for (const [key, value] of Object.entries(updateData)) {
        if (allowedFields.includes(key) && value !== undefined) {
          updateFields.push(`${key} = ?`);
          updateValues.push(value);
        }
      }

      if (updateFields.length === 0) {
        connection.release();
        throw new Error('没有可更新的字段');
      }

      updateValues.push(userId);

      const [result] = await connection.execute(
        `UPDATE users SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND is_deleted = 0`,
        updateValues
      );

      connection.release();

      if (result.affectedRows === 0) {
        throw new Error('用户不存在或更新失败');
      }

      return { success: true, message: '用户信息更新成功' };
    } catch (error) {
      throw error;
    }
  }

  // 修改密码
  async changePassword(userId, oldPassword, newPassword) {
    try {
      const connection = await this.getConnection();
      
      // 获取当前密码
      const [users] = await connection.execute(
        'SELECT password FROM users WHERE id = ? AND is_deleted = 0',
        [userId]
      );
      
      if (users.length === 0) {
        connection.release();
        throw new Error('用户不存在');
      }

      // 验证旧密码
      const isOldPasswordValid = await bcrypt.compare(oldPassword, users[0].password);
      if (!isOldPasswordValid) {
        connection.release();
        throw new Error('原密码错误');
      }

      // 加密新密码
      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // 更新密码
      const [result] = await connection.execute(
        'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [hashedNewPassword, userId]
      );

      connection.release();

      if (result.affectedRows === 0) {
        throw new Error('密码更新失败');
      }

      return { success: true, message: '密码修改成功' };
    } catch (error) {
      throw error;
    }
  }

  // 删除用户（软删除）
  async deleteUser(userId) {
    try {
      const connection = await this.getConnection();
      
      const [result] = await connection.execute(
        'UPDATE users SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [userId]
      );

      connection.release();

      if (result.affectedRows === 0) {
        throw new Error('用户不存在或删除失败');
      }

      return { success: true, message: '用户删除成功' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
