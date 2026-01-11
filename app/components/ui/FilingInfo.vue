<!--
  备案信息组件 - 灵阁 LingLoft
  
  视觉风格：明日方舟 / 战术UI / 未来舰队控制台
  
  功能：
  - 显示 ICP 备案信息
  - 显示公安备案信息
  - 支持点击跳转到备案查询页面
  - 战术风格的底部信息栏
  
  使用示例：
  <FilingInfo />
-->

<template>
    <footer class="filing-info" role="contentinfo">
        <!-- 装饰线 -->
        <div class="filing-decoration" aria-hidden="true">
            <span class="decoration-line" />
            <span class="decoration-dot" />
            <span class="decoration-line" />
        </div>

        <!-- 备案链接容器 -->
        <div class="filing-links">
            <!-- ICP 备案 -->
            <a :href="ICP_LINK" target="_blank" rel="noopener noreferrer" class="filing-link">
                <span class="link-prefix" aria-hidden="true">//</span>
                {{ ICP_NUMBER }}
            </a>

            <!-- 分隔符 -->
            <span class="filing-separator" aria-hidden="true">|</span>

            <!-- 公安备案 -->
            <a :href="POLICE_LINK" target="_blank" rel="noopener noreferrer" class="filing-link">
                <img :src="POLICE_ICON_PATH" alt="备案图标" class="filing-icon" width="14" height="14" />
                {{ POLICE_NUMBER }}
            </a>
        </div>

        <!-- 版权信息 -->
        <div class="copyright" aria-hidden="true">
            <span class="copyright-text">© {{ currentYear }} LINGLOFT. ALL RIGHTS RESERVED.</span>
        </div>
    </footer>
</template>

<script setup lang="ts">
import {
    ICP_NUMBER,
    ICP_LINK,
    POLICE_NUMBER,
    POLICE_LINK,
    POLICE_ICON_PATH,
} from '~/config/site.config'

// 当前年份
const currentYear = new Date().getFullYear()
</script>

<style scoped>
/* ==================== 备案信息容器 ==================== */

.filing-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: var(--z-content);
    padding: 16px 24px;
    background: var(--bg-card);
    border: 1px solid var(--border-secondary);
    border-radius: var(--radius-md);
}

/* ==================== 装饰线 ==================== */

.filing-decoration {
    display: flex;
    align-items: center;
    gap: 8px;
}

.decoration-line {
    width: 30px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-color-dim));
}

.decoration-line:last-child {
    background: linear-gradient(90deg, var(--accent-color-dim), transparent);
}

.decoration-dot {
    width: 4px;
    height: 4px;
    background: var(--accent-color);
    border-radius: 50%;
}

/* ==================== 备案链接容器 ==================== */

.filing-links {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
}

/* ==================== 备案链接样式 ==================== */

.filing-link {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-tertiary);
    letter-spacing: var(--letter-spacing);
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition-fast);
}

.link-prefix {
    color: var(--accent-color-dim);
}

/* 备案链接悬停效果 */
.filing-link:hover {
    color: var(--accent-color);
}

.filing-link:hover .link-prefix {
    color: var(--accent-color);
}

/* ==================== 分隔符 ==================== */

.filing-separator {
    color: var(--border-secondary);
    font-size: var(--font-size-xs);
}

/* ==================== 备案图标 ==================== */

.filing-icon {
    width: 14px;
    height: 14px;
    opacity: 0.6;
    transition: opacity var(--transition-fast);
}

.filing-link:hover .filing-icon {
    opacity: 1;
}

/* ==================== 版权信息 ==================== */

.copyright {
    margin-top: 4px;
}

.copyright-text {
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: var(--text-muted);
    letter-spacing: var(--letter-spacing);
}

/* ==================== 响应式调整 ==================== */

@media (max-width: 768px) {
    .filing-info {
        bottom: 40px;
        padding: 12px 16px;
        max-width: calc(100% - 40px);
    }

    .filing-links {
        flex-direction: column;
        gap: 8px;
    }

    .filing-separator {
        display: none;
    }
}

@media (max-width: 480px) {
    .filing-info {
        bottom: 30px;
    }

    .decoration-line {
        width: 20px;
    }
}
</style>
