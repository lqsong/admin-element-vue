# admin-element-vue

## Demo

**[Default version demo](http://demo.admin-element-vue.liqingsong.cc/)**             |  **[BgImg version demo](http://bgimg-demo.admin-element-vue.liqingsong.cc/)**
:-------------------------:|:-------------------------:
![Default version demo](https://gitee.com/lqsong/public/raw/master/admin-element-vue/admin1.png)  |  ![BgImg version demo](https://gitee.com/lqsong/public/raw/master/admin-element-vue/admin2.png)

## 功能

```
- 登录 / 注销

- 权限验证
  - 页面权限
  - 权限配置

- 全局功能
  - 动态顶级菜单（支持设置是否启用）
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - Svg Sprite 图标
  - Mock 数据

- 综合实例
  - 引导页
  - 页面示例
    - 列表页面
    - 表单页面
    - 详情页面
  - ECharts 图表
```


## 自定义配置

### 一、**(必须)** 复制 'vue.config.default.js' 重命名为 ' vue.config.js'
查看 [配置参考](https://cli.vuejs.org/config/).

### 二、**(必须)**  复制 'src/main.ext.default.js' 重命名为 'src/main.ext.js'
满足不同用户、不同环境下，内容可自定义进行增删减

### 三、**(建议)** 开发模式下，不要直接修改 '.env.development'
复制 '.env.development' 重命名为 ' .env.development.local' , 修改对应的参数.

### 四、**(建议)** 生产模式下，不要直接修改 '.env.production'
复制 '.env.production' 重命名为 ' .env.production.local' , 修改对应的参数.

## 项目设置
```
npm ci ( npm install )
```

### 一、Compiles and hot-reloads for development
```
npm run serve
```

### 二、Compiles and minifies for production
```
npm run build
```

### 三、运行单元测试
```
npm run test:unit
```

### 四、运行端到端测试
```
npm run test:e2e
```

### 五、修复
```
npm run lint
```

### 六、精简 svg icon
```
npm run svgo
```

## 捐赠

如果你觉得这个项目帮助到了你，你可以请作者喝咖啡表示鼓励.

**ALIPAY**             |  **WECHAT**
:-------------------------:|:-------------------------:
![Alipay](https://gitee.com/lqsong/public/raw/master/common/Alipay.png)  |  ![Wechat](https://gitee.com/lqsong/public/raw/master/common/Wechat.png)

