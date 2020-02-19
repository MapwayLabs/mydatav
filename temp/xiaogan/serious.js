import {
  doPost,
  doGet
} from '@/utils/server'

// 确诊人员详情
const diagnosePeoPleData = [
  {
      "name": "李玲",
      "phone": "11f111",
      "idCard": "11f1",
      "date": "02-03"
  },
  {
     "name": "李玲",
      "phone": "11111",
      "idCard": "111",
      "date": "02-03"
  },
  {
    "name": "李玲里",
     "phone": "13888f8888888",
     "idCard": "42142f94388823828282",
     "date": "02-03"
 },
 {
  "name": "李玲里",
   "phone": "13888s8888888",
   "idCard": "421429438e8823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888ew888888",
   "idCard": "4214294t388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "1388t88888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "1388888v88888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "李玲里",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
},
{
  "name": "结束结束",
   "phone": "138888888888",
   "idCard": "4214294388823828282",
   "date": "02-03"
}
];

const liveTogetherData = diagnosePeoPleData;

// 确诊人员详情
export function diagnosePeoPleList(data) {
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      message: 'success',
      data: diagnosePeoPleData
    });
  });
  // return doGet('/em/keyp/detail', data);
}

// 确诊人员同居人员
export function liveTogetherList(data) {
  // return new Promise((resolve, reject) => {
  //   resolve(liveTogetherData);
  // });
  return doGet('/em/keyp/relevance', data)
}

// 指标卡数据
export function cardData(data) {
  return doGet('/em/keyp/kpi', data)
}

// 地图数据图层1-确诊人员14天基站位置
export function mapData1(data) {
  return doGet('/em/keyp/map/fl', data)
}

// 地图数据图层2-确诊人员通联关系人基站位置
export function mapData2(data) {
  return doGet('/em/keyp/map/sl', data)
}

export function seriousMapDataAll(data) {
  return Promise.all([ mapData1(data), mapData2(data) ]);
}

//  疫情重点群体
export function keypCountyList(data) {
  return doGet('/em/keyp/county', data)
}

//  疫情重点人户籍分布
export function keypCensusList(data) {
  return doGet('/em/keyp/census', data)
}

//  疫情重点人轨迹详情
export function keypTraceList(data) {
  return doGet('/em/keyp/trace', data)
}





