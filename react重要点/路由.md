### Router-router 

在学习 react路由之前 我先整理一下 vue-router

```javascript
// Vue的main.js

import router from './router'; // 引入路由

new Vue({
  store, // 导入到vue里面
  router
}).$mount('#app');

// 在 vue-router 里面
import Router from 'vue-router';

// 这里导入路由要进入的组件
import login form './login';

Vue.use(Router); // Vue注册

const router = new Router({
  routes: [
    {path: '/login', component: login}
    {
      path: '/sysSetting/barList',
      name: 'sysSetting/barList',
      component: cybercafeBox,
      children: [
        {path: '', component: cybercafeHome }, // 二级路由
      ]
    }
  ] 
});

export default router; // 导出
```





### React-router 

看最新的英文文档 看最新的英文文档 看最新的英文文档 

