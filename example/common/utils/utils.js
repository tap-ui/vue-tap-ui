const changeName = {
  'Button': '按钮',
  'Container': '',
  'Badge': '徽章',
  'Toast': '吐丝',
  'Header': '导航',
  'LazyLoad': '图片懒加载',
  'Swipe': '轮播图',
}

export function valueToName (value) {
  return value ? changeName[value] : '';
}
