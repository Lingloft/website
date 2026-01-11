<!--
  基础卡片组件 - 灵阁 LingLoft
  
  视觉风格：明日方舟 / 战术UI / 未来舰队控制台
  
  功能：
  - 展示图标、标题和简介
  - 支持点击跳转链接
  - 支持不同类型的卡片样式（友情链接/项目）
  - 战术风格的悬浮卡片效果
  - 角落装饰和光效
  
  SEO 优化：
  - 使用语义化 HTML 标签（article, h3）
  - 外部链接添加 rel="noopener noreferrer"
  - 添加 ARIA 标签提升无障碍访问性
  - 图片添加详细的 alt 描述
  
  Props:
  - title: 卡片标题
  - description: 卡片描述
  - icon: 图标路径或 URL
  - link: 链接地址（可选，# 表示无链接）
  - type: 卡片类型 ('friend' | 'project')
  
  使用示例：
  <BaseCard 
    title="项目名称" 
    description="项目描述" 
    icon="/icons/project.svg"
    link="https://example.com"
    type="project"
  />
-->

<template>
    <!-- 卡片容器 -->
    <article 
        class="base-card" 
        :class="[
            `base-card--${type}`,
            { 'base-card--clickable': hasValidLink }
        ]"
        @click="handleClick"
        @keydown.enter="handleClick"
        @keydown.space.prevent="handleClick"
        :tabindex="hasValidLink ? 0 : -1"
        :role="hasValidLink ? 'link' : undefined"
        :aria-label="hasValidLink ? `访问${title}` : undefined"
        itemscope
        :itemtype="type === 'project' ? 'https://schema.org/CreativeWork' : 'https://schema.org/Person'"
    >
        <!-- 角落装饰 -->
        <div class="card-corner card-corner--tl" aria-hidden="true" />
        <div class="card-corner card-corner--tr" aria-hidden="true" />
        <div class="card-corner card-corner--bl" aria-hidden="true" />
        <div class="card-corner card-corner--br" aria-hidden="true" />

        <!-- 顶部标签 -->
        <div class="card-label" aria-hidden="true">
            <span class="label-text">{{ type === 'friend' ? 'ALLY' : 'SYSTEM' }}</span>
            <span class="label-status" :class="{ 'label-status--active': hasValidLink }">
                {{ hasValidLink ? '●' : '○' }}
            </span>
        </div>

        <!-- 图标容器 -->
        <div class="card-icon-container">
            <!-- 图标光效 -->
            <div class="icon-glow" aria-hidden="true" />
            <!-- 图标 -->
            <img 
                :src="iconPath" 
                :alt="`${title}的${type === 'friend' ? '头像' : '图标'}`" 
                :class="iconClass"
                width="80"
                height="80"
                loading="lazy"
                itemprop="image"
            />
            <!-- 扫描环（仅友情链接） -->
            <div v-if="type === 'friend'" class="icon-ring" aria-hidden="true" />
        </div>

        <!-- 标题 -->
        <h3 class="card-title" itemprop="name">{{ title }}</h3>

        <!-- 描述 -->
        <p class="card-description" itemprop="description">{{ description }}</p>

        <!-- 操作指示 -->
        <div v-if="hasValidLink" class="card-action" aria-hidden="true">
            <span class="action-line" />
            <span class="action-text">{{ type === 'friend' ? 'CONNECT' : 'LAUNCH' }}</span>
            <span class="action-icon">→</span>
        </div>

        <!-- 隐藏的链接 - 用于 SEO 和无障碍访问 -->
        <a 
            v-if="hasValidLink"
            :href="link"
            target="_blank"
            rel="noopener noreferrer"
            class="card-link"
            :aria-label="`访问${title}的网站`"
            itemprop="url"
            @click.stop
        >
            <span class="visually-hidden">访问{{ title }}</span>
        </a>
    </article>
</template>

<script setup lang="ts">
/**
 * 基础卡片组件
 * 
 * 用于展示友情链接和项目信息的通用卡片组件。
 * 
 * SEO 说明：
 * - 使用 Schema.org 微数据（Person/CreativeWork）
 * - 外部链接添加安全属性
 * - 语义化的 article/h3/p 结构
 */

import type { CardType } from '~/types'

// ==================== Props 定义 ====================

interface Props {
    /** 卡片标题 */
    title: string
    /** 卡片描述 */
    description: string
    /** 图标路径或 URL */
    icon: string
    /** 链接地址（可选，# 表示无链接） */
    link?: string
    /** 
     * 卡片类型
     * - friend: 友情链接卡片（圆形头像）
     * - project: 项目卡片（方形图标）
     */
    type?: CardType
}

const props = withDefaults(defineProps<Props>(), {
    link: '#',
    type: 'friend',
})

// ==================== 计算属性 ====================

/**
 * 计算图标路径
 * 如果是完整 URL 则直接使用，否则添加 /assets/ 前缀
 */
const iconPath = computed(() => {
    if (props.icon.startsWith('http')) {
        return props.icon
    }
    return `/assets/${props.icon}`
})

/**
 * 计算图标类名
 * 根据卡片类型应用不同样式
 */
const iconClass = computed(() => [
    'card-icon',
    props.type === 'friend'
        ? 'card-icon--friend'
        : 'card-icon--project',
])

/**
 * 检查是否有有效链接
 */
const hasValidLink = computed(() => {
    return props.link && props.link !== '#'
})

// ==================== 方法 ====================

/**
 * 处理卡片点击事件
 * 如果有有效链接，在新窗口打开
 */
