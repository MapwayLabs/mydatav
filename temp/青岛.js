(function extendWindow(defines) {
            function defineROP(k, value){
                Object.defineProperty(window, k, {
                    get: function(){ return defines[k] },
                    set: function(){ throw new Error('defines.js READ ONLY!!') }
                });
            }
            for(var k in defines){
                defineROP(k, defines[k]);
            }
         })({"HOST_INDEX":"www.bdp.cn","HOST_WS":":9990","STATIC_PREFIX":"","FEATURE_ENTERPRISEONLY":true,"FEATURE_PERSONALONLY":false,"GIS_CFG":"{\"USE_CUSTOM_MAP\":true,\"MAP_COORDTYPE\":\"bd09ll\",\"DEFAULT_CENTER\":{\"lng\":120.3163,\"lat\":36.12167},\"DEFAULT_ZOOM\":6, \"MIN_ZOOM\": 5, \"MAX_ZOOM\": 15, \"CUSTOM_CRS\": {\"code\": \"EPSG:4326\", \"proj4def\": \"+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs\", \"options\": {\"origin\": [-180,90],\"bounds2\":[[119.431141,35.455815],[121.120511,37.246858]], \"resolutions\": [0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 0.0006866455078125, 0.00034332275390625, 0.000171661376953125, 0.0000858306884765625, 0.00004291534423828125, 0.000021457672119140625, 0.000010728836059570312, 0.000005364418029785156, 0.000002682209014892578, 0.000001341104507446289, 6.705522537231445e-7, 3.3527612686157227e-7]}}, \"CUSTOM_CRS2\":\"EPSG3857\",\"DARK_LAYERS\":[{\"url\":\"http://10.49.129.220:9080/EzServer/Maps/qdsl2018/EzMap?Service=getImage&Type=RGB&ZoomOffset=4&Col={x}&Row={y}&Zoom={z}&V=1.0.0\",\"name\":\"PGIS地图\"}],\"LIGHT_LAYERS\":[{\"url\":\"http://10.49.129.220:9080/EzServer/Maps/qdsl2018/EzMap?Service=getImage&Type=RGB&ZoomOffset=4&Col={x}&Row={y}&Zoom={z}&V=1.0.0\",\"name\":\"PGIS地图\"}]}","DEBUG":false,"CUSTOM_CONFIG":"{\"SHOW_LOGIN_ANI\":false,\"SHOW_LOGIN_APP\":false,\"HTML_TITLE\":\"\",\"LOGO_PATH\":\"\",\"CHROME_PATH\":\"\",\"SHOW_MACHINE_LEARNING\":true,\"SHOW_DATA_SCREEN\":true,\"SHOW_ADV_DASH\":true,\"USE_CUSTOM_CHART\":true}","FEATURE_SASSONLY":false,"FEATURE_SAASONLY":true})
