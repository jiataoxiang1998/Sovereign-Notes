# Stitch MCP 调用规则

## 超时设置
- 单次调用最长等待时间: **10分钟**

## 调用限制
- **只能调用一次生成API**: 首次调用使用 `stitch_generate_screen` 或 `stitch_generate_and_fetch_code`
- **禁止重复生成**: 首次调用后，禁止再次调用生成API获取新方案，每隔1分钟再次查询
- 后续只能通过 `stitch_get_screen_code` 查询已有内容，禁止再次发起生成调用

## 生成代码要求

### 技术栈声明
在调用 Stitch 生成 UI 时，必须明确告知当前使用的技术栈，包括:
- 前端框架 (如 React, Vue, Svelte, Next.js, Angular 等)
- UI 组件库 (如 shadcn/ui, Material UI, Ant Design 等)
- CSS 方案 (如 Tailwind CSS, CSS Modules, Styled Components 等)
- 其他相关技术依赖

示例提示词:
> 使用 [具体框架] + [组件库] + [CSS方案] 生成代码

### 外部资源限制
- **禁止使用外部 CDN**
- 所有资源必须使用本地路径或项目内置的资源
- 禁止引用 cdn.jsdelivr.net, unpkg.com, cdnjs.cloudflare.com 等 CDN 服务
- 图片、字体等资源应使用本地文件或 base64 内联

## 调用示例

### 生成屏幕
```javascript
stitch_generate_and_fetch_code({
  projectId: "项目ID",
  prompt: "使用 React + shadcn/ui + Tailwind CSS 生成一个登录页面，包含邮箱和密码输入框，不能使用外部CDN",
  deviceType: "DESKTOP"
})
```

### 查询屏幕代码
```javascript
stitch_get_screen_code({
  projectId: "项目ID",
  screenId: "屏幕ID"
})
```