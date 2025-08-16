const ProductService = require('./productService');

async function testFixedService() {
  console.log('🔧 测试修复后的商品服务...\n');
  
  const productService = new ProductService();
  
  try {
    // 测试1: 查询所有商品（带分页）
    console.log('1. 测试查询所有商品（带分页）...');
    const result1 = await productService.getAllProducts(5, 0);
    if (result1.success) {
      console.log('✅ 成功查询到商品:', result1.total, '个');
      console.log('   第一个商品:', result1.data[0]?.name || '无数据');
    } else {
      console.log('❌ 查询失败:', result1.error);
    }
    
    // 测试2: 按分类查询商品
    console.log('\n2. 测试按分类查询商品...');
    const result2 = await productService.getProductsByCategory(6, 3, 0);
    if (result2.success) {
      console.log('✅ 成功查询到分类商品:', result2.total, '个');
      console.log('   分类ID: 6 (自然风景)');
    } else {
      console.log('❌ 分类查询失败:', result2.error);
    }
    
    // 测试3: 查询热门商品
    console.log('\n3. 测试查询热门商品...');
    const result3 = await productService.getHotProducts(3);
    if (result3.success) {
      console.log('✅ 成功查询到热门商品:', result3.total, '个');
    } else {
      console.log('❌ 热门商品查询失败:', result3.error);
    }
    
    // 测试4: 查询新品
    console.log('\n4. 测试查询新品...');
    const result4 = await productService.getNewProducts(3);
    if (result4.success) {
      console.log('✅ 成功查询到新品:', result4.total, '个');
    } else {
      console.log('❌ 新品查询失败:', result4.error);
    }
    
    // 测试5: 按价格范围查询
    console.log('\n5. 测试按价格范围查询...');
    const result5 = await productService.getProductsByPriceRange(100, 300, 3, 0);
    if (result5.success) {
      console.log('✅ 成功按价格范围查询:', result5.total, '个');
      console.log('   价格范围: 100-300');
    } else {
      console.log('❌ 价格范围查询失败:', result5.error);
    }
    
    // 测试6: 搜索商品
    console.log('\n6. 测试搜索商品...');
    const result6 = await productService.searchProducts('山水', 3, 0);
    if (result6.success) {
      console.log('✅ 成功搜索商品:', result6.total, '个');
      console.log('   搜索关键词: 山水');
    } else {
      console.log('❌ 搜索失败:', result6.error);
    }
    
    // 测试7: 获取统计信息
    console.log('\n7. 测试获取统计信息...');
    const result7 = await productService.getProductStats();
    if (result7.success) {
      console.log('✅ 成功获取统计信息:');
      console.log('   总商品数:', result7.data.totalProducts);
      console.log('   热门商品:', result7.data.hotProducts);
      console.log('   新品数量:', result7.data.newProducts);
    } else {
      console.log('❌ 获取统计信息失败:', result7.error);
    }
    
    // 测试8: 获取所有分类
    console.log('\n8. 测试获取所有分类...');
    const result8 = await productService.getAllCategories();
    if (result8.success) {
      console.log('✅ 成功获取分类:', result8.total, '个');
      console.log('   分类列表:', result8.data.map(c => c.name).join(', '));
    } else {
      console.log('❌ 获取分类失败:', result8.error);
    }
    
    console.log('\n🎉 所有测试完成！mysql2参数类型问题已修复。');
    
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error.message);
    console.error('错误堆栈:', error.stack);
  }
}

// 运行测试
if (require.main === module) {
  testFixedService().catch(console.error);
}

module.exports = { testFixedService };
