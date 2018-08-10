#### 安装stylus-loader

npm install stylus stylus-loader --save-dev



#### 配置webpack

首先的Eject出来 操作不可逆

npm run eject 



#### 配置

```javascript
module: {
    strictExportPresence: true,
        rules: [
            ...
            oneOf: [
            	...
                {
                   test: /\.styl$/, // 匹配
            	   loaders: ['style-loader', 'css-loader', 'stylus-loader']
                }
            ]
        ]
}

// 在file-loader 添加对 styl文件的解析
{
    exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.styl$/], // 添加 stylus的解析
}
```

 然后就可以直接引用了。

其他的配置一样