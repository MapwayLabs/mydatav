(function extendWindow(defines) {
  function defineROP(k, value) {
      Object.defineProperty(window, k, {
          get: function() {
              return defines[k]
          },
          set: function() {
              throw new Error('defines.js READ ONLY!!')
          }
      });
  }
  for (var k in defines) {
      defineROP(k, defines[k]);
  }
}
)({
  "HOST_INDEX": "www.bdp.cn",
  "HOST_WS": ":9990",
  "STATIC_PREFIX": "",
  "FEATURE_ENTERPRISEONLY": false,
  "FEATURE_PERSONALONLY": false,
  "GIS_CFG": "{\"USE_CUSTOM_MAP\":false,\"MAP_COORDTYPE\":\"bd09ll\",\"DEFAULT_CENTER\":{\"lng\":105.403119,\"lat\":38.028658},\"DEFAULT_ZOOM\":5,\"DARK_LAYERS\":[{\"url\":\"https://wprd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}&scl=2&ltype=11\",\"name\":\"高德地图\",\"options\":{\"subdomains\":[\"1\",\"2\",\"3\",\"4\"]}},{\"url\":\"https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}\",\"name\":\"高德影像\",\"options\":{\"subdomains\":[\"1\",\"2\",\"3\",\"4\"]}}],\"LIGHT_LAYERS\":[{\"url\":\"https://wprd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}&scl=2&ltype=11\",\"name\":\"高德地图\",\"options\":{\"subdomains\":[\"1\",\"2\",\"3\",\"4\"]}},{\"url\":\"https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}\",\"name\":\"高德影像\",\"options\":{\"subdomains\":[\"1\",\"2\",\"3\",\"4\"]}}]}",
  "DEBUG": false,
  "CUSTOM_CONFIG": "{\"SHOW_LOGIN_ANI\":false,\"SHOW_LOGIN_APP\":false,\"HTML_TITLE\":\"\",\"LOGO_PATH\":\"\",\"CHROME_PATH\":\"\",\"SHOW_MACHINE_LEARNING\":false,\"SHOW_DATA_SCREEN\":false,\"SHOW_ADV_DASH\":true,\"USE_CUSTOM_CHART\":true,\"UPLOAD_EXCELMAXSIZE\":100,\"UPLOAD_CSVMAXSIZE\":200,\"PWD_USE_AES\":false,\"HIDE_PASSWORD_WEAK_TIP\":false,\"CREATE_USER_NO_CHECK\":true,\"HIDE_GENERATE_COORDINATE\":false,\"SHOW_DOMAIN\":true,\"DOMAIN\":\"\",\"SHOW_FRIEND_LINK\":false,\"HELP_PATH\":\"\",\"KNOWLEDGE_PATH\":\"\",\"TRAINING_PATH\":\"\",\"USE_MPS_NAV_BG\":false,\"USE_AUTHORIZED\":false,\"PICTURE_LINK\":true,\"NET_EXPORT_WORD\":true,\"SHOW_NET_ON\":true,\"COPYRIGHT_TEXT\":\"\",\"SHOW_BACKHOME\":false,\"WELCOME_TEXT\":\"\",\"LOGO_JUMP\":false,\"HIDE_BROWSER_CHECK\":true,\"SHOW_PRODUCT\":false,\"SHOW_DOWNLOAD\":false,\"TRY_BDP\":\"\",\"SHOW_FORGET_PASSWORD\":false,\"LOGIN_PATH\":\"local-login.html\",\"VIEW_MODEL\":false,\"QUERY_ENGINE\":\"default\",\"BDP_HOME\":\"\",\"GRAFT_OPEN\":false,\"CUSTOM_DOMAIN\":\"企业域\",\"LOGO_HREF_PATH\":\"#\",\"ACCOUNT_LOGIN_PATH\":\"\",\"WATER_MARK\":\"\",\"SHOW_SHARE\":true,\"SHOW_ADAPTIVE_FULL_SCREEN\":true}",
  "BUNDLE_MARK": 0,
  "FEATURE_SASSONLY": false,
  "FEATURE_SAASONLY": false
})