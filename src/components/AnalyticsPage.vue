<template>
  <div class="analytics-page">
    <div class="page-header">
      <h1>📊 数据分析中心</h1>
      <p>限时秒杀活动性能测试与数据分析</p>
    </div>

    <!-- 测试配置区域 -->
    <div class="test-config-section">
      <h2>🧪 测试配置</h2>
      <div class="config-grid">
        <div class="config-item">
          <label>商品ID:</label>
          <input v-model="testConfig.productId" type="text" placeholder="输入商品ID" />
        </div>
        <div class="config-item">
          <label>并发用户数:</label>
          <input v-model="testConfig.concurrentUsers" type="number" min="1" max="1000" />
        </div>
        <div class="config-item">
          <label>总请求数:</label>
          <input v-model="testConfig.totalRequests" type="number" min="10" max="10000" />
        </div>
        <div class="config-item">
          <label>库存数量:</label>
          <input v-model="testConfig.stock" type="number" min="1" max="1000" />
        </div>
        <div class="config-item">
          <label>限购数量:</label>
          <input v-model="testConfig.limit" type="number" min="1" max="10" />
        </div>
        <div class="config-item">
          <label>API基础URL:</label>
          <input v-model="testConfig.apiBase" type="text" placeholder="http://localhost:3001" />
        </div>
      </div>
      
      <div class="action-buttons">
        <button @click="initializeStock" class="btn btn-secondary" :disabled="isRunning">
          🚀 初始化库存
        </button>
        <button @click="startTest" class="btn btn-primary" :disabled="isRunning">
          🎯 开始测试
        </button>
        <button @click="stopTest" class="btn btn-danger" :disabled="!isRunning">
          ⏹️ 停止测试
        </button>
        <button @click="clearResults" class="btn btn-outline">
          🗑️ 清空结果
        </button>
      </div>
    </div>

    <!-- 测试状态 -->
    <div v-if="isRunning" class="test-status">
      <div class="status-indicator">
        <span class="spinner"></span>
        <span>测试进行中...</span>
        <span class="progress">{{ completedRequests }}/{{ testConfig.totalRequests }}</span>
      </div>
    </div>

    <!-- 测试结果 -->
    <div v-if="testResults.length > 0" class="results-section">
      <h2>📈 测试结果</h2>
      
      <!-- 统计概览 -->
      <div class="stats-overview">
        <div class="stat-card">
          <h3>总请求数</h3>
          <p class="stat-number">{{ totalRequests }}</p>
        </div>
        <div class="stat-card">
          <h3>成功请求</h3>
          <p class="stat-number success">{{ successfulRequests }}</p>
        </div>
        <div class="stat-card">
          <h3>失败请求</h3>
          <p class="stat-number error">{{ failedRequests }}</p>
        </div>
        <div class="stat-card">
          <h3>成功率</h3>
          <p class="stat-number">{{ successRate.toFixed(2) }}%</p>
        </div>
        <div class="stat-card">
          <h3>平均响应时间</h3>
          <p class="stat-number">{{ averageResponseTime.toFixed(2) }}ms</p>
        </div>
        <div class="stat-card">
          <h3>最大响应时间</h3>
          <p class="stat-number">{{ maxResponseTime }}ms</p>
        </div>
      </div>

      <!-- 详细结果表格 -->
      <div class="results-table">
        <h3>详细结果</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>请求ID</th>
                <th>状态</th>
                <th>响应时间(ms)</th>
                <th>库存剩余</th>
                <th>用户购买数</th>
                <th>失败原因</th>
                <th>时间戳</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in testResults" :key="result.id" :class="result.status">
                <td>{{ result.id }}</td>
                <td>
                  <span :class="['status-badge', result.status]">
                    {{ result.status === 'success' ? '成功' : '失败' }}
                  </span>
                </td>
                <td>{{ result.responseTime }}</td>
                <td>{{ result.leftStock }}</td>
                <td>{{ result.userCount }}</td>
                <td>{{ result.reason || '-' }}</td>
                <td>{{ formatTime(result.timestamp) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 图表分析 -->
      <div class="charts-section">
        <h3>📊 图表分析</h3>
        <div class="chart-grid">
          <div class="chart-container">
            <h4>响应时间分布</h4>
            <div class="response-time-chart">
              <div class="chart-bar" v-for="(count, range) in responseTimeRanges" :key="range">
                <div class="bar-label">{{ range }}</div>
                <div class="bar" :style="{ height: getBarHeight(count) + 'px' }"></div>
                <div class="bar-count">{{ count }}</div>
              </div>
            </div>
          </div>
          
          <div class="chart-container">
            <h4>成功率趋势</h4>
            <div class="success-rate-chart">
              <div class="chart-line" :style="{ '--success-rate': successRate + '%' }"></div>
              <div class="chart-labels">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 实时日志 -->
    <div v-if="testLogs.length > 0" class="logs-section">
      <h2>📝 测试日志</h2>
      <div class="logs-container">
        <div v-for="log in testLogs" :key="log.id" :class="['log-entry', log.type]">
          <span class="log-time">{{ formatTime(log.timestamp) }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onUnmounted } from 'vue'

// 测试配置
const testConfig = reactive({
  productId: '1',
  concurrentUsers: 100,
  totalRequests: 1000,
  stock: 50,
  limit: 1,
  apiBase: 'http://localhost:3001'
})

// 测试状态
const isRunning = ref(false)
const completedRequests = ref(0)
const testResults = ref<any[]>([])
const testLogs = ref<any[]>([])
let currentTestId = 0

// 计算属性
const totalRequests = computed(() => testResults.value.length)
const successfulRequests = computed(() => testResults.value.filter(r => r.status === 'success').length)
const failedRequests = computed(() => testResults.value.filter(r => r.status === 'failed').length)
const successRate = computed(() => totalRequests.value > 0 ? (successfulRequests.value / totalRequests.value) * 100 : 0)
const averageResponseTime = computed(() => {
  if (testResults.value.length === 0) return 0
  const total = testResults.value.reduce((sum, r) => sum + r.responseTime, 0)
  return total / testResults.value.length
})
const maxResponseTime = computed(() => {
  if (testResults.value.length === 0) return 0
  return Math.max(...testResults.value.map(r => r.responseTime))
})

// 响应时间分布
const responseTimeRanges = computed(() => {
  const ranges: Record<string, number> = {
    '0-100ms': 0,
    '100-200ms': 0,
    '200-500ms': 0,
    '500ms+': 0
  }
  
  testResults.value.forEach(result => {
    if (result.responseTime < 100) ranges['0-100ms']++
    else if (result.responseTime < 200) ranges['100-200ms']++
    else if (result.responseTime < 500) ranges['200-500ms']++
    else ranges['500ms+']++
  })
  
  return ranges
})

// 工具函数
function addLog(message: string, type: 'info' | 'success' | 'error' = 'info') {
  testLogs.value.unshift({
    id: Date.now(),
    message,
    type,
    timestamp: Date.now()
  })
  
  // 限制日志数量
  if (testLogs.value.length > 100) {
    testLogs.value = testLogs.value.slice(0, 100)
  }
}

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString()
}

function getBarHeight(count: number) {
  const maxCount = Math.max(...Object.values(responseTimeRanges.value))
  return maxCount > 0 ? (count / maxCount) * 100 : 0
}

// 初始化库存
async function initializeStock() {
  try {
    addLog('正在初始化库存...', 'info')
    
    const response = await fetch(`${testConfig.apiBase}/fs/init`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: testConfig.productId,
        stock: testConfig.stock
      })
    })
    
    if (response.ok) {
      addLog(`库存初始化成功: 商品${testConfig.productId} 库存${testConfig.stock}`, 'success')
    } else {
      throw new Error(`HTTP ${response.status}`)
    }
  } catch (error) {
    addLog(`库存初始化失败: ${error}`, 'error')
  }
}

