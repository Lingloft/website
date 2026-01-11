<!--
  友情链接页面组件 - 灵阁 LingLoft
  
  视觉风格：明日方舟 / 战术UI / 未来舰队控制台
  
  功能：
  - 展示朋友卡片列表（星际联盟风格）
  - 从 JSON 数据加载朋友信息
  - 提供导航按钮
  
  SEO 优化：
  - 使用语义化 HTML 标签（section, ul, li）
  - 添加 ARIA 标签提升无障碍访问性
  - 外部链接添加 rel="noopener noreferrer"
  
  使用示例：
  <FriendsPage />
-->

<template>
    <PageSection page-id="友情链接" title="星际联盟">
        <!-- 朋友列表区域 -->
        <section class="friends-section" aria-label="友情链接列表">
            <!-- 区域标签 -->
            <div class="section-label" aria-hidden="true">
                <span class="label-prefix">//</span>
                <span class="label-text">ALLIED_FLEETS</span>
                <span class="label-count">[{{ friendsData.length }}]</span>
            </div>

            <!-- 联盟状态栏 -->
            <div class="alliance-status" aria-hidden="true">
                <div class="status-item">
                    <span class="status-icon">◆</span>
                    <span class="status-label">ALLIANCE STATUS</span>
                    <span class="status-value status-value--active">ACTIVE</span>
                </div>
                <div class="status-divider" />
                <div class="status-item">
                    <span class="status-icon">◇</span>
                    <span class="status-label">CONNECTIONS</span>
                    <span class="status-value">{{ friendsData.length }}</span>
                </div>
            </div>

            <!-- 朋友卡片列表 -->
            <ul class="friends-grid" role="list">
                <li v-for="(friend, index) in friendsData" :key="index" class="friend-item">
                    <BaseCard 
                        :title="friend.名字" 
                        :description="friend.简介" 
                        :icon="friend.头像" 
                        :link="friend.链接"
                        type="friend" 
                        :aria-label="`访问${friend.名字}的主页`" 
                    />
                </li>
            </ul>

            <!-- 空状态 -->
            <div v-if="friendsData.length === 0" class="empty-state">
                <span class="empty-icon">◇</span>
                <p class="empty-text">// NO_ALLIED_FLEETS_DETECTED</p>
                <p class="empty-subtext">等待建立星际联盟...</p>
            </div>
        </section>

        <!-- 导航按钮 -->
        <template #buttons>
            <nav class="friends-nav" role="navigation" aria-label="页面导航">
                <BaseButton variant="primary" @click="switchPage('联系方式')" aria-label="查看通讯频道">
                    {{ BUTTON_TEXTS.contact }}
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
 * 友情链接页面组件
 * 
 * 展示朋友/合作伙伴的链接卡片，包括：
 * - 头像
 * - 名称
 * - 简介
 * - 链接
 * 
 * SEO 说明：
 * - 使用语义化的 ul/li 列表结构
 * - 外部链接自动添加安全属性
 */

import { BUTTON_TEXTS } from '~/config/site.config'

// ==================== Composables ====================

const { switchPage } = usePageNavigation()
const { friendsData, fetchData } = useSiteData()

// ==================== 生命周期 ====================

/**
 * 组件挂载时获取数据
 */
onMounted(() => {
    fetchData()
})
</script>

<style scoped>
/* ==================== 朋友区域容器 ==================== */

.friends-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* ==================== 区域标签 ==================== */

.section-label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
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

.label-count {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--accent-color);
}

/* ==================== 联盟状态栏 ==================== */

.alliance-status {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 12px 24px;
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-md);
    margin-bottom: 30px;
}

.status-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status-icon {
    color: var(--accent-color);
    font-size: var(--font-size-xs);
}

.status-label {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    letter-spacing: var(--letter-spacing);
}

.status-value {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-primary);
    font-weight: 600;
}

.status-value--active {
    color: var(--accent-color);
}

.status-divider {
    width: 1px;
    height: 20px;
    background: var(--border-secondary);
}

/* ==================== 朋友卡片网格布局 ==================== */

.friends-grid {
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    gap: 24px;
    list-style: none;
}

/* ==================== 朋友列表项 ==================== */

.friend-item {
    display: flex;
}

/* ==================== 空状态 ==================== */

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 60px 40px;
    background: var(--bg-card);
    border: 1px dashed var(--border-secondary);
    border-radius: var(--radius-lg);
}

.empty-icon {
    font-size: 48px;
    color: var(--accent-color-dim);
}

.empty-text {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-sm);
    color: var(--text-tertiary);
    letter-spacing: var(--letter-spacing);
}

.empty-subtext {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
}

/* ==================== 导航样式 ==================== */

.friends-nav {
    display: contents;
}

/* ==================== 响应式调整 ==================== */

@media (max-width: 768px) {
    .friends-grid {
        gap: 16px;
    }

    .alliance-status {
        flex-direction: column;
        gap: 12px;
        padding: 16px;
    }

    .status-divider {
        width: 100%;
        height: 1px;
    }
}

@media (max-width: 480px) {
    .section-label {
        padding: 6px 12px;
    }
}
</style>