function handleClick(): void {
    if (hasValidLink.value) {
        window.open(props.link, '_blank', 'noopener,noreferrer')
    }
}
</script>

<style scoped>
/* ==================== 卡片容器样式 ==================== */

.base-card {
    /* 尺寸 - 固定宽度确保对齐 */
    width: 300px;
    max-width: 100%;
    min-height: var(--card-min-height);
    padding: var(--card-padding);

    /* 外观 */
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-card);

    /* 布局 */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    gap: 12px;

    /* 文本处理 */
    word-break: break-word;
    white-space: pre-wrap;

    /* 过渡动画 */
    transition: var(--transition-default);
}

/* ==================== 可点击卡片样式 ==================== */

.base-card--clickable {
    cursor: pointer;
}

/* ==================== 卡片悬停效果 ==================== */

.base-card:hover {
    background: var(--bg-card-hover);
    border-color: var(--accent-color);
    box-shadow: var(--shadow-card-hover);
    transform: translateY(-4px);
}

/* ==================== 卡片焦点效果（无障碍访问） ==================== */

.base-card:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: var(--shadow-card-hover);
}

/* ==================== 卡片点击效果 ==================== */

.base-card:active {
    transform: translateY(-2px);
}

/* ==================== 角落装饰 ==================== */

.card-corner {
    position: absolute;
    width: 14px;
    height: 14px;
    pointer-events: none;
    opacity: 0.5;
    transition: opacity var(--transition-fast);
}

.base-card:hover .card-corner {
    opacity: 1;
}

.card-corner--tl {
    top: 12px;
    left: 12px;
    border-top: 2px solid var(--accent-color);
    border-left: 2px solid var(--accent-color);
}

.card-corner--tr {
    top: 12px;
    right: 12px;
    border-top: 2px solid var(--accent-color);
    border-right: 2px solid var(--accent-color);
}

.card-corner--bl {
    bottom: 12px;
    left: 12px;
    border-bottom: 2px solid var(--accent-color);
    border-left: 2px solid var(--accent-color);
}

.card-corner--br {
    bottom: 12px;
    right: 12px;
    border-bottom: 2px solid var(--accent-color);
    border-right: 2px solid var(--accent-color);
}

/* ==================== 顶部标签 ==================== */

.card-label {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
}

.label-text {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    letter-spacing: var(--letter-spacing-wide);
}

.label-status {
    font-size: 8px;
    color: var(--text-tertiary);
}

.label-status--active {
    color: var(--accent-color);
    animation: pulse-glow 2s ease-in-out infinite;
}

/* ==================== 图标容器 ==================== */

.card-icon-container {
    position: relative;
    width: calc(var(--card-icon-size) + 20px);
    height: calc(var(--card-icon-size) + 20px);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
}

/* ==================== 图标光效 ==================== */

.icon-glow {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, var(--accent-color-subtle) 0%, transparent 70%);
    border-radius: 50%;
    opacity: 0;
    transition: opacity var(--transition-default);
}

.base-card:hover .icon-glow {
    opacity: 1;
}

/* ==================== 卡片图标基础样式 ==================== */

.card-icon {
    position: relative;
    width: var(--card-icon-size);
    height: var(--card-icon-size);
    object-fit: cover;
    z-index: 2;
    transition: var(--transition-default);
}

/* ==================== 友情链接图标样式 ==================== */

.card-icon--friend {
    border-radius: var(--radius-full);
    border: 2px solid var(--accent-color);
    box-shadow: var(--glow-sm);
}

.base-card:hover .card-icon--friend {
    box-shadow: var(--glow-md);
}

/* ==================== 项目图标样式 ==================== */

.card-icon--project {
    border-radius: var(--radius-md);
    border: none;
    filter: brightness(0.9);
}

.base-card:hover .card-icon--project {
    filter: brightness(1) drop-shadow(0 0 10px var(--accent-color-glow));
}

/* ==================== 扫描环 ==================== */

.icon-ring {
    position: absolute;
    width: calc(var(--card-icon-size) + 16px);
    height: calc(var(--card-icon-size) + 16px);
    border: 1px solid var(--border-primary);
    border-radius: 50%;
    opacity: 0;
    transition: opacity var(--transition-default);
}

.base-card:hover .icon-ring {
    opacity: 1;
    animation: spin 10s linear infinite;
}

.icon-ring::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background: var(--accent-color);
    border-radius: 50%;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* ==================== 卡片标题样式 ==================== */

.card-title {
    font-size: var(--font-size-2xl);
    margin: 0;
    font-weight: 600;
    color: var(--accent-color);
    text-align: center;
    letter-spacing: var(--letter-spacing);
}

/* ==================== 卡片描述样式 ==================== */

.card-description {
    color: var(--text-secondary);
    font-size: var(--font-size-sm);
    margin: 0;
    text-align: center;
    line-height: 1.6;
    flex: 1;
}

/* ==================== 操作指示 ==================== */

.card-action {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: auto;
    padding-top: 12px;
    opacity: 0;
    transform: translateY(10px);
    transition: var(--transition-default);
}

.base-card:hover .card-action {
    opacity: 1;
    transform: translateY(0);
}

.action-line {
    width: 20px;
    height: 1px;
    background: var(--accent-color);
}

.action-text {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--accent-color);
    letter-spacing: var(--letter-spacing);
}

.action-icon {
    color: var(--accent-color);
    font-size: var(--font-size-sm);
}

/* ==================== 隐藏链接样式 ==================== */

.card-link {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0;
}

/* ==================== 视觉隐藏（仅屏幕阅读器可见） ==================== */

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}


</style>
