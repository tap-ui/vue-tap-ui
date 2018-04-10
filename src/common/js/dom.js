let domFind = function(container, targetClass) {
  for (let i = 0, len = container.length; i < len; i++) {
    if (container[i].nodeType == 1) {
      if (container[i].classList.contains(targetClass)) {
        return container[i];
      }
    }
  }
}

export {
  domFind
}