/** 搜索引擎分析 */

export const searchEngines = [
  // baidu
  ['script', { async: '', src: 'https://hm.baidu.com/hm.js?44212d6ce872df50b804d94b24889284' }],
  ['script', {}, `var _hmt=_hmt||[];`],
]

export const manualUpdate = route => {
  // baidu
  if (typeof _hmt !== 'undefined') {
    _hmt.push(['_trackPageview', route.fullPath])
  }
}
