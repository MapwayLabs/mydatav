# force3d

整体项目组织方式 MVC 结构。

Model层包括：Graph类

View层包括：Drawing类，MouseStream类

Controller层包括：layoutController、grap2DController...

1. 代码结构都是根据示例网站功能逻辑设计，如果增加一些新功能，代码逻辑也要跟着变，改变成本需根据具体功能预测。
2. 示例网站对渲染性能做了一些优化，但也因此舍弃了一些功能，所以在性能和功能间需要做取舍。（比如线的加粗）