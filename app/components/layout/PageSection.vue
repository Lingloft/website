<!--
  页面区块布局组件 - 灵阁 LingLoft
  
  视觉风格：明日方舟 / 战术UI / 未来舰队控制台
  
  功能：
  - 提供统一的页面区块布局
  - 战术风格标题和分隔线
  - 战术网格背景效果
  - 角落装饰元素
  - 扫描线效果
  - 支持内容和按钮插槽
  - 根据当前页面状态控制显示/隐藏
  - 支持页面滚动
  
  Props:
  - pageId: 页面标识符
  - title: 页面标题（可选）
  
  Slots:
  - default: 主要内容区域
  - buttons: 按钮区域
  
  使用示例：
  <PageSection page-id="主页">
    <template #default>内容</template>
    <template #buttons>按钮</template>
  </PageSection>
-->

<template>
    <section :id="pageId" :class="sectionClass">
        <!-- 战术网格背景 -->
        <div class="page-section__grid-bg" aria-hidden="true" />
        
        <!-- 扫描线效果 -->
        <div class="page-section__scanline" aria-hidden="true" />
        
        <!-- 角落装饰 -->
        <div class="page-section__corner page-section__corner--tl" aria-hidden="true" />
        <div class="page-section__corner page-section__corner--tr" aria-hidden="true" />
        <div class="page-section__corner page-section__corner--bl" aria-hidden="true" />
        <div class="page-section__corner page-section__corner--br" aria-hidden="true" />

        <!-- 顶部装饰标签 -->
        <div class="page-section__header-decoration" aria-hidden="true">
            <span class="tactical-label">{{ decorationLeft }}</span>
            <span class="tactical-label">{{ decorationRight }}</span>
        </div>

        <!-- 页面标题（如果有） -->
        <div v-if="title" class="page-section__title-container">
            <span class="page-section__title-prefix page-section__title-prefix--left" aria-hidden="true">//</span>
            <h1 class="page-section__title">{{ title }}</h1>
            <span class="page-section__title-prefix page-section__title-prefix--right" aria-hidden="true">\\</span>
        </div>

        <!-- 战术分隔线（如果有标题） -->
        <div v-if="title" class="page-section__divider" aria-hidden="true">
            <span class="page-section__divider-dot" />
            <span class="page-section__divider-line" />
            <span class="page-section__divider-dot" />
        </div>

        <!-- 主要内容区域 -->
        <div class="page-section__content">
            <slot />
        </div>

        <!-- 按钮区域 -->
        <div class="page-section__buttons">
            <slot name="buttons" />
        </div>

        <!-- 底部装饰 -->
        <div class="page-section__footer-decoration" aria-hidden="true">
            <span class="tactical-label">LINGLOFT.SYS</span>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { PageName } from '~/types'

// ==================== Props 定义 ====================

interface Props {
    /** 页面标识符，用于控制显示/隐藏 */
    pageId: PageName
    /** 页面标题（可选，显示在页面顶部） */
    title?: string
}

const props = defineProps<Props>()

// ==================== Composables ====================

const { isCurrentPage } = usePageNavigation()

// ==================== 计算属性 ====================

/**
 * 计算区块的 CSS 类名
 * 根据当前页面状态添加显示/隐藏类
 */
const sectionClass = computed(() => [
    'page-section',
    isCurrentPage(props.pageId) ? 'visible' : 'hidden',
])

/**
 * 装饰文字 - 左侧
 */
const decorationLeft = computed(() => {
    const decorations: Record<string, string> = {
        '主页': 'CMD.CENTER',
        '关于我': 'ARCHIVE.DAT',
        '友情链接': 'ALLIANCE.NET',
        '联系方式': 'COMM.LINK',
        '我的项目': 'SYSTEMS.EXE',
    }
    return decorations[props.pageId] || 'SECTOR.7G'
})

/**
 * 装饰文字 - 右侧
 */
