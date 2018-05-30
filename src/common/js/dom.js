let domFind = function(container, targetClass) {
  for (let i = 0, len = container.length; i < len; i++) {
    if (container[i].nodeType == 1) {
      if (container[i].classList.contains(targetClass)) {
        return container[i];
      }
    }
  }
};
class classToggle {
  constructor(className) {
    this.className = className; //类名
    this.domHighLighted = null; //上一个记录的dom
  }
  addClass(dom) {
    if (dom.nodeType == 1) {
      setTimeout(() => {
        dom.classList.add(this.className)
      }, 0)
    }
    if (this.domHighLighted) {
      this.remove(); //removeClass上一个dom
    }
    this.domHighLighted = dom; //记录当前dom
  }
  remove(dom) {
    if (dom) {
      if (dom.nodeType == 1) {
        dom.classList.remove(this.className)
      }
    } else if (this.domHighLighted) {
      this.domHighLighted.classList.remove(this.className);
    }
  }
}


/**
 * [domIndex 获取dom相对于父组件的index值]
 * @param  {[event]} event [event对象]
 * @param  {[DOM]} parent [目标父元素]
 * @return {[Number]}        [description]
 */
function domIndex(event, parent) {
  let target = null;
  let paths = event.path; //拿到事件流数组

  //拿到目标target
  for (let i = 0, len = paths.length; i < len; i++) {
    if (paths[i] === parent) {
      target = paths[i - 1]
      break;
    }
  }
  //过滤制表符节点
  let doms = Array.from(parent.childNodes).filter(dom => dom.nodeType == 1);
  var index = 0;
  //对比寻找index
  doms.some((dom, _index) => {
    if (dom == target) {
      index = _index;
      return;
    }
  })
  return index;
}

let elementStyle = document.createElement('div').style

function vendor(prop) {
  let ucProp = prop.charAt(0).toUpperCase() + prop.substr(1)
  let transformNames = {
    webkit: `webkit${ucProp}`,
    Moz: `Moz${ucProp}`,
    O: `O${ucProp}`,
    ms: `ms${ucProp}`,
    standard: prop
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
}

function prefixStyle(style) {
  const ret = vendor(style)
  if (ret === false) {
    return false
  }

  if (ret === 'standard') {
    return style
  }

  return ret + style.charAt(0).toUpperCase() + style.substr(1)
}

export {
  domFind,
  classToggle,
  domIndex,
  prefixStyle
}