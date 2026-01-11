<!--
  关于我页面组件 - 灵阁 LingLoft
  
  视觉风格：明日方舟 / 战术UI / 未来舰队控制台
  
  功能：
  - 展示团队标签
  - 展示团队介绍内容（终端风格）
  - 提供导航按钮
  
  SEO 优化：
  - 使用语义化 HTML 标签（article, section, ul）
  - 添加 ARIA 标签提升无障碍访问性
  - 使用 itemscope/itemprop 添加微数据
  
  使用示例：
  <AboutPage />
-->

<template>
    <PageSection page-id="关于我" title="关于我们">
        <!-- 团队介绍文章 -->
        <article class="about-article" itemscope itemtype="https://schema.org/Organization" aria-label="关于灵阁团队的介绍">
            
            <!-- 涉猎领域按钮 -->
            <section class="domains-section" aria-label="涉猎领域">
                <button class="domains-trigger" @click="showDomainsModal = true" aria-haspopup="dialog">
                    <span class="trigger-icon" aria-hidden="true">◆</span>
                    <span class="trigger-text">查看涉猎领域</span>
                    <span class="trigger-arrow" aria-hidden="true">→</span>
                </button>
            </section>

            <!-- 涉猎领域弹窗 -->
            <Teleport to="body">
                <Transition name="modal">
                    <div v-if="showDomainsModal" class="modal-overlay" @click.self="showDomainsModal = false">
                        <div class="modal-content" role="dialog" aria-labelledby="modal-title" aria-modal="true">
                            <!-- 弹窗角落装饰 -->
                            <div class="modal-corner modal-corner--tl" aria-hidden="true" />
                            <div class="modal-corner modal-corner--tr" aria-hidden="true" />
                            <div class="modal-corner modal-corner--bl" aria-hidden="true" />
                            <div class="modal-corner modal-corner--br" aria-hidden="true" />
                            
                            <!-- 弹窗头部 -->
                            <div class="modal-header">
                                <h3 id="modal-title" class="modal-title">// 涉猎领域</h3>
                                <button class="modal-close" @click="showDomainsModal = false" aria-label="关闭">
                                    ✕
                                </button>
                            </div>
                            
                            <!-- 领域列表 -->
                            <ul class="domains-list" role="list">
                                <li v-for="(domain, index) in ABOUT_DOMAINS" :key="index" class="domain-item" itemprop="knowsAbout">
                                    <span class="domain-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
                                    <span class="domain-name">{{ domain }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Transition>
            </Teleport>

            <!-- 终端风格介绍内容 -->
            <section class="terminal-section" aria-label="团队介绍">
                <div class="terminal-window">
                    <!-- 终端头部 -->
                    <div class="terminal-header" aria-hidden="true">
                        <div class="terminal-dots">
                            <span class="dot dot--red" />
                            <span class="dot dot--yellow" />
                            <span class="dot dot--green" />
                        </div>
                        <span class="terminal-title">lingloft.readme</span>
                        <div class="terminal-status">
                            <span class="status-indicator" />
                            ONLINE
                        </div>
                    </div>
                    
                    <!-- 终端内容 -->
                    <div class="terminal-content">
                        <div class="terminal-line" v-for="(line, index) in ABOUT_CONTENT" :key="index">
                            <span v-if="line" class="line-prefix" aria-hidden="true">></span>
                            <p :class="getLineClass(line, index)" :itemprop="index === 0 ? 'name' : (index === 2 ? 'description' : undefined)">
                                {{ line || '&nbsp;' }}
                            </p>
                        </div>
                        
                        <!-- 光标 -->
                        <div class="terminal-cursor" aria-hidden="true">
                            <span class="cursor-prefix">></span>
                            <span class="cursor-blink">_</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 数据面板 - 仅桌面端显示 -->
            <section class="data-panel" aria-hidden="true">
                <div class="data-row">
                    <span class="data-label">FOUNDED</span>
                    <span class="data-value">2024</span>
                </div>
                <div class="data-row">
                    <span class="data-label">STATUS</span>
                    <span class="data-value data-value--active">ACTIVE</span>
                </div>
                <div class="data-row">
                    <span class="data-label">DOMAINS</span>
                    <span class="data-value">{{ ABOUT_DOMAINS.length }}</span>
                </div>
            </section>
        </article>

        <!-- 导航按钮 -->
        <template #buttons>
            <nav class="about-nav" role="navigation" aria-label="页面导航">
                <BaseButton variant="primary" @click="switchPage('我的项目')" aria-label="查看项目">
                    {{ BUTTON_TEXTS.projects }}
                </BaseButton>
                <BaseButton variant="secondary" @click="switchPage('主页')" aria-label="返回首页">
                    {{ BUTTON_TEXTS.home }}
                </BaseButton>
            </nav>
        </template>
    </PageSection>
</template>

<script setup lang="ts">
/**
 * 关于我页面组件
 *
 * 展示团队介绍信息，包括：
 * - 涉猎领域（弹窗展示）
 * - 终端风格的详细介绍
 * - 数据面板（仅桌面端）
 *
 * SEO 说明：
 * - 使用 Schema.org Organization 微数据
 * - 语义化的 article/section 结构
 */

import { ABOUT_DOMAINS, ABOUT_CONTENT, BUTTON_TEXTS } from '~/config/site.config'

// ==================== Composables ====================

const { switchPage } = usePageNavigation()

// ==================== 响应式状态 ====================

const showDomainsModal = ref(false)

// ==================== 方法 ====================

/**
 * 获取行的样式类
 */
function getLineClass(line: string, index: number): string {
    if (!line) return 'line-empty'
    if (line.includes('灵阁') || line.includes('LingLoft')) return 'line-highlight'
    if (line.includes('创新')) return 'line-accent'
    return 'line-normal'
}
</script>

<style scoped>
/* ==================== 文章容器 ==================== */

.about-article {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 700px;
    gap: 30px;
}

/* ==================== 涉猎领域按钮 ==================== */

.domains-section {
    width: 100%;
    display: flex;
    justify-content: center;
}

.domains-trigger {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 28px;
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    transition: var(--transition-default);
    cursor: pointer;
    color: var(--text-primary);
    font-size: var(--font-size-md);
}

.domains-trigger:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-card-hover);
    border-color: var(--accent-color);
}

