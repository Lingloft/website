<!--
  主页组件 - 灵阁 LingLoft
  
  视觉风格：明日方舟 / 战术UI / 未来舰队控制台
  
  功能：
  - 展示团队Logo、名称和座右铭
  - 战术风格的欢迎界面
  - 提供导航按钮
  - 显示备案信息
  - 动态状态指示器
  
  SEO 优化：
  - 使用语义化 HTML 标签（header, h1, h2, nav）
  - 添加 ARIA 标签提升无障碍访问性
  - 图片添加详细的 alt 描述
  
  使用示例：
  <HomePage />
-->

<template>
    <PageSection page-id="主页">
        <!-- 页面头部区域 -->
        <header class="home-header" role="banner">
            <!-- 状态指示器 -->
            <div class="status-indicator" aria-hidden="true">
                <span class="status-dot" />
                <span class="status-text">{{ HOME_STATUS }}</span>
            </div>

            <!-- 欢迎语 -->
            <p class="welcome-text" aria-hidden="true">{{ HOME_WELCOME }}</p>

            <!-- Logo容器 -->
            <div class="logo-container">
                <!-- 外圈光效 -->
                <div class="logo-glow" aria-hidden="true" />
                <!-- 背景六边形装饰 -->
                <div class="logo-hex-bg" aria-hidden="true" />
                <!-- Logo -->
                <img 
                    :src="LOGO_PATH" 
                    :alt="`${SITE_NAME}团队Logo`" 
                    class="logo" 
                    width="160" 
                    height="160"
                    loading="eager" 
                    fetchpriority="high" 
                />
                <!-- 扫描环 -->
                <div class="logo-ring" aria-hidden="true" />
                <div class="logo-ring logo-ring--outer" aria-hidden="true" />
            </div>

            <!-- 团队名称 -->
            <div class="name-container">
                <h1 class="name" itemprop="name">{{ SITE_NAME }}</h1>
                <span class="name-en" aria-hidden="true">{{ SITE_NAME_EN }}</span>
            </div>

            <!-- 座右铭 -->
            <h2 class="motto" itemprop="description">{{ SITE_MOTTO }}</h2>

            <!-- 数据流装饰 -->
            <!-- <div class="data-display" aria-hidden="true">
                <span class="data-item">CREW: ACTIVE</span>
                <span class="data-separator">|</span>
                <span class="data-item">MISSION: EXPLORE</span>
                <span class="data-separator">|</span>
                <span class="data-item">STATUS: READY</span>
            </div> -->
        </header>

        <!-- 导航按钮 -->
        <template #buttons>
            <nav class="home-nav" role="navigation" aria-label="主要导航">
                <BaseButton variant="primary" @click="switchPage('关于我')" aria-label="查阅灵阁团队档案">
                    {{ BUTTON_TEXTS.learnMore }}
                </BaseButton>
                <BaseButton variant="secondary" @click="switchPage('友情链接')" aria-label="查看星际联盟">
                    {{ BUTTON_TEXTS.friends }}
                </BaseButton>
            </nav>
        </template>

        <!-- 备案信息 -->
        <!-- <FilingInfo /> -->
    </PageSection>
</template>

<script setup lang="ts">
/**
 * 主页组件
 * 
 * 作为网站的首屏展示，包含：
 * - 团队Logo（使用 eager loading 优化 LCP）
 * - 团队名称（h1 标签，SEO 核心）
 * - 座右铭（h2 标签）
 * - 导航按钮
 * - 备案信息
 */

import {
    SITE_NAME,
    SITE_NAME_EN,
    SITE_MOTTO,
    LOGO_PATH,
    HOME_WELCOME,
    HOME_STATUS,
    BUTTON_TEXTS,
} from '~/config/site.config'

// ==================== Composables ====================

const { switchPage } = usePageNavigation()
</script>

<style scoped>
/* ==================== 页面头部样式 ==================== */

.home-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
}

/* ==================== 状态指示器 - 仅手机端显示 ==================== */

.status-indicator {
    display: none;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    padding: 8px 16px;
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-md);
}

.status-dot {
    width: 8px;
    height: 8px;
    background: var(--accent-color);
    border-radius: 50%;
    box-shadow: var(--glow-sm);
    animation: pulse-glow 2s ease-in-out infinite;
}

.status-text {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--accent-color);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
}

