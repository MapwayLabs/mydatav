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
    })({"HOST_INDEX":"www.bdp.cn","HOST_WS":":9990","STATIC_PREFIX":"","FEATURE_ENTERPRISEONLY":false,"FEATURE_PERSONALONLY":false,"GIS_CFG":"{\"USE_CUSTOM_MAP\":true,\"MAP_COORDTYPE\":\"bd09ll\",\"DEFAULT_CENTER\":{\"lng\":104.07,\"lat\":30.67},\"DEFAULT_ZOOM\":4,\"CUSTOM_CRS\":{\"code\":\"EPSE:3395\",\"proj4def\":\"+proj=longlat +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs\",\"options\":{\"origin\":[-5123200.0,1.00021E7],\"resolutions\":[2,1,0.5,0.25,0.125,0.0625,0.03125,0.015625,0.0078125,0.00390625,0.001953125,0.0009765625,0.00048828125,0.000244140625,0.0001220703125,0.00006103515625,0.000030517578125,0.0000152587890625,0.00000762939453125,0.000003814697265625,0.0000019073486328125,9.5367431640625e-7,4.76837158203125e-7],\"bounds\":[[0,0],[10000,10000]]}},\"DARK_LAYERS\":[{\"url\":\"http://10.4.1.69:6080/arcgis/rest/services/gis/all_map_2018_09_28/MapServer/tile/{z}/{y}/{x}\",\"name\":\"图层\",\"options\":{\"subdomains\":[\"1\",\"2\",\"3\",\"4\"]}}],\"LIGHT_LAYERS\":[{\"url\":\"http://10.4.1.69:6080/arcgis/rest/services/gis/all_map_2018_09_28/MapServer/tile/{z}/{y}/{x}\",\"name\":\"图层\",\"options\":{\"subdomains\":[\"1\",\"2\",\"3\",\"4\"]}}]}","DEBUG":false,"CUSTOM_CONFIG":"{\"SHOW_LOGIN_ANI\":false,\"SHOW_LOGIN_APP\":true,\"HTML_TITLE\":\"PDP警务数据分析平台\",\"LOGO_PATH\":\"\",\"CHROME_PATH\":\"\",\"SHOW_MACHINE_LEARNING\":true,\"SHOW_DATA_SCREEN\":true,\"SHOW_ADV_DASH\":true,\"USE_CUSTOM_CHART\":true,\"UPLOAD_EXCELMAXSIZE\":100,\"UPLOAD_CSVMAXSIZE\":200,\"PWD_USE_AES\":false}","BUNDLE_MARK":0,"FEATURE_SASSONLY":false,"FEATURE_SAASONLY":false})
