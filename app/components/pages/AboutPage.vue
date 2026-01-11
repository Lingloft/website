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
    <PageSection page-id="关于我" title="舰队档案">
        <!-- 团队介绍文章 -->
        <article class="about-article" itemscope itemtype="https://schema.org/Organization" aria-label="关于灵阁团队的介绍">
            
            <!-- 技能标签区域 -->
            <section class="tags-section" aria-label="核心能力">
                <div class="tags-header">
                    <span class="tags-label">// CORE_CAPABILITIES</span>
                </div>
                <ul class="tags" role="list">
                    <li v-for="(tag, index) in ABOUT_TAGS" :key="index" class="tag" itemprop="knowsAbout">
                        <span class="tag-icon" aria-hidden="true">◆</span>
                        {{ tag }}
                    </li>
                </ul>
            </section>

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
                        <span class="terminal-title">lingloft_archive.sys</span>
                        <div class="terminal-status">
                            <span class="status-indicator" />
                            CONNECTED
                        </div>
                    </div>
                    
                    <!-- 终端内容 -->
                    <div class="terminal-content">
                        <div class="terminal-line" v-for="(line, index) in ABOUT_CONTENT" :key="index">
                            <span v-if="line" class="line-prefix" aria-hidden="true">></span>
                            <p :class="getLineClass(line, index)" :itemprop="index === 2 ? 'name' : (index === 3 ? 'description' : undefined)">
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

            <!-- 数据面板 -->
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
                    <span class="data-label">SECTOR</span>
                    <span class="data-value">TECH-7G</span>
                </div>
            </section>
        </article>

        <!-- 导航按钮 -->
        <template #buttons>
            <nav class="about-nav" role="navigation" aria-label="页面导航">
                <BaseButton variant="primary" @click="switchPage('我的项目')" aria-label="查看作战系统">
                    {{ BUTTON_TEXTS.projects }}
                </BaseButton>
                <BaseButton variant="secondary" @click="switchPage('主页')" aria-label="返回指挥中心">
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
 * - 核心能力标签
 * - 终端风格的详细介绍
 * - 数据面板
 * 
 * SEO 说明：
 * - 使用 Schema.org Organization 微数据
 * - 语义化的 article/section 结构
 */

import { ABOUT_TAGS, ABOUT_CONTENT, BUTTON_TEXTS } from '~/config/site.config'

// ==================== Composables ====================

const { switchPage } = usePageNavigation()

// ==================== 方法 ====================

/**
 * 获取行的样式类
 */
function getLineClass(line: string, index: number): string {
    if (!line) return 'line-empty'
    if (line.startsWith('[') || line.startsWith('//')) return 'line-system'
    if (line.includes('灵阁') || line.includes('LingLoft')) return 'line-highlight'
    if (line.includes('：') || line.includes(':')) return 'line-label'
    if (line.includes('|')) return 'line-data'
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

/* ==================== 标签区域 ==================== */

.tags-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tags-header {
    margin-bottom: 16px;
}

.tags-label {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    letter-spacing: var(--letter-spacing-wide);
}

/* ==================== 标签容器 ==================== */

.tags {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    padding: 0;
    list-style: none;
}

/* ==================== 单个标签样式 ==================== */

.tag {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: var(--bg-card);
    border: 1px solid var(--border-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    transition: var(--transition-default);
    font-size: var(--font-size-md);
    color: var(--text-primary);
}

.tag-icon {
    color: var(--accent-color);
    font-size: var(--font-size-xs);
}

.tag:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-card-hover);
    border-color: var(--accent-color);
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
    text-align: left;
    white-space: pre-wrap;
}

.terminal-line {
    display: flex;
    align-items: flex-start;
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

.line-system {
    color: var(--accent-color);
}

.line-highlight {
    color: var(--text-primary);
    font-weight: 600;
}

.line-label {
    color: var(--text-secondary);
}

.line-data {
    color: var(--accent-color-dim);
    letter-spacing: var(--letter-spacing);
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

    .data-panel {
        flex-direction: column;
        gap: 16px;
        padding: 16px;
    }

    .data-row {
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
}

@media (max-width: 480px) {
    .tags {
        flex-direction: column;
    }

    .tag {
        width: 100%;
        justify-content: center;
    }

    .terminal-dots {
        display: none;
    }
}
</style>
