const mysql = require('mysql2/promise');

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '2021615',
  database: process.env.DB_NAME || 'leju_simple',
  charset: 'utf8mb4'
};

async function testConnection() {
  try {
    console.log('正在测试数据库连接...');
    console.log('连接配置:', { ...dbConfig, password: '***' });
    
    const connection = await mysql.createConnection(dbConfig);
    console.log('数据库连接成功！');
    
    // 测试查询
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM products');
    console.log('商品总数:', rows[0].count);
    
    const [categories] = await connection.execute('SELECT COUNT(*) as count FROM categories');
    console.log('分类总数:', categories[0].count);
    
    await connection.end();
    console.log('数据库连接已关闭');
    
  } catch (error) {
    console.error('数据库连接失败:', error.message);
    console.error('请检查：');
    console.error('1. MySQL服务是否正在运行');
    console.error('2. 数据库连接配置是否正确');
    console.error('3. 数据库和表是否存在');
  }
}

testConnection();
