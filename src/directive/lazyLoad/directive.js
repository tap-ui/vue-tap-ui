import {
  throttle
} from '../../common/js/util'

function replaceSrc () {
  let seeHeight = window.innerHeight;
  let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

}

export default {
  bind(el, binding) {
    console.log(el)
    console.log(binding)
  },
  unbind(el, binding) {
    console.log(el)
  }
}