.trigger-icon {
    color: var(--accent-color);
    font-size: var(--font-size-sm);
}

.trigger-text {
    font-family: var(--font-family-mono);
    letter-spacing: var(--letter-spacing);
}

.trigger-arrow {
    color: var(--accent-color);
    transition: transform var(--transition-fast);
}

.domains-trigger:hover .trigger-arrow {
    transform: translateX(4px);
}

/* ==================== 弹窗遮罩 ==================== */

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

/* ==================== 弹窗内容 ==================== */

.modal-content {
    position: relative;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card-hover);
    max-width: 400px;
    width: 100%;
    padding: 24px;
}

/* ==================== 弹窗角落装饰 ==================== */

.modal-corner {
    position: absolute;
    width: 16px;
    height: 16px;
    pointer-events: none;
}

.modal-corner--tl {
    top: 8px;
    left: 8px;
    border-top: 2px solid var(--accent-color);
    border-left: 2px solid var(--accent-color);
}

.modal-corner--tr {
    top: 8px;
    right: 8px;
    border-top: 2px solid var(--accent-color);
    border-right: 2px solid var(--accent-color);
}

.modal-corner--bl {
    bottom: 8px;
    left: 8px;
    border-bottom: 2px solid var(--accent-color);
    border-left: 2px solid var(--accent-color);
}

.modal-corner--br {
    bottom: 8px;
    right: 8px;
    border-bottom: 2px solid var(--accent-color);
    border-right: 2px solid var(--accent-color);
}

/* ==================== 弹窗头部 ==================== */

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.modal-title {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-lg);
    color: var(--accent-color);
    margin: 0;
    letter-spacing: var(--letter-spacing);
}

.modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-sm);
    color: var(--text-tertiary);
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: var(--transition-default);
}

.modal-close:hover {
    color: var(--accent-color);
    border-color: var(--accent-color);
    background: var(--bg-card-hover);
}

/* ==================== 领域列表 ==================== */

.domains-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.domain-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 12px 16px;
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-md);
    transition: var(--transition-default);
}

.domain-item:hover {
    border-color: var(--accent-color);
    background: var(--bg-card-hover);
}

.domain-index {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--accent-color);
    opacity: 0.6;
}

.domain-name {
    font-size: var(--font-size-md);
    color: var(--text-primary);
}

/* ==================== 弹窗动画 ==================== */

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
    transform: scale(0.9);
    opacity: 0;
}

/* ==================== 终端区域 ==================== */

.terminal-section {
    width: 100%;
}

.terminal-window {
    background: var(--bg-secondary);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-card);
}

/* ==================== 终端头部 ==================== */

.terminal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: var(--bg-tertiary);
    border-bottom: 1px solid var(--border-secondary);
}

.terminal-dots {
    display: flex;
    gap: 8px;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.dot--red {
    background: #ff5f57;
}

.dot--yellow {
    background: #ffbd2e;
}

.dot--green {
    background: #28ca42;
}

.terminal-title {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    letter-spacing: var(--letter-spacing);
}

.terminal-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--accent-color);
}

.terminal-status .status-indicator {
    width: 6px;
    height: 6px;
    background: var(--accent-color);
    border-radius: 50%;
    animation: pulse-glow 2s ease-in-out infinite;
}

/* ==================== 终端内容 ==================== */

.terminal-content {
    padding: 20px;
    text-align: center;
    white-space: pre-wrap;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.terminal-line {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 8px;
    margin-bottom: 4px;
}

.line-prefix {
    color: var(--accent-color);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    flex-shrink: 0;
}

.terminal-line p {
    margin: 0;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    line-height: 1.8;
    white-space: pre-wrap;
}

/* 行样式变体 */
.line-empty {
    height: 1.8em;
}

.line-highlight {
    color: var(--text-primary);
    font-weight: 600;
}

.line-accent {
    color: var(--accent-color);
    font-weight: 500;
}

.line-normal {
    color: var(--text-secondary);
}

/* ==================== 光标 ==================== */

.terminal-cursor {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
}

.cursor-prefix {
    color: var(--accent-color);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
}

.cursor-blink {
    color: var(--accent-color);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    animation: blink-cursor 1s step-end infinite;
}

/* ==================== 数据面板 ==================== */

.data-panel {
    display: flex;
    gap: 24px;
    padding: 16px 24px;
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-md);
}

.data-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.data-label {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    letter-spacing: var(--letter-spacing);
}

.data-value {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-md);
    color: var(--text-primary);
    font-weight: 600;
}

.data-value--active {
    color: var(--accent-color);
}

/* ==================== 导航样式 ==================== */

.about-nav {
    display: contents;
}

/* ==================== 响应式调整 ==================== */

@media (max-width: 768px) {
    .terminal-header {
        padding: 10px 12px;
    }

    .terminal-content {
        padding: 16px;
    }

    /* 手机端隐藏数据面板 */
    .data-panel {
        display: none;
    }
}

@media (max-width: 480px) {
    .domains-trigger {
        padding: 12px 20px;
        font-size: var(--font-size-sm);
    }

    .terminal-dots {
        display: none;
    }

    .modal-content {
        padding: 20px;
    }
}
</style>
