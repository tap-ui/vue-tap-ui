const changeName = {
  'button': '按钮',
  'container': '',
}

export function valueToName (value) {
  return value ? changeName[value] : '';
}
