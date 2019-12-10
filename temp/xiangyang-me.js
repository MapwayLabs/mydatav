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
        })({"HOST_INDEX":"www.bdp.cn","HOST_WS":":9990","STATIC_PREFIX":"","FEATURE_ENTERPRISEONLY":false,"FEATURE_PERSONALONLY":false,"GIS_CFG":"{\"USE_CUSTOM_MAP\":true,\"MAP_COORDTYPE\":\"bd09ll\",\"DEFAULT_CENTER\":{\"lng\":114.30,\"lat\":30.60},\"DEFAULT_ZOOM\":9,\"CUSTOM_CRS\":\"EPSG4326\",\"DARK_LAYERS\":[{\"url\":\"http://10.139.186.194:8080/PGIS_S_LWTileMap/Maps/SL/EzMap?Service=getImage&Type=RGB&ZoomOffset=1&Col={x}&Row={y}&Zoom={z}&V=1.0.0\",\"name\":\"PGIS地图\"}],\"LIGHT_LAYERS\":[{\"url\":\"http://10.139.186.194:8080/PGIS_S_LWTileMap/Maps/SL/EzMap?Service=getImage&Type=RGB&ZoomOffset=1&Col={x}&Row={y}&Zoom={z}&V=1.0.0\",\"name\":\"PGIS地图\"}]}","DEBUG":false,"CUSTOM_CONFIG":"{\"SHOW_LOGIN_ANI\":false,\"SHOW_LOGIN_APP\":false,\"HTML_TITLE\":\"\",\"LOGO_PATH\":\"\",\"CHROME_PATH\":\"\",\"SHOW_MACHINE_LEARNING\":false,\"SHOW_DATA_SCREEN\":false,\"SHOW_ADV_DASH\":true,\"USE_CUSTOM_CHART\":true,\"UPLOAD_EXCELMAXSIZE\":100,\"UPLOAD_CSVMAXSIZE\":200,\"PWD_USE_AES\":false,\"HIDE_PASSWORD_WEAK_TIP\":false,\"CREATE_USER_NO_CHECK\":true,\"HIDE_GENERATE_COORDINATE\":false,\"SHOW_DOMAIN\":true,\"DOMAIN\":\"\",\"SHOW_FRIEND_LINK\":false,\"HELP_PATH\":\"\",\"KNOWLEDGE_PATH\":\"\",\"TRAINING_PATH\":\"\",\"USE_MPS_NAV_BG\":false,\"USE_AUTHORIZED\":false,\"GRAFT_OPEN\":true,\"VIEW_MODEL\":true,\"NET_EXPORT_WORD\":false,\"SHOW_NET_ON\":true,\"HIDE_HEADER\":true,\"PICTURE_LINK\":true,\"SHOW_ADAPTIVE_FULL_SCREEN\":true}","BUNDLE_MARK":0,"FEATURE_SASSONLY":false,"FEATURE_SAASONLY":false})