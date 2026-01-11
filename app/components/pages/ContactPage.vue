<!--
  联系方式页面组件 - 灵阁 LingLoft
  
  视觉风格：明日方舟 / 战术UI / 未来舰队控制台
  
  功能：
  - 展示联系方式列表（通讯频道风格）
  - 支持点击打开链接或复制文本
  - 从 JSON 数据加载联系方式
  
  SEO 优化：
  - 使用语义化 HTML 标签（section, address, ul）
  - 添加 ARIA 标签提升无障碍访问性
  - 使用 address 标签标记联系信息
  
  使用示例：
  <ContactPage />
-->

<template>
    <PageSection page-id="联系方式" title="通讯频道">
        <!-- 联系方式区域 -->
        <address class="contacts-section" aria-label="联系方式列表">
            <!-- 区域标签 -->
            <div class="section-label" aria-hidden="true">
                <span class="label-prefix">//</span>
                <span class="label-text">COMM_CHANNELS</span>
                <span class="label-status">
                    <span class="status-dot" />
                    ONLINE
                </span>
            </div>

            <!-- 联系方式列表 -->
            <ul class="contacts-list" role="list">
                <li 
                    v-for="(contact, index) in contactsData" 
                    :key="index" 
                    class="contact-item"
                    @click="handleContactClick(contact)" 
                    role="button" 
                    tabindex="0"
                    :aria-label="`${contact.类型}: ${contact.文本}${contact.链接 !== '#' ? '，点击访问' : '，点击复制'}`"
                    @keydown.enter="handleContactClick(contact)" 
                    @keydown.space.prevent="handleContactClick(contact)"
                >
                    <!-- 频道指示器 -->
                    <div class="channel-indicator" aria-hidden="true">
                        <span class="channel-line" />
                        <span class="channel-dot" />
                    </div>

                    <!-- 联系方式图标 -->
                    <div class="contact-icon-wrapper">
                        <img 
                            :src="`/assets/${contact.图标}`" 
                            :alt="`${contact.类型}图标`" 
                            class="contact-icon" 
                            width="36"
                            height="36" 
                            loading="lazy" 
                        />
                    </div>

                    <!-- 联系方式信息 -->
                    <div class="contact-info">
                        <span class="contact-type">{{ contact.类型 }}</span>
                        <span class="contact-text">{{ contact.文本 }}</span>
                    </div>

                    <!-- 操作指示 -->
                    <div class="contact-action" aria-hidden="true">
                        <span class="action-icon">{{ contact.链接 !== '#' ? '↗' : '⎘' }}</span>
                        <span class="action-text">{{ contact.链接 !== '#' ? 'CONNECT' : 'COPY' }}</span>
                    </div>
                </li>
            </ul>

            <!-- 提示信息 -->
            <div class="hint-text" aria-hidden="true">
                <span class="hint-icon">◆</span>
                <span>点击频道建立连接或复制信息</span>
            </div>
        </address>

        <!-- 导航按钮 -->
        <template #buttons>
            <nav class="contact-nav" role="navigation" aria-label="页面导航">
                <BaseButton variant="secondary" @click="switchPage('友情链接')" aria-label="返回星际联盟">
                    {{ BUTTON_TEXTS.back }}
                </BaseButton>
            </nav>
        </template>
    </PageSection>
</template>

<script setup lang="ts">
/**
 * 联系方式页面组件
 * 
 * 展示各种联系方式，包括：
 * - QQ
 * - 微信
 * - 哔哩哔哩
 * - GitHub
 * 
 * SEO 说明：
 * - 使用 address 标签标记联系信息（符合 HTML5 语义）
 * - 添加键盘导航支持（无障碍访问）
 */

import type { ContactData } from '~/types'
import { openLinkOrCopy } from '~/utils/clipboard'
import { BUTTON_TEXTS } from '~/config/site.config'

// ==================== Composables ====================

const { switchPage } = usePageNavigation()
const { contactsData, fetchData } = useSiteData()

// ==================== 生命周期 ====================

/**
 * 组件挂载时获取数据
 */
