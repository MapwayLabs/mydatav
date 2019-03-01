   function lngLatToGlobal(lng, lat, alt = 0) {
       const phi = lng * (Math.PI / 180);
       const theta = lat * (Math.PI / 180);
       const radius = 1;
       const x = (radius * Math.sin(phi) * Math.cos(theta));
       const z = (radius * Math.cos(phi) * Math.cos(theta));
       const y = (radius * Math.sin(theta));
       return [x, y, z];
   }

   function globalToLnglat(worldPoint) {
       const x = worldPoint[0];
       const y = worldPoint[1];
       const z = worldPoint[2];
       const r = 1;
       const theta = Math.asin(y / r);
       let lng = Math.acos(z / (r * Math.cos(theta))) * 180 / Math.PI;
       let lat = theta * 180 / Math.PI;
       if (x < 0) {
           lng = -lng;
       }
       return [lng, lat];
   }

   console.log('输入经纬度：[0, 0]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(0, 0)));

   console.log('-----------------------');

   console.log('输入经纬度：[90, 0]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(90, 0)));

   console.log('-----------------------');

   console.log('输入经纬度：[180, 0]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(180, 0)));

   console.log('-----------------------');

   console.log('输入经纬度：[-90, 0]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(-90, 0)));

   console.log('-----------------------');

   console.log('输入经纬度：[-180, 0]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(-180, 0)));

   console.log('-----------------------');

   console.log('输入经纬度：[0, 90]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(0, 90)));

   console.log('-----------------------');

   console.log('输入经纬度：[0, -90]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(0, -90)));

   console.log('-----------------------');

   console.log('输入经纬度：[45, 45]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(45, 45)));

   console.log('-----------------------');

   console.log('输入经纬度：[135, 45]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(135, 45)));

   console.log('-----------------------');

   console.log('输入经纬度：[-45, 45]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(-45, 45)));

   console.log('-----------------------');

   console.log('输入经纬度：[-135, 45]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(-135, 45)));

   console.log('-----------------------');

   console.log('输入经纬度：[45, -45]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(45, -45)));

   console.log('-----------------------');

   console.log('输入经纬度：[135, -45]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(135, -45)));

   console.log('-----------------------');

   console.log('输入经纬度：[-45, -45]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(-45, -45)));

   console.log('-----------------------');

   console.log('输入经纬度：[-135, -45]');
   console.log('球面转经纬度：' + globalToLnglat(lngLatToGlobal(-135, -45)));