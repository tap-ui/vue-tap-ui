const changeName = {
  'Button': '按钮',
  'Container': '',
  'Badge': '徽章',
  'Toast': '吐丝',
  'Header': '导航',
}

export function valueToName (value) {
  return value ? changeName[value] : '';
}
