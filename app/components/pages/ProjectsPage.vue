<!--
  我的项目页面组件 - 灵阁 LingLoft
  
  视觉风格：明日方舟 / 战术UI / 未来舰队控制台
  
  功能：
  - 展示项目卡片列表（作战系统风格）
  - 从 JSON 数据加载项目信息
  - 提供导航按钮
  
  SEO 优化：
  - 使用语义化 HTML 标签（section, ul, li, article）
  - 添加 ARIA 标签提升无障碍访问性
  - 使用 Schema.org CreativeWork 微数据
  
  使用示例：
  <ProjectsPage />
-->

<template>
  <PageSection page-id="我的项目" title="作战系统">
    <!-- 项目展示区域 -->
    <section class="projects-section" aria-label="项目作品列表">
      <!-- 区域标签 -->
      <div class="section-label" aria-hidden="true">
        <span class="label-prefix">//</span>
        <span class="label-text">DEPLOYED_SYSTEMS</span>
        <span class="label-count">[{{ projectsData.length }}]</span>
      </div>

      <!-- 项目卡片列表 -->
      <ul class="projects-grid" role="list">
        <li v-for="(project, index) in projectsData" :key="index" class="project-item" itemscope
          itemtype="https://schema.org/CreativeWork">
          <BaseCard 
            :title="project.项目名" 
            :description="project.简介" 
            :icon="project.图标" 
            :link="project.网址" 
            type="project"
            :aria-label="`查看项目：${project.项目名}`" 
          />
        </li>
      </ul>

      <!-- 空状态 -->
      <div v-if="projectsData.length === 0" class="empty-state">
        <span class="empty-icon">◇</span>
        <p class="empty-text">// NO_SYSTEMS_DEPLOYED</p>
      </div>
    </section>

    <!-- 导航按钮 -->
    <template #buttons>
      <nav class="projects-nav" role="navigation" aria-label="页面导航">
        <BaseButton variant="secondary" @click="switchPage('关于我')" aria-label="返回舰队档案">
          {{ BUTTON_TEXTS.back }}
        </BaseButton>
      </nav>
    </template>
  </PageSection>
</template>

<script setup lang="ts">
/**
 * 我的项目页面组件
 * 
 * 展示团队项目作品，包括：
 * - 项目图标
 * - 项目名称
 * - 项目简介
 * - 项目链接
 * 
 * SEO 说明：
 * - 使用 Schema.org CreativeWork 微数据
 * - 语义化的 ul/li 列表结构
 */

import { BUTTON_TEXTS } from '~/config/site.config'

// ==================== Composables ====================

const { switchPage } = usePageNavigation()
const { projectsData, fetchData } = useSiteData()

// ==================== 生命周期 ====================

/**
 * 组件挂载时获取数据
 */
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
/* ==================== 项目区域容器 ==================== */

.projects-section {
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

.label-count {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--accent-color);
}

/* ==================== 项目卡片网格布局 ==================== */

.projects-grid {
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

/* ==================== 项目列表项 ==================== */

.project-item {
  display: flex;
}

/* ==================== 空状态 ==================== */

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
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

/* ==================== 导航样式 ==================== */

.projects-nav {
  display: contents;
}

/* ==================== 响应式调整 ==================== */

@media (max-width: 768px) {
  .projects-grid {
    gap: 16px;
  }

  .section-label {
    padding: 6px 12px;
  }
}
</style>
