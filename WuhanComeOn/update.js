const fs = require('fs');
const CHIAN_PROVINCE = [
  '全国',
  // 23个省
  '广东', '青海', '四川', '海南', '陕西',
  '甘肃', '云南', '湖南', '湖北', '黑龙江',
  '贵州', '山东', '江西', '河南', '河北',
  '山西', '安徽', '福建', '浙江', '江苏',
  '吉林', '辽宁', '台湾',
  // 5个自治区
  '新疆', '广西', '宁夏', '内蒙古', '西藏',
  // 4个直辖市
  '北京', '天津', '上海', '重庆',
  // 2个特别行政区
  '香港', '澳门'
];

function write(data) {
  fs.writeFileSync('data.csv', data, { flag: 'a' });
}

function writeHead() {
  const head = '时间,省份,确诊,疑似,治愈,死亡';
  write(head);
}

function writeTime(time) {
  let lines = ['\n'];
  CHIAN_PROVINCE.forEach(pro => {
    lines.push(`${time},${pro},0,0,0,0`);
  });
  lines = lines.join('\n');
  write(lines);
}

// writeHead();
writeTime('2020/1/28');
