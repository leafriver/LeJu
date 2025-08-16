const mysql = require('mysql2/promise');

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '2021615',
  database: process.env.DB_NAME || 'leju_simple',
  charset: 'utf8mb4'
};

// 创建数据库连接池
const pool = mysql.createPool(dbConfig);

// 辅助函数：安全地转换SQL参数
function safeParam(value) {
  if (value === null || value === undefined) {
    return null;
  }
  // 对于数字类型，转换为字符串（MySQL预处理语句的要求）
  if (typeof value === 'number') {
    return String(value);
  }
  // 对于字符串，直接返回
  if (typeof value === 'string') {
    return value;
  }
  // 对于其他类型，转换为字符串
  return String(value);
}

// 商品服务类
class ProductService {
  
  // 查询所有商品
  async getAllProducts(limit = 100, offset = 0) {
    try {
      const connection = await pool.getConnection();
      
      const [rows] = await connection.execute(`
        SELECT 
          p.id,
          p.name,
          p.description,
          p.price,
          p.stock,
          p.main_image,
          p.is_hot,
          p.is_new,
          p.created_at,
          c.name as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.is_deleted = 0
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?
      `, [safeParam(limit), safeParam(offset)]);
      
      connection.release();
      return { success: true, data: rows, total: rows.length };
    } catch (error) {
      console.error('查询所有商品失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 按分类查询商品
  async getProductsByCategory(categoryId, limit = 50, offset = 0) {
    try {
      const connection = await pool.getConnection();
      
      const [rows] = await connection.execute(`
        SELECT 
          p.id,
          p.name,
          p.description,
          p.price,
          p.stock,
          p.main_image,
          p.is_hot,
          p.is_new,
          p.created_at,
          c.name as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.category_id = ? AND p.is_deleted = 0
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?
      `, [safeParam(categoryId), safeParam(limit), safeParam(offset)]);
      
      connection.release();
      return { success: true, data: rows, total: rows.length };
    } catch (error) {
      console.error('按分类查询商品失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 查询热门商品
  async getHotProducts(limit = 20) {
    try {
      const connection = await pool.getConnection();
      
      const [rows] = await connection.execute(`
        SELECT 
          p.id,
          p.name,
          p.description,
          p.price,
          p.stock,
          p.main_image,
          p.is_hot,
          p.is_new,
          p.created_at,
          c.name as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.is_hot = 1 AND p.is_deleted = 0
        ORDER BY p.created_at DESC
        LIMIT ?
      `, [safeParam(limit)]);
      
      connection.release();
      return { success: true, data: rows, total: rows.length };
    } catch (error) {
      console.error('查询热门商品失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 查询新品
  async getNewProducts(limit = 20) {
    try {
      const connection = await pool.getConnection();
      
      const [rows] = await connection.execute(`
        SELECT 
          p.id,
          p.name,
          p.description,
          p.price,
          p.stock,
          p.main_image,
          p.is_hot,
          p.is_new,
          p.created_at,
          c.name as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.is_new = 1 AND p.is_deleted = 0
        ORDER BY p.created_at DESC
        LIMIT ?
      `, [safeParam(limit)]);
      
      connection.release();
      return { success: true, data: rows, total: rows.length };
    } catch (error) {
      console.error('查询新品失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 按价格范围查询商品
  async getProductsByPriceRange(minPrice, maxPrice, limit = 50, offset = 0) {
    try {
      const connection = await pool.getConnection();
      
      const [rows] = await connection.execute(`
        SELECT 
          p.id,
          p.name,
          p.description,
          p.price,
          p.stock,
          p.main_image,
          p.is_hot,
          p.is_new,
          p.created_at,
          c.name as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.price BETWEEN ? AND ? AND p.is_deleted = 0
        ORDER BY p.price ASC
        LIMIT ? OFFSET ?
      `, [safeParam(minPrice), safeParam(maxPrice), safeParam(limit), safeParam(offset)]);
      
      connection.release();
      return { success: true, data: rows, total: rows.length };
    } catch (error) {
      console.error('按价格范围查询商品失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 搜索商品
  async searchProducts(keyword, limit = 50, offset = 0) {
    try {
      const connection = await pool.getConnection();
      
      const [rows] = await connection.execute(`
        SELECT 
          p.id,
          p.name,
          p.description,
          p.price,
          p.stock,
          p.main_image,
          p.is_hot,
          p.is_new,
          p.created_at,
          c.name as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE (p.name LIKE ? OR p.description LIKE ?) AND p.is_deleted = 0
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?
      `, [`%${keyword}%`, `%${keyword}%`, safeParam(limit), safeParam(offset)]);
      
      connection.release();
      return { success: true, data: rows, total: rows.length };
    } catch (error) {
      console.error('搜索商品失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 获取商品统计信息
  async getProductStats() {
    try {
      const connection = await pool.getConnection();
      
      const [totalProducts] = await connection.execute(`
        SELECT COUNT(*) as total FROM products WHERE is_deleted = 0
      `);
      
      const [categoryStats] = await connection.execute(`
        SELECT 
          c.name as category_name,
          COUNT(p.id) as product_count
        FROM categories c
        LEFT JOIN products p ON c.id = p.category_id AND p.is_deleted = 0
        WHERE c.is_deleted = 0
        GROUP BY c.id, c.name
        ORDER BY c.sort_order
      `);
      
      const [hotProducts] = await connection.execute(`
        SELECT COUNT(*) as count FROM products WHERE is_hot = 1 AND is_deleted = 0
      `);
      
      const [newProducts] = await connection.execute(`
        SELECT COUNT(*) as count FROM products WHERE is_new = 1 AND is_deleted = 0
      `);
      
      connection.release();
      
      return {
        success: true,
        data: {
          totalProducts: totalProducts[0].total,
          categoryStats,
          hotProducts: hotProducts[0].count,
          newProducts: newProducts[0].count
        }
      };
    } catch (error) {
      console.error('获取商品统计信息失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 获取单个商品详情
  async getProductById(productId) {
    try {
      const connection = await pool.getConnection();
      
      const [rows] = await connection.execute(`
        SELECT 
          p.id,
          p.name,
          p.description,
          p.price,
          p.stock,
          p.main_image,
          p.is_hot,
          p.is_new,
          p.created_at,
          c.name as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id = ? AND p.is_deleted = 0
      `, [safeParam(productId)]);
      
      connection.release();
      
      if (rows.length === 0) {
        return { success: false, error: '商品不存在' };
      }
      
      return { success: true, data: rows[0] };
    } catch (error) {
      console.error('获取单个商品失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 获取所有分类
  async getAllCategories() {
    try {
      const connection = await pool.getConnection();
      
      const [rows] = await connection.execute(`
        SELECT 
          id,
          name,
          parent_id,
          sort_order,
          status
        FROM categories
        WHERE status = 1 AND is_deleted = 0
        ORDER BY sort_order ASC, id ASC
      `);
      
      connection.release();
      return { success: true, data: rows };
    } catch (error) {
      console.error('获取所有分类失败:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = ProductService;
