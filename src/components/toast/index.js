import Vue from 'vue';
import VueToast from './toast.vue';

import { isObj } from '@/common/js/util';

const ToastConstructor = Vue.extend(VueToast);
const singleton = true;
const pool = [];

const defaultOptions = {
  message: '',
  position: 'middle',
  type: 'text',
  mask: false,
  duration: 3000,
  visibe: true,
}

let currentOptions = { ...defaultOptions };

const parserOptions = (message) => isObj(message) ? message : { message };

const getInstance = () => {
  if (!pool.length || !singleton) {
    const toast = new ToastConstructor({
      el: document.createElement('div')
    })
    document.body.appendChild(toast.$el);
    pool.push(toast)
  }
  return pool[pool.length - 1];
}

const Toast = (options = {}) => {
  const toast = getInstance();

  options = {
    ...currentOptions,
    ...parserOptions(options),
    close() {
      toast.visibe = false;
    }
  }

  Object.assign(toast, options);

  clearTimeout(toast.timer);

  if (options.duration) {
    toast.timer = setTimeout(() => {
      toast.close()
    }, toast.duration)
  }

  return toast;
}

const createMethod = type => options => Toast({
  type, ...parserOptions(options)
})

!(() => {
  ['loading', 'success', 'fail'].forEach((method) => {
    Toast[method] = createMethod(method)
  })
})()

Vue.prototype.$toast = Toast;

export {
  Toast,
  VueToast
}
