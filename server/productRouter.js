const express = require('express');
const ProductService = require('./productService');

const router = express.Router();
const productService = new ProductService();

// 获取所有商品
router.get('/products', async (req, res) => {
  try {
    const { limit = 100, offset = 0 } = req.query;
    const result = await productService.getAllProducts(parseInt(limit), parseInt(offset));
    
    if (result.success) {
      res.json({
        success: true,
        message: '查询成功',
        data: result.data,
        total: result.total,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: '查询失败',
        error: result.error
      });
    }
  } catch (error) {
    console.error('获取所有商品接口错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message
    });
  }
});

// 按分类查询商品
router.get('/products/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { limit = 50, offset = 0 } = req.query;
    
    const result = await productService.getProductsByCategory(
      parseInt(categoryId), 
      parseInt(limit), 
      parseInt(offset)
    );
    
    if (result.success) {
      res.json({
        success: true,
        message: '查询成功',
        data: result.data,
        total: result.total,
        categoryId: parseInt(categoryId),
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: '查询失败',
        error: result.error
      });
    }
  } catch (error) {
    console.error('按分类查询商品接口错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message
    });
  }
});

// 获取热门商品
router.get('/products/hot', async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const result = await productService.getHotProducts(parseInt(limit));
    
    if (result.success) {
      res.json({
        success: true,
        message: '查询成功',
        data: result.data,
        total: result.total
      });
    } else {
      res.status(500).json({
        success: false,
        message: '查询失败',
        error: result.error
      });
    }
  } catch (error) {
    console.error('获取热门商品接口错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message
    });
  }
});

// 获取新品
router.get('/products/new', async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const result = await productService.getNewProducts(parseInt(limit));
    
    if (result.success) {
      res.json({
        success: true,
        message: '查询成功',
        data: result.data,
        total: result.total
      });
    } else {
      res.status(500).json({
        success: false,
        message: '查询失败',
        error: result.error
      });
    }
  } catch (error) {
    console.error('获取新品接口错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message
    });
  }
});

// 按价格范围查询商品
router.get('/products/price-range', async (req, res) => {
  try {
    const { minPrice, maxPrice, limit = 50, offset = 0 } = req.query;
    
    if (!minPrice || !maxPrice) {
      return res.status(400).json({
        success: false,
        message: '请提供最小价格和最大价格'
      });
    }
    
    const result = await productService.getProductsByPriceRange(
      parseFloat(minPrice),
      parseFloat(maxPrice),
      parseInt(limit),
      parseInt(offset)
    );
    
    if (result.success) {
      res.json({
        success: true,
        message: '查询成功',
        data: result.data,
        total: result.total,
        priceRange: {
          minPrice: parseFloat(minPrice),
          maxPrice: parseFloat(maxPrice)
        },
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: '查询失败',
        error: result.error
      });
    }
  } catch (error) {
    console.error('按价格范围查询商品接口错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message
    });
  }
});

// 搜索商品
router.get('/products/search', async (req, res) => {
  try {
    const { keyword, limit = 50, offset = 0 } = req.query;
    
    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: '请提供搜索关键词'
      });
    }
    
    const result = await productService.searchProducts(
      keyword,
      parseInt(limit),
      parseInt(offset)
    );
    
    if (result.success) {
      res.json({
        success: true,
        message: '搜索成功',
        data: result.data,
        total: result.total,
        keyword,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: '搜索失败',
        error: result.error
      });
    }
  } catch (error) {
    console.error('搜索商品接口错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message
    });
  }
});

// 获取商品统计信息
router.get('/products/stats', async (req, res) => {
  try {
    const result = await productService.getProductStats();
    
    if (result.success) {
      res.json({
        success: true,
        message: '获取统计信息成功',
        data: result.data
      });
    } else {
      res.status(500).json({
        success: false,
        message: '获取统计信息失败',
        error: result.error
      });
    }
  } catch (error) {
    console.error('获取商品统计信息接口错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message
    });
  }
});

// 获取单个商品详情
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getProductById(parseInt(id));
    
    if (result.success) {
      res.json({
        success: true,
        message: '查询成功',
        data: result.data
      });
    } else {
      res.status(404).json({
        success: false,
        message: '商品不存在',
        error: result.error
      });
    }
  } catch (error) {
    console.error('获取单个商品接口错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message
    });
  }
});

// 获取所有分类
router.get('/categories', async (req, res) => {
  try {
    const result = await productService.getAllCategories();
    
    if (result.success) {
      res.json({
        success: true,
        message: '查询成功',
        data: result.data
      });
    } else {
      res.status(500).json({
        success: false,
        message: '查询失败',
        error: result.error
      });
    }
  } catch (error) {
    console.error('获取所有分类接口错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message
    });
  }
});

// 健康检查接口
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: '商品服务运行正常',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
