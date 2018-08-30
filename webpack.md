### 导语

[官方文档](http://webpack.github.io/docs) & [中文文档](https://doc.webpack-china.org/)

[webpack](https://webpack.vuefe.cn/concepts/index/)，是近期最火的一款**模块加载器兼打包工具**，它能把各种资源，前端涉及到的所有文件，例如js、css/sass/less、图片等，都作为JavaScript**模块**来使用和处理。

**设计思想**：require anything。对于所需要的模块，我们可以直接使用**require()**的形式来引入，即使他们可能需要经过编译，但我们无需在上面花太多心思，因为webpack有着各种健全的加载器在默默处理这些事。

**加载方式**：各种loader插件（能require anything的基础，便是有这些loader来引入各种文件）

**编译方式**：common模块 -> function类型模块（webpack天生支持commonjs规范，用nodejs把commonjs规范下的模块全部转换成浏览器支持的function形式模块，再使用一个模块加载器，组织这些模块。）

> 你可以不打算将其用在你的项目上，你没有理由不去掌握它，因为以近期Github上各大主流的项目([Vue](https://vuefe.cn/)，[React](http://reactjs.cn/react/docs/getting-started-zh-CN.html)等)，它们仓库上展示的实例都是基于webpack来开发的。



### gulp和webpack的区别？
以搭积木为例。

gulp相当于为我们提供了各种各样的积木，比如长方体(代码压缩)、正方体(添加css前缀)、球体(图片压缩)、锥体(热拔插)等，我们利用这些不同功能的积木(task)，来搭建我们的房子。

而webpack，则直接给我们提供好一栋完整的房子，省去了中间复杂的配置过程。相比来说，webpack更加方便。



### webpack常用命令

**webpack**：以不压缩的形式来打包，常用于调试代码

**webpack-p**：做线上发布时的打包，会把所有文件都做最小化压缩。

**webpack-watch**：监听文件的改变而自动编译，一般用于开发过程。

**webpack --config webpack.config.js**：改变默认的配置文件位置



### webpacl Loaders

HTML：html-webpack-plugin / html-loader

js：babel-loader + babel-preset-es2015

css：style-loader + css-loader

image + font：url-loader



### webpack详解
#### 1. 以[vue.js中文](https://vuefe.cn/)推荐的webpack模版为例

Vue脚手架，自带webpack，无须使用`npm install webpack -g`来安装全局的webpack，或者`npm Install webpack@1.15.0 --save-dev`安装项目里的webpack依赖（若有的话）



《=======

tips：

正常独立安装webpack：

```
npm install webpack -g：安装全局的webpack

npm install webpack@1.15.0 --save-dev：安装项目里的webpack依赖

webpack-v：查看webpack版本号
```

**1.全局安装为什么不需要版本号，安装项目依赖却需要？**

根据npm加载原理，npm会优先选用项目本地的npm包，找不到才会去全局的npm包里找，全局安装是为了提供webpack的命令，而真正用到的是本地的1.15.0版本.

**2.为什么用1.15.0版本，问什么不用2.x？**

由于object.default属性，正常浏览器没有问题，但是在ie8会报错。

**3.什么是--save-dev?**

npm把依赖包的信息存在package.json文件里记录项目的依赖。

用**--save-dev**安装的包，包的名称和版本都会存到package.json文件的devdependences里；

用**--save**安装的会存到dependences。

两者区别：

devdependences存放开发时的辅助工具，一般**不会被打包进业务代码**，比如测试工具，打包工具之类的；

dependences存放的是**业务代码**的依赖包，比如jquery。

======》



    # 全局安装 vue-cli
    $ npm install --global vue-cli
    
    # 创建一个基于 webpack 模板的新项目
    $ vue init webpack my-project
    
    # 安装依赖
    $ cd my-project
    $ npm install
    
    # 启动项目
    $ npm run dev



打开package.json，查看"script"

	 "scripts": {
	    "dev": "node build/dev-server.js"，
	    "start": "node build/dev-server.js"，
	    "build": "node build/build.js"
	  }

即当我们在命令行输入```cnpm run dev```，实际上执行的是```build/dev-server.js```文件

当我们想要打包上线，输入`npm run build`，实际上执行的是`build/build.js`文件





#### 2. /build目录介绍

build.js	生产环境构建

check-versions.js	版本检查：node、npm



dev-client.js	开发服务器的热重载（用于实现页面的自动刷新）

dev-server.js	构建本地服务器（npm run dev运行的文件）



utils.js	构建相关工具函数



vue-loader.conf.js css加载器配置

webpack.base.conf.js	webpack基础配置

webpack.dev.conf.js	webpack开发环境配置

webpack.prod.conf.js	webpack生产环境配置



### Webpack2 和 Webpack

`webpack2` 和 `webpack`对比，有以下的新特性:

1. ES6 Modules : webpack 2 已经支持原生的 ES6 的模块加载器了，这意味着 webpack 2 能够理解和处理 import和export了，而不用把他们转化成 CommonJS 来处理了。
2. 用 ES6 来做代码拆分 : ES6 的模块加载器定义了System.import这一个方法，System.import能够在运行时动态加载 ES6 模块。
3. 混合使用 ES6 和 AMD 和 CommonJS (Mixing ES6 with AMD and CommonJS)