const decorationRight = computed(() => {
    const now = new Date()
    return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`
})
</script>

<style scoped>
/* ==================== 页面区块容器 ==================== */

.page-section {
    /* 定位 */
    position: absolute;
    top: 0;
    left: 0;

    /* 尺寸 */
    min-height: 100%;
    width: 100%;

    /* 布局 */
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;

    /* 背景 */
    background-color: var(--bg-primary);
    overflow: auto;
    overflow-x: hidden;
    padding: 60px 20px;

    /* 过渡动画 */
    transition: var(--transition-default);
}

/* ==================== 显示状态 ==================== */

.page-section.visible {
    visibility: visible;
    transform: scale(1);
    opacity: 1;
    z-index: 10;
    filter: blur(0);
}

/* ==================== 隐藏状态 ==================== */

.page-section.hidden {
    visibility: hidden;
    transform: scale(0);
    opacity: 0;
    z-index: 1;
    filter: blur(10px);
    pointer-events: none;
}

/* ==================== 战术网格背景 ==================== */

.page-section__grid-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
        /* 主网格 */
        linear-gradient(var(--grid-line-color) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px),
        /* 大网格 */
        linear-gradient(var(--grid-line-color-strong) 1px, transparent 1px),
        linear-gradient(90deg, var(--grid-line-color-strong) 1px, transparent 1px);
    background-size: 
        var(--grid-size) var(--grid-size),
        var(--grid-size) var(--grid-size),
        var(--grid-size-lg) var(--grid-size-lg),
        var(--grid-size-lg) var(--grid-size-lg);
    pointer-events: none;
    z-index: var(--z-background);
}

/* ==================== 扫描线效果 ==================== */

.page-section__scanline {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: var(--z-background);
    overflow: hidden;
}

.page-section__scanline::before {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        180deg,
        transparent 0%,
        rgba(0, 212, 255, 0.03) 50%,
        transparent 100%
    );
    animation: scanline var(--scanline-speed) linear infinite;
}

/* ==================== 角落装饰 ==================== */

.page-section__corner {
    position: absolute;
    width: 24px;
    height: 24px;
    pointer-events: none;
    z-index: var(--z-content);
}

.page-section__corner--tl {
    top: 20px;
    left: 20px;
    border-top: 3px solid var(--accent-color);
    border-left: 3px solid var(--accent-color);
}

.page-section__corner--tr {
    top: 20px;
    right: 20px;
    border-top: 3px solid var(--accent-color);
    border-right: 3px solid var(--accent-color);
}

.page-section__corner--bl {
    bottom: 20px;
    left: 20px;
    border-bottom: 3px solid var(--accent-color);
    border-left: 3px solid var(--accent-color);
}

.page-section__corner--br {
    bottom: 20px;
    right: 20px;
    border-bottom: 3px solid var(--accent-color);
    border-right: 3px solid var(--accent-color);
}

/* ==================== 顶部装饰 ==================== */

.page-section__header-decoration {
    position: absolute;
    top: 25px;
    left: 50px;
    right: 50px;
    display: flex;
    justify-content: space-between;
    z-index: var(--z-content);
}

.page-section__header-decoration .tactical-label {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-ultra);
    opacity: 0.5;
}

/* ==================== 标题容器 ==================== */

.page-section__title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    z-index: var(--z-content);
    margin-bottom: 8px;
}

.page-section__title-prefix {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-2xl);
    color: var(--accent-color);
    opacity: 0.6;
}

.page-section__title-prefix--left,
.page-section__title-prefix--right {
    min-width: 30px;
    text-align: center;
}

/* ==================== 页面标题 ==================== */

.page-section__title {
    font-size: var(--font-size-3xl);
    margin: 0;
    font-weight: 700;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);
    text-shadow: 0 0 30px var(--accent-color-glow);
    z-index: var(--z-content);
}

/* ==================== 战术分隔线 ==================== */

.page-section__divider {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    margin-bottom: 30px;
    z-index: var(--z-content);
}

.page-section__divider-line {
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--accent-color) 50%, transparent);
    box-shadow: var(--glow-sm);
}

.page-section__divider-dot {
    width: 8px;
    height: 8px;
    background: var(--accent-color);
    box-shadow: var(--glow-sm);
}

/* ==================== 内容区域 ==================== */

.page-section__content {
    z-index: var(--z-content);
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
}

/* ==================== 按钮区域 ==================== */

.page-section__buttons {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    z-index: var(--z-content);
    margin-top: 20px;
}

/* ==================== 底部装饰 ==================== */

.page-section__footer-decoration {
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-content);
}

.page-section__footer-decoration .tactical-label {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-ultra);
    opacity: 0.3;
}

/* ==================== 响应式调整 ==================== */

@media (max-width: 768px) {
    .page-section {
        padding: 50px 15px;
    }

    .page-section__corner {
        width: 18px;
        height: 18px;
    }

    .page-section__corner--tl {
        top: 15px;
        left: 15px;
        border-top: 3px solid var(--accent-color);
        border-left: 3px solid var(--accent-color);
    }

    .page-section__corner--tr {
        top: 15px;
        right: 15px;
        border-top: 3px solid var(--accent-color);
        border-right: 3px solid var(--accent-color);
    }

    .page-section__corner--bl {
        bottom: 15px;
        left: 15px;
        border-bottom: 3px solid var(--accent-color);
        border-left: 3px solid var(--accent-color);
    }

    .page-section__corner--br {
        bottom: 15px;
        right: 15px;
        border-bottom: 3px solid var(--accent-color);
        border-right: 3px solid var(--accent-color);
    }

    .page-section__header-decoration {
        top: 18px;
        left: 40px;
        right: 40px;
    }

    .page-section__title-prefix {
        font-size: var(--font-size-xl);
        min-width: 24px;
    }

    .page-section__title-container {
        gap: 10px;
    }

    .page-section__divider-line {
        width: 80px;
        height: 3px;
    }

    .page-section__divider-dot {
        width: 6px;
        height: 6px;
    }
}
</style>
