const changeName = {
  'button': '按钮',
  'container': '',
  'badge': '徽章',
}

export function valueToName (value) {
  return value ? changeName[value] : '';
}