// 执行单个请求
async function executeRequest(): Promise<any> {
  const startTime = Date.now()
  const reqId = `test_${currentTestId++}_${Date.now()}`
  
  try {
    const response = await fetch(`${testConfig.apiBase}/fs/buy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: testConfig.productId,
        qty: 1,
        userId: `test_user_${currentTestId}`, // 使用递增的ID，确保每个用户唯一
        reqId,
        limit: testConfig.limit
      })
    })
    
    const data = await response.json()
    const responseTime = Date.now() - startTime
    
    return {
      id: reqId,
      status: data.ok ? 'success' : 'failed',
      responseTime,
      leftStock: data.left || 0,
      userCount: data.userCount || 0,
      reason: data.reason || null,
      timestamp: Date.now()
    }
  } catch (error) {
    const responseTime = Date.now() - startTime
    return {
      id: reqId,
      status: 'failed',
      responseTime,
      leftStock: 0,
      userCount: 0,
      reason: 'NETWORK_ERROR',
      timestamp: Date.now()
    }
  }
}

// 开始测试
async function startTest() {
  if (isRunning.value) return
  
  isRunning.value = true
  completedRequests.value = 0
  currentTestId = 0
  addLog(`开始测试: ${testConfig.concurrentUsers}并发用户, ${testConfig.totalRequests}总请求`, 'info')
  
  const startTime = Date.now()
  
  // 使用递归方式执行批次，确保不会重叠
  const executeBatch = async () => {
    if (completedRequests.value >= testConfig.totalRequests) {
      stopTest()
      const totalTime = Date.now() - startTime
      addLog(`测试完成! 总耗时: ${totalTime}ms, 成功率: ${successRate.value.toFixed(2)}%`, 'success')
      return
    }
    
    const promises = []
    const batchSize = Math.min(testConfig.concurrentUsers, testConfig.totalRequests - completedRequests.value)
    
    for (let i = 0; i < batchSize; i++) {
      promises.push(executeRequest())
    }
    
    const results = await Promise.all(promises)
    testResults.value.push(...results)
    completedRequests.value += results.length
    
    // 添加日志
    const successCount = results.filter(r => r.status === 'success').length
    addLog(`批次完成: ${results.length}个请求, 成功${successCount}个, 进度: ${completedRequests.value}/${testConfig.totalRequests}`, 'info')
    
    // 检查是否完成
    if (completedRequests.value >= testConfig.totalRequests) {
      stopTest()
      const totalTime = Date.now() - startTime
      addLog(`测试完成! 总耗时: ${totalTime}ms, 成功率: ${successRate.value.toFixed(2)}%`, 'success')
      return
    }
    
    // 递归执行下一批次，确保不会重叠
    setTimeout(executeBatch, 50) // 减少间隔，提高效率
  }
  
  // 开始执行第一个批次
  executeBatch()
}

// 停止测试
function stopTest() {
  isRunning.value = false
  addLog('测试已停止', 'info')
}

// 清空结果
function clearResults() {
  testResults.value = []
  testLogs.value = []
  completedRequests.value = 0
  addLog('结果已清空', 'info')
}

// 组件卸载时清理
onUnmounted(() => {
  // 不再需要清理定时器
})
</script>

<style scoped>
.analytics-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.page-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
  font-weight: 700;
}

.page-header p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.test-config-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.test-config-section h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5rem;
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.config-item {
  display: flex;
  flex-direction: column;
}

.config-item label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #555;
}

.config-item input {
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.config-item input:focus {
  outline: none;
  border-color: #667eea;
}

.action-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5a6fd8;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #28a745;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #218838;
  transform: translateY(-2px);
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #c82333;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-outline:hover:not(:disabled) {
  background: #667eea;
  color: white;
}

.test-status {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #856404;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.results-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.results-section h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5rem;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border-left: 4px solid #667eea;
}

.stat-card h3 {
  margin: 0 0 10px 0;
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
}

.stat-number {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
}

.stat-number.success {
  color: #28a745;
}

.stat-number.error {
  color: #dc3545;
}

.results-table h3 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.3rem;
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e1e5e9;
}

th {
  background: #f8f9fa;
  font-weight: 600;
  color: #555;
}

tr:hover {
  background: #f8f9fa;
}

tr.success {
  background: #d4edda;
}

tr.failed {
  background: #f8d7da;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.success {
  background: #d4edda;
  color: #155724;
}

.status-badge.failed {
  background: #f8d7da;
  color: #721c24;
}

.charts-section {
  margin-top: 30px;
}

.charts-section h3 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.3rem;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.chart-container {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.chart-container h4 {
  margin: 0 0 15px 0;
  color: #555;
  font-size: 1.1rem;
}

.response-time-chart {
  display: flex;
  align-items: end;
  gap: 15px;
  height: 120px;
  padding: 20px 0;
}

.chart-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.bar-label {
  font-size: 12px;
  color: #666;
  text-align: center;
}

.bar {
  width: 100%;
  background: linear-gradient(to top, #667eea, #764ba2);
  border-radius: 4px 4px 0 0;
  min-height: 4px;
  transition: height 0.3s;
}

.bar-count {
  font-size: 12px;
  color: #333;
  font-weight: 600;
}

.success-rate-chart {
  position: relative;
  height: 120px;
  background: #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.chart-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--success-rate, 0%);
  background: linear-gradient(to top, #28a745, #20c997);
  transition: height 0.5s;
}

.chart-labels {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 12px;
  color: #666;
}

.logs-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logs-section h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5rem;
}

.logs-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 10px;
}

.log-entry {
  padding: 8px 12px;
  margin-bottom: 5px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  display: flex;
  gap: 15px;
}

.log-entry.info {
  background: #e3f2fd;
  color: #1565c0;
}

.log-entry.success {
  background: #e8f5e8;
  color: #2e7d32;
}

.log-entry.error {
  background: #ffebee;
  color: #c62828;
}

.log-time {
  color: #666;
  font-weight: 600;
  min-width: 80px;
}

.log-message {
  flex: 1;
}

@media (max-width: 768px) {
  .config-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .chart-grid {
    grid-template-columns: 1fr;
  }
}
</style>
