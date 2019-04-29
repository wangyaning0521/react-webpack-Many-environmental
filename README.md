# 你好，react - wyn

## 添加依赖
```
yarn
```

### 运行项目
```
yarn start
```

### 编译打包产出
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### 公共打包文件

```
webpack.common
```

### 本地服务编译

```
webpack.dev
```

### 线上打包服务

```
webpack.prod
```

### 打包生产环境使用的代码需要非常多的优化和处理，所以这个文件的配置会非常复杂。

```
配置思路

    将css样式从main.js内抽离到单独的.css文件
    缓存处理

    将第三方库和webpack的runtime从main.js内抽离出来
    js、css、html代码压缩

    使用source-map替代inline-source-map

    懒加载（lazy loading）
    
    每次打包前先清空dist目录

```

### 抽离css样式

```
    前面的webpack.dev.js只是简单的使用了css-loader和style-loader。
    css-loader将项目导入的css样式转为js模块，打包到main.js内。
    style-loader在main.js内提供了一个能将css动态插入到html内的方法。
    当用户打开页面时，会先加载html,然后加载main.js,最后运行js脚本将样式插入到style标签内。
    这样有多个缺点：

    css被打包到了main.js内，增加了它的文件大小，而且也不方便对css做缓存
    css样式得等到main.js脚本运行，并插入到html时才会有效果。这个空档期虽然很短，但它会造成界面闪烁。
```

### 优点：

```
打包速度快

    所以style-loader与css-loader的组合仅适用于开发。我们需要使用mini-css-extract插件，并用该插件提供的loader来替代style-loader。

缓存处理

    缓存是前端页面性能优化的重点。我们希望浏览器能长久缓存资源，同时又能在第一时间获取更新后的资源。
    具体思路是：后端不对index.html做任何缓存处理，对css、js、图片等资源做持久缓存。将output.filename配置为"main.[contentHash].js",这样打包后的main.js中间会加上一段contentHash。contentHash是根据打包文件内容产生的，内容改变它才会发生改变。发布时，由于哈希值不同，服务器能同时保存着不同哈希版本的资源。这样保证了发布过程中，用户仍然能够访问到旧资源,并且新用户会访问到新资源。
    加上contentHash后打包文件名变成main.xxxxxx.js，其中xxxxxx代表一串很长的哈希值。
    但是，现在我们的业务代码、引用的第三方库，还有webpack生成的runtime都被捆绑打包到了main.xxxxxx.js内。第三方库和webpack的runtime变动的频率非常低，所以我们不希望每次业务代码的改动导致用户得连同它们一起重新下载一遍。因此我们需要将它们从main.xxxxxx.js内抽离出来。
    还有一点需要注意，webpack以前的版本有个小小的问题。在打包文件内容没发生变化的情况下contentHash任然会发生改变。此时需要使用webpack.HashedModuleIdsPlugin插件来替代默认的哈希生成。虽然webpack4修复了这个问题，但是官方文档还是推荐我们使用webpack.HashedModuleIdsPlugin插件。
    抽离第三方库与webpack runtime
    前面已经说明了为什么要抽离他们。
    以前的版本使用commons-chunk-plugin插件来抽离第三方库，webpack 4通过配置optimization.splitChunks来抽取。内部其实使用了split-chunks-plugin插件。
    将optimization.runtimeChunk选项配置为single,可以将webpack runtime抽离到单文件中。

js、css、html代码压缩

    打包后的js、css、html会有注释、空格、换行，开启代码压缩可以大幅度减少资源的体积。
    在mode设为"production"时，会默认使用terser-webpack-plugin插件对js进行压缩。我们还要开启html与css的压缩，所以要重写optimization.minimizer选项。

使用source-map替代inline-source-map

    发生bug时，我们很难通过打包后的代码找出错误的源头。所以我们需要source map将代码映射为原来我们手写时候的样子。
    前面的webpack.dev.js内使用的是inline-source-map。它的缺点是将map内敛到了代码内，这样用户会连同资源将map一起下载。
    所以我们使用source-map,它会给打包后的每个js单独生成.map文件。
    懒加载（lazy loading）
    懒加载也叫按需加载。我们当前打包的所有js会在页面加载过程中被加载运行。但是大多数情况下，用户并不会访问应用的所有页面与功能。我们可以将每个页面的代码或一些不常使用的功能模块做成按需加载，这样可以大大减小用户初次访问时所要加载的资源大小。
    懒加载是webpack4默认支持的，不需要任何配置。前端人员需要在开发时使用dynamic import按需引入模块。webpack会自动将dynamic import引入的模块单独打包为一个chunk（注意：dynamic import语法上需要babel插件的支持，会在下一章节提到该插件）。

清空dist目录

    使用clean-webpack-plugin在打包前清空dist目录。

```





