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
         })({"HOST_INDEX":"www.bdp.cn","HOST_WS":":9990","STATIC_PREFIX":"","FEATURE_ENTERPRISEONLY":true,"FEATURE_PERSONALONLY":false,"GIS_CFG":"{\"USE_CUSTOM_MAP\":true,\"MAP_COORDTYPE\":\"bd09ll\",\"DEFAULT_CENTER\":{\"lng\":120.3163,\"lat\":36.12167},\"DEFAULT_ZOOM\":6,\"CUSTOM_CRS\": {\"code\": \"EPSG:4326\", \"proj4def\": \"+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs\", \"options\": {\"origin\": [-180,90],\"bounds2\":[[119.431141,35.455815],[121.120511,37.246858]], \"resolutions\": [2,1,0.5,0.25,0.125,0.0625,0.03125,0.015625,0.0078125,0.00390625,0.001953125,0.0009765625,0.00048828125,0.000244140625,0.0001220703125,0.00006103515625,0.000030517578125,0.0000152587890625,0.00000762939453125,0.000003814697265625,0.0000019073486328125,9.5367431640625e-7,4.76837158203125e-7]}}, \"CUSTOM_CRS2\":\"EPSG3857\",\"DARK_LAYERS\":[{\"url\":\"http://10.49.129.220:9080/EzServer/Maps/qdsl2018/EzMap?Service=getImage&Type=RGB&ZoomOffset=4&Col={x}&Row={y}&Zoom={z}&V=1.0.0\",\"name\":\"PGIS地图\"}],\"LIGHT_LAYERS\":[{\"url\":\"http://10.49.129.220:9080/EzServer/Maps/qdsl2018/EzMap?Service=getImage&Type=RGB&ZoomOffset=4&Col={x}&Row={y}&Zoom={z}&V=1.0.0\",\"name\":\"PGIS地图\"}]}","DEBUG":false,"CUSTOM_CONFIG":"{\"SHOW_LOGIN_ANI\":false,\"SHOW_LOGIN_APP\":false,\"HTML_TITLE\":\"\",\"LOGO_PATH\":\"\",\"CHROME_PATH\":\"\",\"SHOW_MACHINE_LEARNING\":true,\"SHOW_DATA_SCREEN\":true,\"SHOW_ADV_DASH\":true,\"USE_CUSTOM_CHART\":true}","FEATURE_SASSONLY":false,"FEATURE_SAASONLY":true})
