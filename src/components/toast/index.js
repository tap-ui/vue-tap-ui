import Vue from 'vue';
import VueToast from './toast.vue';
import { isObj } from '@/common/js/util';

const ToastConstructor = Vue.extend(VueToast);


let toastPool = []
let seed = 1;

const remoteInstance = (instance) => {
  if (!instance) return
  const len = instance.length
  const index = toastPool.findIndex(v => v.id === instance.id);

  toastPool.splice(index, 1);
}

const Toast = (options = {}) => {
  if (Vue.prototype.$isServer) return

  const instance = new ToastConstructor({
    propsData: {
      ...options
    }
  });
  instance.message = options.message;

  const id = `toast_${seed++}`;
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);

  toastPool.push(instance);

  instance.vm.$on('closed', () => {
    remoteInstance(instance);
    document.body.removeChild(instance.vm.$el);
    instance.vm.$destroy();
    // toast.clear();
  })
  // return toast
}

// const createMthod = type => options => Toast({
//   type, ...parseOptions(options)
// })
//
// !(() => {
//   ['loading', 'success', 'fail'].forEach(method => {
//     Toast[method] = createMthod(method);
//   })
// })()



// Toast.clear = function () {
//   toast.visible = false;
// }

Vue.prototype.$toast = Toast;

// export default Toast
export {
  Toast,
  VueToast
}
