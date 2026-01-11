<!--
  应用根组件 - 灵阁 LingLoft
  
  视觉风格：明日方舟 / 战术UI / 未来舰队控制台
  
  功能：
  - 作为应用的入口点
  - 渲染所有页面组件
  - 管理页面切换和过渡动画
  - 提供语义化 HTML 结构以优化 SEO
  - 支持 URL hash 路由（如 #about, #friends）
  - 全局战术装饰效果
  
  架构说明：
  本应用采用单页面多区块的设计模式，
  所有页面区块同时存在于 DOM 中，
  通过 CSS 过渡动画实现页面切换效果。
  
  SEO 优化：
  - 使用语义化 HTML5 标签（main, section, article, nav, header, footer）
  - 添加 ARIA 标签提升无障碍访问性
  - 结构化数据通过 nuxt.config.ts 注入
  - 支持 URL hash 路由，便于分享和 SEO
-->

<template>
  <!-- 主应用容器 -->
  <div id="app-container" role="main" aria-label="灵阁 LingLoft 团队官网">
    <!-- 全局背景效果 -->
    <div class="global-effects" aria-hidden="true">
      <!-- 渐变背景 -->
      <div class="bg-gradient" />
      <!-- 噪点纹理 -->
      <div class="bg-noise" />
      <!-- 光晕效果 -->
      <div class="bg-glow bg-glow--top" />
      <div class="bg-glow bg-glow--bottom" />
    </div>

    <!-- 跳转链接 - 提升无障碍访问性 -->
    <a href="#main-content" class="skip-link" aria-label="跳转到主要内容">
      跳转到主要内容
    </a>

    <!-- 顶部状态栏 -->
    <div class="top-bar" aria-hidden="true">
      <div class="top-bar__left">
        <span class="system-label">SYS.LINGLOFT</span>
        <span class="system-status">
          <span class="status-dot" />
          ONLINE
        </span>
      </div>
      <div class="top-bar__center">
        <span class="time-display">{{ currentTime }}</span>
      </div>
      <div class="top-bar__right">
        <span class="version-label">v2.1.0</span>
      </div>
    </div>

    <!-- 主页 - 作为首屏展示 -->
    <HomePage id="main-content" />

    <!-- 关于我 - 团队介绍区块 -->
    <AboutPage />

    <!-- 友情链接 - 星际联盟区块 -->
    <FriendsPage />

    <!-- 联系方式 - 通讯频道区块 -->
    <ContactPage />

    <!-- 我的项目 - 作战系统区块 -->
    <ProjectsPage />

    <!-- 底部装饰线 -->
    <div class="bottom-decoration" aria-hidden="true">
      <span class="decoration-line" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 应用根组件
 * 
 * 所有页面组件通过 PageSection 组件包装，
 * 根据 usePageNavigation composable 中的当前页面状态
 * 自动控制显示/隐藏和过渡动画。
 * 
 * Hash 路由说明：
 * - 支持 URL hash 路由（如 #about, #friends, #contact, #projects）
 * - 页面切换时自动更新 URL hash
 * - 打开带 hash 的 URL 时自动跳转到对应页面
 * - 支持浏览器前进/后退按钮
 * 
 * SEO 说明：
 * - 全局 SEO 配置在 nuxt.config.ts 中定义
 * - 结构化数据（JSON-LD）在 nuxt.config.ts 中注入
 * - 各页面组件使用语义化标签
 */

// ==================== 响应式数据 ====================

const currentTime = ref('')

// ==================== Hash 路由初始化 ====================

const { initFromHash, setupHashChangeListener } = usePageNavigation()

/**
 * 更新时间显示
 */
function updateTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
}

/**
 * 在客户端挂载时初始化
 */
onMounted(() => {
  // 从 URL hash 初始化页面（如果有）
  initFromHash()

  // 监听浏览器前进/后退事件
  setupHashChangeListener()

  // 初始化时间显示
  updateTime()
  
  // 每秒更新时间
  setInterval(updateTime, 1000)
})
</script>

<style>
/* ==================== 应用容器样式 ==================== */

#app-container {
  width: 100%;
  height: 100vh;
  position: relative;
  /* overflow: hidden; */
  background: var(--bg-primary);
}

/* ==================== 全局背景效果 ==================== */

.global-effects {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: var(--z-background);
  height: 100vh;
}

/* 渐变背景 */
.bg-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 50% 0%, rgba(0, 212, 255, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse at 0% 100%, rgba(0, 212, 255, 0.03) 0%, transparent 40%),
    radial-gradient(ellipse at 100% 100%, rgba(0, 212, 255, 0.03) 0%, transparent 40%);
}

/* 噪点纹理 */
.bg-noise {
  position: absolute;
  inset: 0;
  opacity: 0.015;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}

/* 光晕效果 */
.bg-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
}

.bg-glow--top {
  top: -300px;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, var(--accent-color-subtle) 0%, transparent 70%);
}

.bg-glow--bottom {
  bottom: -300px;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, var(--accent-color-ultra-subtle) 0%, transparent 70%);
}

/* ==================== 跳转链接 ==================== */

.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent-color);
  color: var(--bg-primary);
  padding: 12px 24px;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--font-size-sm);
  z-index: var(--z-tooltip);
  transition: top 0.3s ease;
}

.skip-link:focus {
  top: 0;
  outline: 2px solid var(--text-primary);
  outline-offset: 2px;
}

/* ==================== 顶部状态栏 ==================== */

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: linear-gradient(180deg, var(--bg-secondary) 0%, transparent 100%);
  border-bottom: 1px solid var(--border-subtle);
  z-index: var(--z-overlay);
}

.top-bar__left,
.top-bar__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.top-bar__center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.system-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  letter-spacing: var(--letter-spacing-wide);
}

.system-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--accent-color);
}

.status-dot {
  width: 6px;
  height: 6px;
  background: var(--accent-color);
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}

.time-display {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  letter-spacing: var(--letter-spacing-wide);
}

.version-label {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  letter-spacing: var(--letter-spacing);
}

/* ==================== 底部装饰线 ==================== */

.bottom-decoration {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: var(--z-overlay);
  pointer-events: none;
}

.decoration-line {
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--accent-color-dim) 20%,
    var(--accent-color) 50%,
    var(--accent-color-dim) 80%,
    transparent 100%
  );
  opacity: 0.5;
}

/* ==================== 响应式调整 ==================== */

@media (max-width: 768px) {
  .top-bar {
    padding: 0 15px;
  }

  .system-label {
    display: none;
  }

  .bg-glow {
    width: 400px;
    height: 400px;
  }

  .bg-glow--top {
    top: -200px;
  }

  .bg-glow--bottom {
    bottom: -200px;
  }
}

@media (max-width: 480px) {
  .top-bar__left .system-status,
  .top-bar__right {
    display: none;
  }

  .top-bar__center {
    position: static;
    transform: none;
  }
}
</style>
