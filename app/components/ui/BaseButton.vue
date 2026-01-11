<!--
  基础按钮组件 - 灵阁 LingLoft
  
  视觉风格：明日方舟 / 战术UI / 未来舰队控制台
  
  功能：
  - 提供两种按钮样式（主要/次要）
  - 战术风格的发光边框效果
  - 支持点击事件
  - 统一的悬停和点击动画效果
  
  Props:
  - variant: 按钮变体 ('primary' | 'secondary')
  
  使用示例：
  <BaseButton variant="primary" @click="handleClick">主要按钮</BaseButton>
  <BaseButton variant="secondary" @click="handleClick">次要按钮</BaseButton>
-->

<template>
    <button :class="buttonClass" @click="$emit('click', $event)">
        <!-- 按钮内容 -->
        <span class="button-content">
            <span class="button-icon" aria-hidden="true">◆</span>
            <span class="button-text"><slot /></span>
            <span class="button-icon" aria-hidden="true">◆</span>
        </span>
        
        <!-- 发光边框效果 -->
        <span class="button-glow" aria-hidden="true" />
        
        <!-- 角落装饰 -->
        <span class="button-corner button-corner--tl" aria-hidden="true" />
        <span class="button-corner button-corner--br" aria-hidden="true" />
    </button>
</template>

<script setup lang="ts">
import type { ButtonVariant } from '~/types'

// ==================== Props 定义 ====================

interface Props {
    /** 
     * 按钮变体样式
     * - primary: 主要按钮（强调色边框，发光效果）
     * - secondary: 次要按钮（淡色边框，低调效果）
     */
    variant?: ButtonVariant
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
})

// ==================== Emits 定义 ====================

defineEmits<{
    /** 点击事件 */
    click: [event: MouseEvent]
}>()

// ==================== 计算属性 ====================

/**
 * 计算按钮类名
 * 根据 variant 属性生成对应的 CSS 类
 */
const buttonClass = computed(() => [
    'base-button',
    `base-button--${props.variant}`,
])
</script>

<style scoped>
/* ==================== 按钮基础样式 ==================== */

.base-button {
    /* 定位 */
    position: relative;
    
    /* 尺寸 */
    min-width: var(--button-width);
    height: var(--button-height);
    padding: var(--button-padding);
    margin: 10px 0;

    /* 外观 */
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-button);

    /* 文字 */
    color: var(--text-primary);
    font-size: var(--font-size-md);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wide);

    /* 交互 */
    cursor: pointer;
    outline: none;
    overflow: hidden;

    /* 过渡动画 */
    transition: var(--transition-default);
}

/* ==================== 按钮内容 ==================== */

.button-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    z-index: 2;
}

.button-icon {
    font-size: var(--font-size-xs);
    color: var(--accent-color);
    transition: transform var(--transition-fast);
}

.button-text {
    transition: var(--transition-fast);
}

/* ==================== 发光边框效果 ==================== */

.button-glow {
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: linear-gradient(
        135deg,
        var(--accent-color) 0%,
        transparent 40%,
        transparent 60%,
        var(--accent-color) 100%
    );
    background-size: 200% 200%;
    opacity: 0;
    z-index: 0;
    transition: opacity var(--transition-default);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    padding: 1px;
}

/* ==================== 角落装饰 ==================== */

.button-corner {
    position: absolute;
    width: 8px;
    height: 8px;
    pointer-events: none;
    opacity: 0.6;
    transition: opacity var(--transition-fast);
}

.button-corner--tl {
    top: 8px;
    left: 10px;
    border-top: 1px solid var(--accent-color);
    border-left: 1px solid var(--accent-color);
}

.button-corner--br {
    bottom: 8px;
    right: 10px;
    border-bottom: 1px solid var(--accent-color);
    border-right: 1px solid var(--accent-color);
}

/* ==================== 悬停效果 ==================== */

.base-button:hover {
    background: var(--bg-card-hover);
    border-color: var(--accent-color);
    box-shadow: var(--shadow-button-hover);
    transform: translateY(-2px);
}

.base-button:hover .button-glow {
    opacity: 1;
    animation: border-flow 3s linear infinite;
}

.base-button:hover .button-icon {
    transform: rotate(45deg);
}

.base-button:hover .button-corner {
    opacity: 1;
}

/* ==================== 焦点效果 ==================== */

.base-button:focus {
    border-color: var(--accent-color);
    box-shadow: var(--shadow-button-hover);
}

/* ==================== 点击效果 ==================== */

.base-button:active {
    transform: translateY(0);
    box-shadow: var(--shadow-button);
}

/* ==================== 主要按钮样式 ==================== */

.base-button--primary {
    background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-tertiary) 100%);
    border-color: var(--accent-color);
}

.base-button--primary .button-icon {
    color: var(--accent-color);
}

.base-button--primary:hover {
    background: linear-gradient(135deg, var(--bg-card-hover) 0%, var(--bg-tertiary) 100%);
}

/* ==================== 次要按钮样式 ==================== */

.base-button--secondary {
    background: var(--bg-card);
    border-color: var(--border-secondary);
    box-shadow: none;
}

.base-button--secondary .button-icon {
    color: var(--text-tertiary);
}

.base-button--secondary .button-corner {
    opacity: 0.3;
}

.base-button--secondary:hover {
    background: var(--bg-card);
    border-color: var(--accent-color-dim);
    box-shadow: var(--glow-sm);
}

.base-button--secondary:hover .button-icon {
    color: var(--accent-color);
}

/* ==================== 响应式调整 ==================== */

@media (max-width: 768px) {
    .base-button {
        min-width: 180px;
        height: 48px;
        padding: 12px 24px;
    }

    .button-icon {
        display: none;
    }
}

@media (max-width: 480px) {
    .base-button {
        min-width: 160px;
        font-size: var(--font-size-sm);
    }
}
</style>
