const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001/api/auth';

// 测试用户数据
const testUser = {
  username: 'testuser',
  password: '123456',
  email: 'test@example.com',
  phone: '13800138000'
};

let authToken = '';

// 测试注册
async function testRegister() {
  try {
    console.log('🧪 测试用户注册...');
    const response = await axios.post(`${API_BASE_URL}/register`, testUser);
    
    if (response.data.success) {
      console.log('✅ 注册成功:', response.data.message);
      console.log('📝 用户信息:', response.data.data);
    } else {
      console.log('❌ 注册失败:', response.data.message);
    }
  } catch (error) {
    if (error.response) {
      console.log('❌ 注册失败:', error.response.data.message);
    } else {
      console.log('❌ 注册失败:', error.message);
    }
  }
}

// 测试登录
async function testLogin() {
  try {
    console.log('\n🧪 测试用户登录...');
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username: testUser.username,
      password: testUser.password
    });
    
    if (response.data.success) {
      console.log('✅ 登录成功:', response.data.message);
      authToken = response.data.data.token;
      console.log('🔑 Token:', authToken.substring(0, 20) + '...');
    } else {
      console.log('❌ 登录失败:', response.data.message);
    }
  } catch (error) {
    if (error.response) {
      console.log('❌ 登录失败:', error.response.data.message);
    } else {
      console.log('❌ 登录失败:', error.message);
    }
  }
}

// 测试获取用户信息
async function testGetProfile() {
  if (!authToken) {
    console.log('❌ 需要先登录获取token');
    return;
  }
  
  try {
    console.log('\n🧪 测试获取用户信息...');
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    if (response.data.success) {
      console.log('✅ 获取用户信息成功:', response.data.message);
      console.log('👤 用户信息:', response.data.data);
    } else {
      console.log('❌ 获取用户信息失败:', response.data.message);
    }
  } catch (error) {
    if (error.response) {
      console.log('❌ 获取用户信息失败:', error.response.data.message);
    } else {
      console.log('❌ 获取用户信息失败:', error.message);
    }
  }
}

// 测试更新用户信息
async function testUpdateProfile() {
  if (!authToken) {
    console.log('❌ 需要先登录获取token');
    return;
  }
  
  try {
    console.log('\n🧪 测试更新用户信息...');
    const updateData = {
      email: 'newemail@example.com',
      phone: '13900139000'
    };
    
    const response = await axios.put(`${API_BASE_URL}/profile`, updateData, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    if (response.data.success) {
      console.log('✅ 更新用户信息成功:', response.data.message);
    } else {
      console.log('❌ 更新用户信息失败:', response.data.message);
    }
  } catch (error) {
    if (error.response) {
      console.log('❌ 更新用户信息失败:', error.response.data.message);
    } else {
      console.log('❌ 更新用户信息失败:', error.message);
    }
  }
}

// 测试修改密码
async function testChangePassword() {
  if (!authToken) {
    console.log('❌ 需要先登录获取token');
    return;
  }
  
  try {
    console.log('\n🧪 测试修改密码...');
    const passwordData = {
      oldPassword: testUser.password,
      newPassword: '654321'
    };
    
    const response = await axios.put(`${API_BASE_URL}/change-password`, passwordData, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    if (response.data.success) {
      console.log('✅ 修改密码成功:', response.data.message);
      // 改回原密码
      const revertResponse = await axios.put(`${API_BASE_URL}/change-password`, {
        oldPassword: '654321',
        newPassword: testUser.password
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (revertResponse.data.success) {
        console.log('✅ 密码已改回原密码');
      }
    } else {
      console.log('❌ 修改密码失败:', response.data.message);
    }
  } catch (error) {
    if (error.response) {
      console.log('❌ 修改密码失败:', error.response.data.message);
    } else {
      console.log('❌ 修改密码失败:', error.message);
    }
  }
}

// 测试验证token
async function testVerifyToken() {
  if (!authToken) {
    console.log('❌ 需要先登录获取token');
    return;
  }
  
  try {
    console.log('\n🧪 测试验证token...');
    const response = await axios.post(`${API_BASE_URL}/verify-token`, {
      token: authToken
    });
    
    if (response.data.success) {
      console.log('✅ Token验证成功:', response.data.message);
      console.log('🔍 Token信息:', response.data.data);
    } else {
      console.log('❌ Token验证失败:', response.data.message);
    }
  } catch (error) {
    if (error.response) {
      console.log('❌ Token验证失败:', error.response.data.message);
    } else {
      console.log('❌ Token验证失败:', error.message);
    }
  }
}

// 测试无效token
async function testInvalidToken() {
  try {
    console.log('\n🧪 测试无效token...');
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: {
        'Authorization': 'Bearer invalid_token_here'
      }
    });
    
    console.log('❌ 应该失败但成功了:', response.data);
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.log('✅ 无效token正确被拒绝');
    } else {
      console.log('❌ 无效token测试失败:', error.message);
    }
  }
}

// 主测试函数
async function runTests() {
  console.log('🚀 开始测试用户认证API...\n');
  
  await testRegister();
  await testLogin();
  await testGetProfile();
  await testUpdateProfile();
  await testChangePassword();
  await testVerifyToken();
  await testInvalidToken();
  
  console.log('\n🎉 所有测试完成！');
}

// 运行测试
runTests().catch(console.error);
