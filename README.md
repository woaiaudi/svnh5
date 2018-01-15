# svnh5

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#### 在webstome中 注意事项
> 在webstome中 开发时，请开启 ES6语法，并在 `File Watches` 中添加 `Babel`  （将ES6语法转换成ES5）  
- 第一步：设置 JS 的语法  
  > 依次选择  `Preferences` -> `Languages & Frameworks`  -> `JavaScript` -> `JavaScript Language version` 设置为`ECMAScript 6`

- 第二步：在项目目录下安装 `Babel` 
  >  `cd` 到项目目录下，然后，执行全局安装命令   
  >   `sudo npm install --save-dev babel-cli`
  
- 第三步：添加`Babel` 的 `File Watchers`
  >  `Preferences` -> `Tools`  -> `File Watchers`    
  >   点击 底部 “+” 添加一个转换器，选择 `Babel`类型，其余选项会自动选择，默认不用修改，添加即可






### 功能列表
- [x] 人员列表
- [x] 项目列表
- [ ] 添加项目(编码，中文)
- [ ] 修改项目
- [ ] 删除项目(暂不提供)
- [x] 过滤掉打分支的版本
- [x] 在UI上表示出 分支版本
- [ ] 查询的时间范围不大于一个月(性能不行)
