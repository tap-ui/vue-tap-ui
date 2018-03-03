import Vue from 'vue'
import Router from 'vue-router'
//引入路由配置文件
import config from './config'
Vue.use(Router)

let routes = [];
//读取配置
for( let router in config) {
  let {path, name, component} = config[router];
  routes.push({path,name,component})
}

//注入配置
export default new Router({
  routes
})
