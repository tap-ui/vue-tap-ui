import Vue from 'vue';
import VueToast from './toast.vue';
import { isObj } from '@/common/js/util';

const ToastConstructor = Vue.extend(VueToast);

const parseOptions = (message) => isObj(message) ? message : { message };

const defaultOptions = {
  type: 'text',
  mask: false,
  message: '',
  visible: true,
  duration: 3000,
  position: 'middle'
}

let toastPool = []
let singleton = true;
let currentOptions = { ...defaultOptions };
let seed = 1;

function createInstence () {
  if (!toastPool.length || !singleton) {
    const toast = new ToastConstructor({
      el: document.createElement('div')
    });
    document.body.appendChild(toast.$el);
    toastPool.push(toast);
  }

  return toastPool[toastPool.length - 1];
}

const remoteInstance = (instance) => {
  if (!instance) return
  const len = instance.length
  const index = toastPool.findIndex(v => v.id === instance.id);

  toastPool.splice(index, 1);
}

const Toast = (options = {}) => {
  if (Vue.prototype.$isServer) return

  // const toast = createInstence();

  // options = {
  //   ...currentOptions,
  //   ...parseOptions(options),
  //   clear() {
  //     toast.visible = false;
  //   }
  // }
  // console.log(toast);

  // Object.assign(toast, options);
  // toast.visible = true;
  // console.log(toast);
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
    // remoteInstance(instance);
    // document.body.removeChild(instance.vm.$el);
    // instance.vm.$destroy();
    toast.clear();
  })
  // return toast
}

const createMthod = type => options => Toast({
  type, ...parseOptions(options)
})

!(() => {
  ['loading', 'success', 'fail'].forEach(method => {
    Toast[method] = createMthod(method);
  })
})()



// Toast.clear = function () {
//   toast.visible = false;
// }

Vue.prototype.$toast = Toast;

export default Toast
