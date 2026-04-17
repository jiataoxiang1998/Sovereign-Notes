import { ref, computed } from 'vue'

export type Language = 'en' | 'zh'

const translations: Record<string, Record<Language, string>> = {
  '01. To-do': { en: '01. To-do', zh: '01. 待办' },
  '02. Completed': { en: '02. Completed', zh: '02. 已完成' },
  '03. Identified Issues': { en: '03. Identified Issues', zh: '03. 发现问题' },
  '04. Blockers': { en: '04. Blockers', zh: '04. 无法解决的问题' },
  'Add To-do': { en: 'Add To-do', zh: '添加待办' },
  'Add Completed': { en: 'Add Completed', zh: '添加已完成' },
  'Add Issue': { en: 'Add Issue', zh: '添加问题' },
  'Add Blocker': { en: 'Add Blocker', zh: '添加阻塞' },
  '+ Add To-do': { en: '+ Add To-do', zh: '+ 添加待办' },
  '+ Add Completed': { en: '+ Add Completed', zh: '+ 添加已完成' },
  '+ Add Issue': { en: '+ Add Issue', zh: '+ 添加问题' },
  'Title': { en: 'Title', zh: '标题' },
  'Enter title...': { en: 'Enter title...', zh: '输入标题...' },
  'Priority': { en: 'Priority', zh: '优先级' },
  'Due Date (Optional)': { en: 'Due Date (Optional)', zh: '截止日期（可选）' },
  'Click to select date...': { en: 'Click to select date...', zh: '点击选择日期...' },
  'Category (Optional)': { en: 'Category (Optional)', zh: '类别（可选）' },
  'No category': { en: 'No category', zh: '不选择类别' },
  'Severity': { en: 'Severity', zh: '严重程度' },
  'High': { en: 'High', zh: '高' },
  'Mid': { en: 'Mid', zh: '中' },
  'Low': { en: 'Low', zh: '低' },
  'Cancel': { en: 'Cancel', zh: '取消' },
  'Add': { en: 'Add', zh: '添加' },
  'Detail': { en: 'Detail', zh: '详情' },
  'Summary': { en: 'Summary', zh: '摘要' },
  'Copied': { en: 'Copied', zh: '复制成功' },
  'Copy Summary': { en: 'Copy Summary', zh: '复制摘要' },
  'Import Help': { en: 'Import Help', zh: '导入帮助' },
  'Category Management': { en: 'Category Management', zh: '类别管理' },
  'Export Data': { en: 'Export Data', zh: '导出数据' },
  'Import Data': { en: 'Import Data', zh: '导入数据' },
  'New category name': { en: 'New category name', zh: '新类别名称' },
  'Remove category': { en: 'Remove category', zh: '移除分类' },
  'Close': { en: 'Close', zh: '关闭' },
  'Clear': { en: 'Clear', zh: '清除' },
  'Got it': { en: 'Got it', zh: '知道了' },
  'Read-only': { en: 'Read-only', zh: '只读' },
  'Import successful': { en: 'Import successful', zh: '导入成功' },
  'days': { en: 'days', zh: '天' },
  'Manage Categories': { en: 'Manage Categories', zh: '管理类别' },
  'Export': { en: 'Export', zh: '导出' },
  'button': { en: 'button', zh: '按钮' },
  'to download all history as JSON file': { en: 'to download all history as JSON file', zh: '将当前所有历史记录下载为 JSON 文件' },
  'and select exported JSON file to import': { en: 'and select exported JSON file to import', zh: '选择导出的 JSON 文件即可导入' },
  'Sync Notes': { en: 'Sync Notes', zh: '同步说明' },
  'Import merges data, same date will be overwritten': { en: 'Import merges data, same date will be overwritten', zh: '导入时会合并数据，相同日期的数据会被覆盖' },
  'Backup current data before exporting': { en: 'Backup current data before exporting', zh: '建议导出前先备份当前数据' },
  'Can transfer data between computers via file': { en: 'Can transfer data between computers via file', zh: '可以���不同电脑间通过文件传输同步数据' },
  'File Format': { en: 'File Format', zh: '文件格式' },
  'Dashboard': { en: 'Dashboard', zh: '仪表盘' },
  'History': { en: 'History', zh: '历史' },
  'Daily Summary': { en: 'Daily Summary', zh: '每日总结' },
  'Refine your daily output and generate automated work logs': { en: 'Refine your daily output and generate automated work logs', zh: '优化您的每日工作输出并生成自动化工作日志' },
  'Today': { en: 'Today', zh: '今天' },
  'No items yet': { en: 'No items yet', zh: '暂无内容' },
  'Delete': { en: 'Delete', zh: '删除' },
  'Generate Summary': { en: 'Generate Summary', zh: '生成总结' },

  // Navigation
  'nav.dashboard': { en: 'Dashboard', zh: '仪表盘' },
  'nav.history': { en: 'History', zh: '历史' },
  'nav.chat': { en: 'Chat', zh: '聊天' },
  'lang.toggle': { en: '中文', zh: 'EN' },
  'nav.close': { en: 'Close', zh: '关闭' },
}

const currentLanguage = ref<Language>((localStorage.getItem('language') as Language) || 'en')

export function useLanguage() {
  const isZh = computed(() => currentLanguage.value === 'zh')
  const isEn = computed(() => currentLanguage.value === 'en')

  function toggle() {
    currentLanguage.value = currentLanguage.value === 'en' ? 'zh' : 'en'
    localStorage.setItem('language', currentLanguage.value)
  }

  function t(key: string): string {
    return translations[key]?.[currentLanguage.value] || key
  }

  return {
    currentLanguage,
    isZh,
    isEn,
    toggle,
    t
  }
}