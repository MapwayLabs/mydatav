```js
const treeData = {
    dataSets:[/*数据列表*/],
    layers: [/*图层列表，图层描述信息（可根据图层id到dataSets取数据）*/],
    mapState: {/*地图状态配置信息 */},
    toolConfig: {/*工具箱配置信息（可根据图层id获取到对应图层的工具） */},
    baseMap:{/*底图配置信息*/}
}
```

```js
const interactionConfig = {
    "tooltip": {
        "id": "tooltip",
        "enabled": true,
        "config": {
            "fieldsToShow": {
                "yhc4mxsry": [
                    "name",
                    "code",
                    "address",
                    "entries",
                    "exits"
                ]
            }
        }
    },
    "brush": {
        "id": "brush",
        "enabled": false,
        "config": {
            "size": 0.5
        }
    },
    "coordinate": {
        "id": "coordinate",
        "enabled": false,
        "position": null
    }
}
```