onMounted(() => {
    fetchData()
})

// ==================== 方法 ====================

/**
 * 处理联系方式点击事件
 * 如果有链接则打开，否则复制文本到剪贴板
 * 
 * @param contact - 联系方式数据
 */
async function handleContactClick(contact: ContactData): Promise<void> {
    await openLinkOrCopy(contact.链接, contact.文本)
}
</script>

<style scoped>
/* ==================== 联系方式区域容器 ==================== */

.contacts-section {
    width: 100%;
    max-width: 500px;
    font-style: normal;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* ==================== 区域标签 ==================== */

.section-label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 30px;
    padding: 8px 16px;
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-md);
}

.label-prefix {
    color: var(--accent-color);
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
}

.label-text {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    letter-spacing: var(--letter-spacing-wide);
}

.label-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--accent-color);
    margin-left: 8px;
}

.status-dot {
    width: 6px;
    height: 6px;
    background: var(--accent-color);
    border-radius: 50%;
    animation: pulse-glow 2s ease-in-out infinite;
}

/* ==================== 联系方式列表容器 ==================== */

.contacts-list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    padding: 0;
    margin: 0;
    gap: 12px;
    list-style: none;
}

/* ==================== 单个联系方式项 ==================== */

.contact-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: var(--transition-default);

    /* 允许文本选择 */
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
}

/* 联系方式悬停效果 */
.contact-item:hover {
    background: var(--bg-card-hover);
    border-color: var(--accent-color);
    box-shadow: var(--shadow-card-hover);
    transform: translateX(4px);
}

/* 联系方式焦点效果（无障碍访问） */
.contact-item:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: var(--shadow-card-hover);
}

/* ==================== 频道指示器 ==================== */

.channel-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.channel-line {
    width: 2px;
    height: 20px;
    background: linear-gradient(180deg, transparent, var(--accent-color));
}

.channel-dot {
    width: 8px;
    height: 8px;
    background: var(--accent-color);
    border-radius: 50%;
    box-shadow: var(--glow-sm);
}

.contact-item:hover .channel-dot {
    animation: pulse-glow 1s ease-in-out infinite;
}

/* ==================== 联系方式图标 ==================== */

.contact-icon-wrapper {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-md);
}

.contact-icon {
    width: var(--contact-icon-size);
    height: var(--contact-icon-size);
    filter: brightness(0.9);
    transition: var(--transition-fast);
}

.contact-item:hover .contact-icon {
    filter: brightness(1) drop-shadow(0 0 8px var(--accent-color-glow));
}

/* ==================== 联系方式信息 ==================== */

.contact-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
}

.contact-type {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing);
}

.contact-text {
    font-size: var(--font-size-lg);
    color: var(--text-primary);
    font-weight: 600;
}

/* ==================== 操作指示 ==================== */

.contact-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    opacity: 0;
    transform: translateX(-10px);
    transition: var(--transition-fast);
}

.contact-item:hover .contact-action {
    opacity: 1;
    transform: translateX(0);
}

.action-icon {
    font-size: var(--font-size-lg);
    color: var(--accent-color);
}

.action-text {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--accent-color);
    letter-spacing: var(--letter-spacing);
}

/* ==================== 提示信息 ==================== */

.hint-text {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    opacity: 0.6;
}

.hint-icon {
    color: var(--accent-color-dim);
    font-size: var(--font-size-xs);
}

/* ==================== 导航样式 ==================== */

.contact-nav {
    display: contents;
}

/* ==================== 响应式调整 ==================== */

@media (max-width: 768px) {
    .contact-item {
        padding: 14px 16px;
        gap: 12px;
    }

    .channel-indicator {
        display: none;
    }

    .contact-icon-wrapper {
        width: 44px;
        height: 44px;
    }

    .contact-action {
        opacity: 1;
        transform: translateX(0);
    }
}

@media (max-width: 480px) {
    .section-label {
        flex-wrap: wrap;
        justify-content: center;
    }

    .label-status {
        margin-left: 0;
    }

    .contact-text {
        font-size: var(--font-size-md);
    }
}
</style>
