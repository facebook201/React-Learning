### 安装脚手架

sudo cnpm install -g create-react-app // 全局安装



create-react-app [app-name] // 合适的目录下新建项目

cd app-name // 进入到 项目下面

cnpm start





####  线上编译命令

cnpm run build 

cnpm install -g serve // 运行这两行代码 查看线上环境

serve -s build





### API 开发

线上环境和开发环境的api 端口不一样。出现CORS问题。那么解决方案可能是**环境变量**

```javascript
const apiBaseUrl = process.env.NODE_ENV === 'development' ? 'localhost:3001' : '/';
// 但是这样非常麻烦 create-react-app  提供了一个非常简单的办法 只需要在package.json 加一个配置

'proxy': 'http://localhost:3001/', // 只对于开发版本有效 线上环境还是要保持react应用和api同一个端口

```

