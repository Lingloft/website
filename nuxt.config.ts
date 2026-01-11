/**
 * Nuxt 配置文件
 *
 * 项目名称：灵阁 LingLoft 团队官网
 * 技术栈：Nuxt 3 + Vue 3 Composition API
 *
 * 配置说明：
 * - 使用 SSG (静态站点生成) 模式
 * - 启用 @nuxt/image 优化图片加载
 * - 启用 @nuxt/icon 提供图标支持
 * - 全面的 SEO 优化配置
 */
export default defineNuxtConfig({
  // 兼容性日期，确保使用最新的 Nuxt 特性
  compatibilityDate: "2025-07-15",

  // 禁用 SSR - 本应用使用自定义页面管理，不需要服务端渲染
  // 这可以避免 hydration mismatch 错误
  ssr: false,

  // 开发工具配置
  devtools: { enabled: true },

  // 启用的模块 - 仅保留必要模块
  modules: [
    "@nuxt/image", // 图片优化
    "@nuxt/icon", // 图标支持
  ],

  // 组件配置 - 禁用路径前缀，使组件可以直接使用文件名
  components: [
    {
      path: "~/components",
      pathPrefix: false, // 禁用路径前缀
    },
  ],

  // 应用配置
  app: {
    // 页面 head 配置 - 全面的 SEO 优化
    head: {
      // 页面标题
      title: "灵阁 - 创意技术团队",

      // 字符编码
      charset: "utf-8",

      // 视口配置
      viewport: "width=device-width, initial-scale=1, maximum-scale=5",

      // HTML 语言属性
      htmlAttrs: {
        lang: "zh-CN",
      },

      // Meta 标签 - SEO 核心配置
      meta: [
        // 基础 SEO 标签
        {
          name: "description",
          content:
            "灵阁是一个年轻的创意技术团队，成员来自不同领域，擅长前端开发、后端运维、游戏设计、平面设计、3D建模、音乐创作和AI应用。我们喜欢把各种有趣的想法变成现实。",
        },
        {
          name: "keywords",
          content:
            "灵阁, LingLoft, 技术团队, 前端开发, 后端开发, 游戏设计, 平面设计, 3D建模, 音乐制作, AI应用, 创意团队",
        },
        { name: "author", content: "灵阁团队" },

        // 搜索引擎指令
        {
          name: "robots",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        { name: "googlebot", content: "index, follow" },
        { name: "bingbot", content: "index, follow" },

        // 主题色配置 - 深碳黑
        { name: "theme-color", content: "#0a0a0f" },
        { name: "msapplication-TileColor", content: "#0a0a0f" },
        { name: "msapplication-navbutton-color", content: "#0a0a0f" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },

        // 移动端优化
        { name: "format-detection", content: "telephone=no" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-title", content: "灵阁" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "application-name", content: "灵阁 LingLoft" },

        // Open Graph 协议 - 社交媒体分享优化
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "灵阁" },
        { property: "og:title", content: "灵阁 - 创意技术团队" },
        {
          property: "og:description",
          content:
            "一个年轻的跨领域创意技术团队，专注于把有趣的想法变成现实。涉猎前端开发、游戏设计、平面设计、音乐创作、AI应用等领域。",
        },
        {
          property: "og:image",
          content: "https://ling.hujiarong.site/logo.svg",
        },
        { property: "og:image:width", content: "512" },
        { property: "og:image:height", content: "512" },
        { property: "og:image:alt", content: "灵阁团队Logo" },
        { property: "og:url", content: "https://ling.hujiarong.site" },
        { property: "og:locale", content: "zh_CN" },

        // Twitter Card - Twitter 分享优化
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "灵阁 - 创意技术团队" },
        {
          name: "twitter:description",
          content:
            "一个年轻的跨领域创意技术团队，专注于把有趣的想法变成现实。",
        },
        {
          name: "twitter:image",
          content: "https://ling.hujiarong.site/logo.svg",
        },
        { name: "twitter:image:alt", content: "灵阁团队Logo" },

        // 其他 SEO 相关
        { name: "revisit-after", content: "7 days" },
        { name: "rating", content: "general" },
        { name: "referrer", content: "origin-when-cross-origin" },

        // 版权信息
        {
          name: "copyright",
          content: "© 2024-2026 灵阁 LingLoft. All rights reserved.",
        },

        // 地理位置信息（可选，有助于本地 SEO）
        { name: "geo.region", content: "CN-GD" },
        { name: "geo.placename", content: "广州" },
      ],

      // Link 标签
      link: [
        // Favicon
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },

        // Canonical URL - 防止重复内容
        { rel: "canonical", href: "https://ling.hujiarong.site" },

        // DNS 预解析 - 提升性能
        { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
        { rel: "dns-prefetch", href: "//fonts.gstatic.com" },

        // 预连接 - 提升性能
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
          crossorigin: "",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },

        // 作者信息
        { rel: "author", href: "https://ling.hujiarong.site" },

        // 站点地图
        { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
      ],

      // 结构化数据 - JSON-LD
      script: [
        // 百度统计脚本
        {
          innerHTML: `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?9008efaf333f4b6ebb4449adc4a174eb";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`,
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              // WebSite 结构化数据
              {
                "@type": "WebSite",
                "@id": "https://ling.hujiarong.site/#website",
                url: "https://ling.hujiarong.site",
                name: "灵阁",
                alternateName: "LingLoft",
                description:
                  "灵阁是一个年轻的创意技术团队，专注于把有趣的想法变成现实",
                inLanguage: "zh-CN",
                publisher: {
                  "@id": "https://ling.hujiarong.site/#organization",
                },
              },
              // Organization 结构化数据
              {
                "@type": "Organization",
                "@id": "https://ling.hujiarong.site/#organization",
                name: "灵阁",
                alternateName: "LingLoft",
                description: "一个年轻的跨领域创意技术团队",
                url: "https://ling.hujiarong.site",
                logo: {
                  "@type": "ImageObject",
                  url: "https://ling.hujiarong.site/logo.svg",
                  width: 512,
                  height: 512,
                },
                foundingDate: "2024",
                slogan: "创新是我们基因的一部分",
                knowsAbout: [
                  "前端开发",
                  "后端运维",
                  "游戏设计",
                  "平面设计",
                  "3D建模",
                  "音乐创作",
                  "AI应用",
                ],
                sameAs: [
                  "https://github.com/lingloft",
                ],
              },
              // WebPage 结构化数据
              {
                "@type": "WebPage",
                "@id": "https://ling.hujiarong.site/#webpage",
                url: "https://ling.hujiarong.site",
                name: "灵阁 - 创意技术团队",
                description:
                  "灵阁是一个年轻的创意技术团队，成员来自不同领域，擅长前端开发、后端运维、游戏设计、平面设计、3D建模、音乐创作和AI应用。",
                isPartOf: {
                  "@id": "https://ling.hujiarong.site/#website",
                },
                about: {
                  "@id": "https://ling.hujiarong.site/#organization",
                },
                inLanguage: "zh-CN",
              },
              // BreadcrumbList 结构化数据
              {
                "@type": "BreadcrumbList",
                "@id": "https://ling.hujiarong.site/#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "首页",
                    item: "https://ling.hujiarong.site",
                  },
                ],
              },
            ],
          }),
        },
      ],
    },

    // 页面过渡动画配置
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },

  // CSS 配置 - 全局样式（使用 app 目录结构）
  css: ["~/assets/css/variables.css", "~/assets/css/global.css"],

  // 运行时配置
  runtimeConfig: {
    public: {
      // 站点基础信息
      siteName: "灵阁",
      siteDescription: "创新是我们基因的一部分",
      siteUrl: "https://ling.hujiarong.site",
    },
  },

  // TypeScript 配置
  typescript: {
    strict: true,
    shim: false,
  },

  // 图片模块配置
  image: {
    // 图片质量设置
    quality: 80,
    // 支持的格式
    format: ["webp", "png", "jpg"],
  },

  // Nitro 配置 - 服务端优化
  nitro: {
    // 预渲染配置
    prerender: {
      // 预渲染首页
      routes: ["/"],
      // 爬取链接
      crawlLinks: true,
    },
    // 压缩配置
    compressPublicAssets: true,
  },

  // 实验性功能
  experimental: {
    // 启用 payload 提取，优化首屏加载
    payloadExtraction: true,
    // 启用组件岛屿
    componentIslands: true,
  },

  // 路由配置
  routeRules: {
    // 首页预渲染
    "/": { prerender: true },
  },
});
