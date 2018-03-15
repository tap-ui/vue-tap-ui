import {
  util
} from '../../common/js/util'
console.log(this)
let replaceSrc = function(el, binding) {
  // console.log(el)
  let src = binding.value;
  let seeHeight = window.innerHeight;
  let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  if (el.offsetTop < seeHeight + scrollTop) {
    el.src = src;
  }
}


export default {
  bind(el, binding) {
    // console.log(el)
    // console.log(binding)
    let _this = this;
    window.addEventListener('scroll', util.throttle(replaceSrc.bind(null, el, binding), 200));
  },
  unbind(el, binding) {
    console.log(el)
  }
}