/* ==================== 欢迎语 - 仅手机端显示 ==================== */

.welcome-text {
    display: none;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    color: var(--text-tertiary);
    letter-spacing: var(--letter-spacing-ultra);
    margin-bottom: 20px;
}

/* ==================== Logo容器 ==================== */

.logo-container {
    position: relative;
    width: 220px;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
}

/* ==================== Logo光效 ==================== */

.logo-glow {
    position: absolute;
    width: 180%;
    height: 180%;
    background: radial-gradient(circle, var(--accent-color-glow) 0%, transparent 60%);
    
    pointer-events: none;
}

/* ==================== 六边形背景装饰 ==================== */

.logo-hex-bg {
    position: absolute;
    width: 200px;
    height: 200px;
    background: var(--bg-secondary);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    border: 2px solid var(--border-primary);
    opacity: 0.3;
}

/* ==================== Logo样式 ==================== */

.logo {
    position: relative;
    width: 160px;
    height: 160px;
    object-fit: contain;
    z-index: 2;
    transition: var(--transition-default);
    filter: drop-shadow(0 0 20px var(--accent-color-glow));
}

.logo:hover {
    filter: drop-shadow(0 0 40px var(--accent-color-glow));
    transform: scale(1.05);
}

/* ==================== 扫描环 ==================== */

.logo-ring {
    position: absolute;
    width: 200px;
    height: 200px;
    border: 1px solid var(--border-primary);
    border-radius: 50%;
    animation: spin 20s linear infinite;
}

.logo-ring::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: var(--accent-color);
    border-radius: 50%;
    box-shadow: var(--glow-sm);
}

.logo-ring--outer {
    width: 240px;
    height: 240px;
    border-color: var(--border-secondary);
    animation: spin 30s linear infinite reverse;
    opacity: 0.5;
}

.logo-ring--outer::before {
    width: 4px;
    height: 4px;
    background: var(--accent-color-dim);
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* ==================== 名称容器 ==================== */

.name-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    margin-bottom: 8px;
}

/* ==================== 名称样式 ==================== */

.name {
    font-size: var(--font-size-4xl);
    margin: 0;
    font-weight: 700;
    color: var(--text-primary);
    text-shadow: 0 0 40px var(--accent-color-glow);
    letter-spacing: var(--letter-spacing-wide);
}

.name-en {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    color: var(--accent-color);
    letter-spacing: var(--letter-spacing-ultra);
    opacity: 0.8;
}

/* ==================== 座右铭样式 ==================== */

.motto {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    font-weight: 500;
    margin-bottom: 0;
    color: var(--text-secondary);
    letter-spacing: var(--letter-spacing);
}

/* ==================== 数据显示 ==================== */

.data-display {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-md);
    margin-bottom: 20px;
}

.data-item {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing);
}

.data-separator {
    color: var(--accent-color-dim);
    opacity: 0.5;
}

/* ==================== 导航样式 ==================== */

.home-nav {
    display: contents;
}

/* ==================== 响应式调整 ==================== */

@media (max-width: 768px) {
    /* 手机端显示状态指示器和欢迎语 */
    .status-indicator {
        display: flex;
    }

    .welcome-text {
        display: block;
    }

    .name {
        font-size: var(--font-size-3xl);
    }

    .data-display {
        flex-direction: column;
        gap: 8px;
        padding: 10px 16px;
    }

    .data-separator {
        display: none;
    }

    .logo-container {
        width: 180px;
        height: 180px;
    }

    .logo {
        width: 130px;
        height: 130px;
    }

    .logo-hex-bg {
        width: 160px;
        height: 160px;
    }

    .logo-ring {
        width: 160px;
        height: 160px;
    }

    .logo-ring--outer {
        width: 190px;
        height: 190px;
    }
}

@media (max-width: 480px) {
    .status-indicator {
        display: flex;
        padding: 6px 12px;
    }

    .data-display {
        padding: 8px 12px;
    }

    .logo-container {
        width: 160px;
        height: 160px;
    }

    .logo {
        width: 110px;
        height: 110px;
    }

    .logo-hex-bg {
        width: 140px;
        height: 140px;
    }

    .logo-ring {
        width: 140px;
        height: 140px;
    }

    .logo-ring--outer {
        width: 170px;
        height: 170px;
    }
}
</style>
