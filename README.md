# 阅读+电影查阅小程序

## 目录结构描述

```
|-- FirstApplets
    |-- app.js
    |-- app.json
    |-- app.wxss
    |-- project.config.json
    |-- README.md
    |-- sitemap.json
    |-- data                                       // 为阅读页面提供本地模拟数据
    |   |-- posts-data.js
    |-- images                                     // 图片
    |-- pages                                      // 页面
    |   |-- movies                                 //电影页面
    |   |   |-- movies.js
    |   |   |-- movies.json
    |   |   |-- movies.wxml
    |   |   |-- movies.wxss
    |   |   |-- more-movies                       // 更多电影页面
    |   |   |   |-- more-movies.js
    |   |   |   |-- more-movies.json
    |   |   |   |-- more-movies.wxml
    |   |   |   |-- more-movies.wxss
    |   |   |-- movie                             // 单个电影
    |   |   |   |-- movie-template.wxml
    |   |   |   |-- movie-template.wxss
    |   |   |-- movie-detail                      // 电影详情页
    |   |   |   |-- movie-detail.js
    |   |   |   |-- movie-detail.json
    |   |   |   |-- movie-detail.wxml
    |   |   |   |-- movie-detail.wxss
    |   |   |-- movie-grid                        // 更多及搜索
    |   |   |   |-- movie-grid-template.wxml
    |   |   |   |-- movie-grid-template.wxss
    |   |   |-- movie-list                        // 电影分类
    |   |   |   |-- movie-list-template.wxml
    |   |   |   |-- movie-list-template.wxss
    |   |   |-- stars                             // 星星评分
    |   |       |-- stars-template.wxml
    |   |       |-- stars-template.wxss
    |   |-- posts                                 // 文章部分
    |   |   |-- posts.js
    |   |   |-- posts.json
    |   |   |-- posts.wxml
    |   |   |-- posts.wxss
    |   |   |-- post-detail                     // 文章详情
    |   |   |   |-- post-detail.js
    |   |   |   |-- post-detail.json
    |   |   |   |-- post-detail.wxml
    |   |   |   |-- post-detail.wxss
    |   |   |-- post-item                       // 文章简介
    |   |       |-- post-item-template.wxml
    |   |       |-- post-item-template.wxss
    |   |-- welcome                             // 欢迎页面
    |       |-- welcome.js
    |       |-- welcome.json
    |       |-- welcome.wxml
    |       |-- welcome.wxss
    |-- utils                                    // 公共方法 
        |-- utils.js
```



## 注：

打开微信小程序工具右上角的详情——项目设置 ，将“不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书”勾选上 