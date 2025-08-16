const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

// 测试所有接口
async function testAllAPIs() {
  console.log('🚀 开始测试商品API接口...\n');
  
  try {
    // 1. 测试健康检查
    console.log('1. 测试健康检查接口...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ 健康检查:', healthResponse.data);
    
    // 2. 测试获取所有分类
    console.log('\n2. 测试获取所有分类接口...');
    const categoriesResponse = await axios.get(`${BASE_URL}/categories`);
    console.log('✅ 分类数据:', categoriesResponse.data);
    
    // 3. 测试获取所有商品
    console.log('\n3. 测试获取所有商品接口...');
    const productsResponse = await axios.get(`${BASE_URL}/products?limit=5`);
    console.log('✅ 商品数据 (前5条):', productsResponse.data);
    
    // 4. 测试获取热门商品
    console.log('\n4. 测试获取热门商品接口...');
    const hotProductsResponse = await axios.get(`${BASE_URL}/products/hot?limit=3`);
    console.log('✅ 热门商品:', hotProductsResponse.data);
    
    // 5. 测试获取新品
    console.log('\n5. 测试获取新品接口...');
    const newProductsResponse = await axios.get(`${BASE_URL}/products/new?limit=3`);
    console.log('✅ 新品:', newProductsResponse.data);
    
    // 6. 测试按分类查询商品
    console.log('\n6. 测试按分类查询商品接口...');
    const categoryProductsResponse = await axios.get(`${BASE_URL}/products/category/6?limit=3`);
    console.log('✅ 自然风景分类商品:', categoryProductsResponse.data);
    
    // 7. 测试按价格范围查询商品
    console.log('\n7. 测试按价格范围查询商品接口...');
    const priceRangeResponse = await axios.get(`${BASE_URL}/products/price-range?minPrice=100&maxPrice=300&limit=3`);
    console.log('✅ 价格范围查询 (100-300):', priceRangeResponse.data);
    
    // 8. 测试搜索商品
    console.log('\n8. 测试搜索商品接口...');
    const searchResponse = await axios.get(`${BASE_URL}/products/search?keyword=山水&limit=3`);
    console.log('✅ 搜索"山水":', searchResponse.data);
    
    // 9. 测试获取商品统计信息
    console.log('\n9. 测试获取商品统计信息接口...');
    const statsResponse = await axios.get(`${BASE_URL}/products/stats`);
    console.log('✅ 商品统计信息:', statsResponse.data);
    
    console.log('\n🎉 所有接口测试完成！');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
  }
}

// 测试特定接口
async function testSpecificAPI(endpoint, params = {}) {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${BASE_URL}${endpoint}?${queryString}` : `${BASE_URL}${endpoint}`;
    
    console.log(`🔍 测试接口: ${url}`);
    const response = await axios.get(url);
    console.log('✅ 响应数据:', response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ 接口 ${endpoint} 测试失败:`, error.message);
    if (error.response) {
      console.error('响应状态:', error.response.status);
      console.error('响应数据:', error.response.data);
    }
    return null;
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // 测试特定接口
    const endpoint = args[0];
    const params = {};
    
    // 解析参数
    for (let i = 1; i < args.length; i += 2) {
      if (args[i + 1]) {
        params[args[i]] = args[i + 1];
      }
    }
    
    await testSpecificAPI(endpoint, params);
  } else {
    // 测试所有接口
    await testAllAPIs();
  }
}

// 运行测试
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testAllAPIs, testSpecificAPI };
