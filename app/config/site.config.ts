/**
 * 站点配置文件 - 灵阁 LingLoft
 * 
 * 集中管理站点的所有可定制配置
 * 修改此文件即可快速定制站点内容
 * 
 * 视觉风格：明日方舟 / 战术UI / 未来舰队控制台
 * 文案语境：未来舰队指挥中心
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
 * 站点副标题/座右铭 - 舰队语境
 */
export const SITE_MOTTO = '// 探索未知领域，构建无限可能'

/**
 * 站点描述（用于 SEO）
 */
export const SITE_DESCRIPTION = '灵阁 LingLoft - 一支专注于前沿技术探索与创新的精英团队。我们在代码的星海中航行，以技术为引擎，以创意为燃料，构建通往未来的数字桥梁。'

/**
 * 站点关键词（用于 SEO）
 */
export const SITE_KEYWORDS = 'LingLoft, 灵阁, 技术团队, 前端开发, AI算法, 游戏开发, 创新团队, 软件开发, 数字创意'

/**
 * 站点作者
 */
export const SITE_AUTHOR = '灵阁 LingLoft'

// ==================== SEO 配置 ====================

/**
 * 站点 URL（用于生成 canonical URL 和 sitemap）
 */
export const SITE_URL = 'https://lingloft.dev'

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
export const OG_IMAGE = '/assets/avatar.jpg'

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
  name: '灵阁 LingLoft',
  alternateName: 'LingLoft',
  description: '前沿技术探索与创新团队',
  slogan: '探索未知领域，构建无限可能',
  foundingDate: '2024',
  skills: ['前端开发', 'AI算法', '游戏开发', '系统架构', '创意设计'],
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
    description: '灵阁 LingLoft - 舰队指挥中心',
  },
  {
    id: '关于我',
    title: '舰队档案',
    description: '了解灵阁团队 - 我们的使命与愿景',
  },
  {
    id: '友情链接',
    title: '星际联盟',
    description: '灵阁的盟友舰队 - 友情链接',
  },
  {
    id: '联系方式',
    title: '通讯频道',
    description: '联系灵阁团队 - 建立通讯链接',
  },
  {
    id: '我的项目',
    title: '作战系统',
    description: '灵阁的项目展示 - 我们的技术成果',
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
 * 团队标签列表
 */
export const ABOUT_TAGS = ['⚡ 技术', '🎯 创新', '🚀 探索']

/**
 * 团队介绍内容 - 舰队语境
 * 每个元素为一行文字
 */
export const ABOUT_CONTENT = [
  '[ SYSTEM ONLINE ]',
  '',
  '灵阁 · LingLoft',
  '一支在数字星海中航行的技术舰队',
  '',
  '我们的使命：',
  '探索技术的边界，突破认知的极限',
  '以代码为武器，以创意为盾牌',
  '在未知领域开辟新的航线',
  '',
  '核心能力矩阵：',
  '前端工程 | AI算法 | 系统架构 | 创意设计',
  '',
  '// 欢迎加入我们的航程',
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
  learnMore: '查阅档案',
  friends: '星际联盟',
  projects: '作战系统',
  contact: '通讯频道',
  back: '返回',
  home: '指挥中心',
}

/**
 * 页面标题 - 舰队语境
 */
export const PAGE_TITLES = {
  about: '舰队档案',
  friends: '星际联盟',
  contact: '通讯频道',
  projects: '作战系统',
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
