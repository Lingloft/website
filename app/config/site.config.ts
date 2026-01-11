/**
 * 站点配置文件 - 灵阁 LingLoft
 *
 * 集中管理站点的所有可定制配置
 * 修改此文件即可快速定制站点内容
 */

import type { PageConfig } from '~/types'

// ==================== 站点基本信息 ====================

/**
 * 站点名称
 */
export const SITE_NAME = '灵阁'

/**
 * 站点英文名
 */
export const SITE_NAME_EN = 'LINGLOFT'

/**
 * 站点副标题/座右铭
 */
export const SITE_MOTTO = '创新是我们基因的一部分'

/**
 * 站点描述（用于 SEO）
 */
export const SITE_DESCRIPTION = '灵阁是一个年轻的创意技术团队，成员来自不同领域，擅长前端开发、后端运维、游戏设计、平面设计、3D建模、音乐创作和AI应用。我们喜欢把各种有趣的想法变成现实。'

/**
 * 站点关键词（用于 SEO）
 */
export const SITE_KEYWORDS = '灵阁, LingLoft, 技术团队, 前端开发, 后端开发, 游戏设计, 平面设计, 3D建模, 音乐制作, AI应用, 创意团队'

/**
 * 站点作者
 */
export const SITE_AUTHOR = '灵阁团队'

// ==================== SEO 配置 ====================

/**
 * 站点 URL（用于生成 canonical URL 和 sitemap）
 */
export const SITE_URL = 'https://ling.hujiarong.site'

/**
 * 站点语言
 */
export const SITE_LANGUAGE = 'zh-CN'

/**
 * 站点地区
 */
export const SITE_LOCALE = 'zh_CN'

/**
 * Open Graph 图片（用于社交媒体分享）
 */
export const OG_IMAGE = '/logo.svg'

/**
 * Twitter 用户名（如果有）
 */
export const TWITTER_HANDLE = '@lingloft'

/**
 * 站点类型
 */
export const SITE_TYPE = 'website'

// ==================== 结构化数据配置 ====================

/**
 * 团队信息（用于 JSON-LD 结构化数据）
 */
export const TEAM_INFO = {
  name: '灵阁',
  alternateName: 'LingLoft',
  description: '一个年轻的跨领域创意技术团队，专注于把有趣的想法变成现实',
  slogan: '创新是我们基因的一部分',
  foundingDate: '2024',
  skills: ['前端开发', '后端运维', '游戏设计', '平面设计', '3D建模', '音乐创作', 'AI应用'],
  sameAs: [
    'https://github.com/lingloft',
  ],
}

// 兼容旧配置
export const PERSON_INFO = TEAM_INFO

// ==================== 页面配置 ====================

/**
 * 页面配置列表
 * 定义所有页面的基本信息
 *
 * 如需添加新页面：
 * 1. 在 types/index.ts 中添加页面名称
 * 2. 在此处添加页面配置
 * 3. 创建对应的页面组件
 * 4. 在 app.vue 中引入组件
 */
export const PAGE_CONFIGS: PageConfig[] = [
  {
    id: '主页',
    description: '灵阁 - 一个年轻的跨领域创意技术团队',
  },
  {
    id: '关于我',
    title: '关于我们',
    description: '了解灵阁团队 - 我们是谁，我们做什么',
  },
  {
    id: '友情链接',
    title: '团队成员',
    description: '认识灵阁的小伙伴们',
  },
  {
    id: '联系方式',
    title: '联系我们',
    description: '想和我们聊聊？这里有各种联系方式',
  },
  {
    id: '我的项目',
    title: '我们的项目',
    description: '看看灵阁团队做过的一些有趣项目',
  },
]

/**
 * 默认页面（首次加载时显示的页面）
 */
export const DEFAULT_PAGE = '主页'

// ==================== 备案信息 ====================

/**
 * ICP 备案号
 */
export const ICP_NUMBER = '粤ICP备2025504330号'

/**
 * ICP 备案链接
 */
export const ICP_LINK = 'https://beian.miit.gov.cn/'

/**
 * 公安备案号
 */
export const POLICE_NUMBER = '粤公网安备44196102000241号'

/**
 * 公安备案链接
 */
export const POLICE_LINK = 'https://beian.mps.gov.cn/#/query/webSearch?code=44196102000241'

// ==================== 关于页面内容 ====================

/**
 * 团队涉猎领域
 */
export const ABOUT_DOMAINS = [
  '前端开发',
  '后端运维',
  '游戏设计',
  '平面设计',
  '建模设计',
  '音乐创作',
  '人工智能',
]


/**
 * 团队介绍内容
 * 每个元素为一行文字
 */
export const ABOUT_CONTENT = [
  '灵阁 · LingLoft',
  '',
  '我们是一支跨领域的创意技术团队',
  '专注于将想法转化为现实',
  '',
  '从代码到设计，从音乐到AI',
  '我们相信技术与艺术的融合',
  '能够创造出更有温度的作品',
  '',
  '创新是我们基因的一部分',
]

// ==================== 首页内容 ====================

/**
 * 首页欢迎语
 */
export const HOME_WELCOME = '// WELCOME TO LINGLOFT'

/**
 * 首页状态指示
 */
export const HOME_STATUS = 'SYSTEM STATUS: OPERATIONAL'

/**
 * 首页装饰文字
 */
export const HOME_DECORATIONS = {
  topLeft: 'SYS.INIT',
  topRight: 'v2.0.24',
  bottomLeft: 'SECTOR-7G',
  bottomRight: 'ONLINE',
}

// ==================== 资源路径 ====================

/**
 * 团队Logo路径
 */
export const LOGO_PATH = '/logo.svg'

/**
 * 头像图片路径（兼容旧配置）
 */
export const AVATAR_PATH = '/logo.svg'

/**
 * 备案图标路径
 */
export const POLICE_ICON_PATH = '/assets/备案图标.png'

/**
 * 数据文件路径
 */
export const DATA_FILE_PATH = '/data.json'

// ==================== 战术UI文案 ====================

/**
 * 按钮文案 - 舰队语境
 */
export const BUTTON_TEXTS = {
  learnMore: '团队信息',
  friends: '团队成员',
  projects: '团队项目',
  contact: '联系我们',
  back: '返回',
  home: '返回首页',
}

/**
 * 页面标题 - 舰队语境
 */
export const PAGE_TITLES = {
  about: '团队信息',
  friends: '团队成员',
  contact: '联系我们',
  projects: '团队项目',
}

/**
 * 状态文案
 */
export const STATUS_TEXTS = {
  loading: '数据加载中...',
  online: '在线',
  offline: '离线',
  connecting: '建立连接中...',
}
