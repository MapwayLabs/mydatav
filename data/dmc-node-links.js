var data = {
  "position": "299.75 9",
  "node_meta": [
    {
      "status": 1,
      "loc": "72 103",
      "nodeType": "base_tb",
      "is_streaming": 0,
      "title": "河北女重点嫌疑人",
      "originType": "flow",
      "streaming_node": 0,
      "meta": {
        "fields": [
          {
            "formula": null,
            "title": "考号",
            "type": "string",
            "id": "fke6bf5e0f",
            "desc": ""
          },
          {
            "formula": null,
            "title": "姓名",
            "type": "string",
            "id": "fk60d0458a",
            "desc": ""
          },
          {
            "formula": null,
            "title": "性别",
            "type": "string",
            "id": "fk787b5677",
            "desc": ""
          },
          {
            "formula": null,
            "title": "省份",
            "type": "string",
            "id": "fkd7009d07",
            "desc": ""
          },
          {
            "formula": null,
            "title": "语文",
            "type": "double",
            "id": "fk9a0d10a4",
            "desc": ""
          },
          {
            "formula": null,
            "title": "数学",
            "type": "double",
            "id": "fk6e658318",
            "desc": ""
          },
          {
            "formula": null,
            "title": "英语",
            "type": "double",
            "id": "fk4145d4c1",
            "desc": ""
          },
          {
            "formula": null,
            "title": "政治",
            "type": "double",
            "id": "fkac3b6106",
            "desc": ""
          },
          {
            "formula": null,
            "title": "美术",
            "type": "double",
            "id": "fk1bacdf2d",
            "desc": ""
          },
          {
            "formula": null,
            "title": "体育",
            "type": "double",
            "id": "fkb0dc2f50",
            "desc": ""
          },
          {
            "formula": null,
            "title": "信息",
            "type": "double",
            "id": "fkd8c7e04c",
            "desc": ""
          },
          {
            "formula": null,
            "title": "总分",
            "type": "double",
            "id": "fk8a74afdc",
            "desc": ""
          },
          {
            "formula": null,
            "title": "平均分",
            "type": "double",
            "id": "fk3569877e",
            "desc": ""
          }
        ],
        "tb_id": "tb_714f1b97268740c495f61d48fa42953a",
        "data_count": 23,
        "title": "河北女重点嫌疑人"
      },
      "parents": [],
      "key": "input60799ca7e839etl",
      "__gohashid": 2418,
      "type": "input"
    },
    {
      "status": 1,
      "loc": "70 250",
      "nodeType": "base_tb",
      "is_streaming": 0,
      "title": "主题表生成演示规则-法院刑事判决信息",
      "originType": "excel",
      "streaming_node": 0,
      "meta": {
        "fields": [
          {
            "formula": null,
            "title": "身份证号",
            "type": "string",
            "id": "fka5e3059d",
            "desc": ""
          },
          {
            "formula": null,
            "title": "姓名",
            "type": "string",
            "id": "fk7777288b",
            "desc": ""
          },
          {
            "formula": null,
            "title": "性别",
            "type": "string",
            "id": "fk981baf4f",
            "desc": ""
          },
          {
            "formula": null,
            "title": "案件编号",
            "type": "string",
            "id": "fkfaee8807",
            "desc": ""
          }
        ],
        "tb_id": "tb_758a31234f02437eab35c50cd6b6d67a",
        "data_count": 9,
        "title": "主题表生成演示规则-法院刑事判决信息"
      },
      "parents": [],
      "key": "input8911a416e902etl",
      "__gohashid": 2537,
      "type": "input"
    },
    {
      "status": 1,
      "loc": "70 390",
      "nodeType": "base_tb",
      "is_streaming": 0,
      "title": "重点人员排查名单",
      "originType": "flow",
      "streaming_node": 0,
      "meta": {
        "fields": [
          {
            "formula": null,
            "title": "订房人姓名",
            "type": "string",
            "id": "fk6fe7e52a",
            "desc": null
          },
          {
            "formula": null,
            "title": "订房人身份证号",
            "type": "string",
            "id": "fk318f3344",
            "desc": null
          }
        ],
        "tb_id": "tb_87ca325ce50f43c7af74cb2d833d068f",
        "data_count": 0,
        "title": "重点人员排查名单"
      },
      "parents": [],
      "key": "inputfe9dabace641etl",
      "__gohashid": 2981,
      "type": "input"
    },
    {
      "status": 0,
      "loc": "310 -80",
      "nodeType": "translate",
      "title": "数据过滤",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "input60799ca7e839etl"
      ],
      "key": "data_filter34d0639880afetl",
      "__gohashid": 4034,
      "type": "data_filter"
    },
    {
      "status": 0,
      "loc": "280 200",
      "nodeType": "translate",
      "title": "数据过滤",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "input60799ca7e839etl"
      ],
      "key": "data_filter92bcde6f4594etl",
      "__gohashid": 4070,
      "type": "data_filter"
    },
    {
      "status": 0,
      "loc": "310 360",
      "nodeType": "translate",
      "title": "数据过滤",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "input8911a416e902etl"
      ],
      "key": "data_filter9d91b3b912c8etl",
      "__gohashid": 4105,
      "type": "data_filter"
    },
    {
      "status": 1,
      "loc": "70 550",
      "nodeType": "base_tb",
      "is_streaming": 0,
      "title": "人员名单",
      "originType": "flow",
      "streaming_node": 0,
      "meta": {
        "fields": [
          {
            "formula": null,
            "title": "持机人姓名",
            "type": "string",
            "id": "fk2ed21405",
            "desc": null
          },
          {
            "formula": null,
            "title": "持机人身份证号",
            "type": "string",
            "id": "fk504ed3dd",
            "desc": null
          },
          {
            "formula": null,
            "title": "关系人电话号",
            "type": "string",
            "id": "fk0590a2c6",
            "desc": null
          },
          {
            "formula": null,
            "title": "关系人名称",
            "type": "string",
            "id": "fk90da5d8d",
            "desc": null
          },
          {
            "formula": null,
            "title": "案件编号",
            "type": "string",
            "id": "fk8aabe317",
            "desc": null
          }
        ],
        "tb_id": "tb_575e0a267e1e4cde88f46176060ee1c0",
        "data_count": 0,
        "title": "人员名单"
      },
      "parents": [],
      "key": "input681e81aa6be6etl",
      "__gohashid": 6854,
      "type": "input"
    },
    {
      "status": 0,
      "loc": "373 486",
      "nodeType": "translate",
      "title": "交集",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "inputfe9dabace641etl",
        "input681e81aa6be6etl"
      ],
      "key": "join3e413e1f3364etl",
      "__gohashid": 8438,
      "type": "join"
    },
    {
      "status": 0,
      "loc": "560 30",
      "nodeType": "translate",
      "title": "数据过滤",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "alter_field9fbdd5abaabdetl"
      ],
      "key": "data_filter0712487009ceetl",
      "__gohashid": 9250,
      "type": "data_filter"
    },
    {
      "status": 0,
      "loc": "610 -90",
      "nodeType": "translate",
      "title": "数据过滤",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "left_joinab710ceb431betl"
      ],
      "key": "data_filtere6f283494b13etl",
      "__gohashid": 9285,
      "type": "data_filter"
    },
    {
      "status": 0,
      "loc": "730 30",
      "nodeType": "translate",
      "title": "数据过滤",
      "isHaveOutput": true,
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "data_filter0712487009ceetl"
      ],
      "key": "data_filterf751674c09c4etl",
      "__gohashid": 9320,
      "type": "data_filter"
    },
    {
      "status": 0,
      "loc": "460 -90",
      "nodeType": "translate",
      "title": "修改字段",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "data_filter34d0639880afetl"
      ],
      "key": "alter_field9fbdd5abaabdetl",
      "__gohashid": 9355,
      "type": "alter_field"
    },
    {
      "status": 0,
      "loc": "580 110",
      "nodeType": "translate",
      "title": "修改字段",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "join3e413e1f3364etl"
      ],
      "key": "alter_field5dd720b4c94fetl",
      "__gohashid": 9391,
      "type": "alter_field"
    },
    {
      "status": 0,
      "loc": "550 230",
      "nodeType": "translate",
      "title": "修改字段",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "data_filter9d91b3b912c8etl"
      ],
      "key": "alter_field036e17998ff4etl",
      "__gohashid": 9426,
      "type": "alter_field"
    },
    {
      "status": 0,
      "loc": "520 350",
      "nodeType": "translate",
      "title": "修改字段",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "data_filter9d91b3b912c8etl"
      ],
      "key": "alter_fieldd5679a5bc012etl",
      "__gohashid": 9469,
      "type": "alter_field"
    },
    {
      "status": 0,
      "loc": "570 540",
      "nodeType": "translate",
      "title": "修改字段",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "data_filter9d91b3b912c8etl"
      ],
      "key": "alter_fieldf3a62959844aetl",
      "__gohashid": 9535,
      "type": "alter_field"
    },
    {
      "status": 0,
      "loc": "370 610",
      "nodeType": "translate",
      "title": "修改字段",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "input681e81aa6be6etl"
      ],
      "key": "alter_fieldc5923fd7267betl",
      "__gohashid": 9592,
      "type": "alter_field"
    },
    {
      "status": 0,
      "loc": "370 50",
      "nodeType": "translate",
      "title": "左连接",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "data_filter34d0639880afetl",
        "data_filter92bcde6f4594etl"
      ],
      "key": "left_joinab710ceb431betl",
      "__gohashid": 10990,
      "type": "left_join"
    },
    {
      "status": 0,
      "loc": "440 150",
      "nodeType": "translate",
      "title": "交集",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "data_filter92bcde6f4594etl",
        "data_filter9d91b3b912c8etl"
      ],
      "key": "joina1cd9b090d13etl",
      "__gohashid": 18130,
      "type": "join"
    },
    {
      "status": 0,
      "loc": "752 134.5",
      "nodeType": "translate",
      "title": "交集",
      "isHaveOutput": true,
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "joina1cd9b090d13etl",
        "data_filtere6f283494b13etl"
      ],
      "key": "joine39729d6bd9detl",
      "__gohashid": 20043,
      "type": "join"
    },
    {
      "status": 0,
      "loc": "861 68.5",
      "nodeType": "translate",
      "title": "全关联",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "data_filterf751674c09c4etl",
        "joine39729d6bd9detl"
      ],
      "key": "full_joind744c994be21etl",
      "__gohashid": 20638,
      "type": "full_join"
    },
    {
      "status": 0,
      "loc": "770 300",
      "nodeType": "translate",
      "title": "SQL",
      "isHaveOutput": true,
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "alter_field5dd720b4c94fetl",
        "alter_field036e17998ff4etl",
        "alter_fieldd5679a5bc012etl",
        "alter_fieldf3a62959844aetl",
        "alter_fieldc5923fd7267betl",
        "anti_join1cd90185fcc0etl"
      ],
      "key": "sql6798b7003d2detl",
      "__gohashid": 21717,
      "type": "sql"
    },
    {
      "status": 0,
      "loc": "852 -90.5",
      "nodeType": "translate",
      "title": "SQL",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "data_filter0712487009ceetl",
        "alter_field9fbdd5abaabdetl"
      ],
      "key": "sql307f97d3c8f0etl",
      "__gohashid": 22729,
      "type": "sql"
    },
    {
      "status": 0,
      "loc": "1000 150",
      "nodeType": "translate",
      "title": "交集",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "full_joind744c994be21etl",
        "sql6798b7003d2detl"
      ],
      "key": "joina93e483c81bdetl",
      "reject": true,
      "__gohashid": 27820,
      "type": "join"
    },
    {
      "status": 0,
      "loc": "1065 8",
      "nodeType": "translate",
      "title": "差集",
      "isHaveOutput": true,
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "sql307f97d3c8f0etl",
        "joina93e483c81bdetl"
      ],
      "key": "anti_join43d05339e459etl",
      "__gohashid": 28162,
      "type": "anti_join"
    },
    {
      "status": 0,
      "loc": "1180 110",
      "nodeType": "translate",
      "title": "输出4",
      "isHaveInput": true,
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "anti_join43d05339e459etl"
      ],
      "key": "output8ee745001897etl",
      "__gohashid": 30162,
      "type": "output"
    },
    {
      "status": 0,
      "loc": "660 610",
      "nodeType": "translate",
      "title": "差集",
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "alter_fieldc5923fd7267betl",
        "alter_fieldf3a62959844aetl"
      ],
      "key": "anti_join1cd90185fcc0etl",
      "__gohashid": 37245,
      "type": "anti_join"
    },
    {
      "status": 0,
      "loc": "790 440",
      "nodeType": "translate",
      "title": "输出1",
      "isHaveInput": true,
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "sql6798b7003d2detl"
      ],
      "key": "outputd8102ce86759etl",
      "__gohashid": 61351,
      "type": "output"
    },
    {
      "status": 0,
      "loc": "880 370",
      "nodeType": "translate",
      "title": "输出2",
      "isHaveInput": true,
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "joine39729d6bd9detl"
      ],
      "key": "outputa3740eeb87a1etl",
      "__gohashid": 61430,
      "type": "output"
    },
    {
      "status": 0,
      "loc": "970 280",
      "nodeType": "translate",
      "title": "输出3",
      "isHaveInput": true,
      "streaming_node": 0,
      "meta": {},
      "parents": [
        "data_filterf751674c09c4etl"
      ],
      "key": "output4064f9854861etl",
      "__gohashid": 61465,
      "type": "output"
    }
  ],
  "line_meta": [
    {
      "status": "dot",
      "to": "data_filter34d0639880afetl",
      "dash": [
        5,
        2
      ],
      "from": "input60799ca7e839etl",
      "__gohashid": 23542
    },
    {
      "status": "dot",
      "to": "data_filter92bcde6f4594etl",
      "dash": [
        5,
        2
      ],
      "from": "input60799ca7e839etl",
      "__gohashid": 23543
    },
    {
      "status": "dot",
      "to": "data_filter9d91b3b912c8etl",
      "dash": [
        5,
        2
      ],
      "from": "input8911a416e902etl",
      "__gohashid": 23544
    },
    {
      "status": "dot",
      "to": "join3e413e1f3364etl",
      "dash": [
        5,
        2
      ],
      "from": "inputfe9dabace641etl",
      "__gohashid": 23545
    },
    {
      "status": "dot",
      "to": "join3e413e1f3364etl",
      "dash": [
        5,
        2
      ],
      "from": "input681e81aa6be6etl",
      "__gohashid": 23546
    },
    {
      "status": "dot",
      "to": "alter_field9fbdd5abaabdetl",
      "dash": [
        5,
        2
      ],
      "from": "data_filter34d0639880afetl",
      "__gohashid": 23547
    },
    {
      "status": "dot",
      "to": "data_filter0712487009ceetl",
      "dash": [
        5,
        2
      ],
      "from": "alter_field9fbdd5abaabdetl",
      "__gohashid": 23548
    },
    {
      "status": "dot",
      "to": "data_filterf751674c09c4etl",
      "dash": [
        5,
        2
      ],
      "from": "data_filter0712487009ceetl",
      "__gohashid": 23549
    },
    {
      "status": "dot",
      "to": "left_joinab710ceb431betl",
      "dash": [
        5,
        2
      ],
      "from": "data_filter34d0639880afetl",
      "__gohashid": 23550
    },
    {
      "status": "dot",
      "to": "left_joinab710ceb431betl",
      "dash": [
        5,
        2
      ],
      "from": "data_filter92bcde6f4594etl",
      "__gohashid": 23551
    },
    {
      "status": "dot",
      "to": "data_filtere6f283494b13etl",
      "dash": [
        5,
        2
      ],
      "from": "left_joinab710ceb431betl",
      "__gohashid": 23552
    },
    {
      "status": "dot",
      "to": "alter_field036e17998ff4etl",
      "dash": [
        5,
        2
      ],
      "from": "data_filter9d91b3b912c8etl",
      "__gohashid": 23553
    },
    {
      "status": "dot",
      "to": "alter_fieldd5679a5bc012etl",
      "dash": [
        5,
        2
      ],
      "from": "data_filter9d91b3b912c8etl",
      "__gohashid": 23554
    },
    {
      "status": "dot",
      "to": "alter_fieldf3a62959844aetl",
      "dash": [
        5,
        2
      ],
      "from": "data_filter9d91b3b912c8etl",
      "__gohashid": 23555
    },
    {
      "status": "dot",
      "to": "alter_field5dd720b4c94fetl",
      "dash": [
        5,
        2
      ],
      "from": "join3e413e1f3364etl",
      "__gohashid": 23556
    },
    {
      "status": "dot",
      "to": "joina1cd9b090d13etl",
      "dash": [
        5,
        2
      ],
      "from": "data_filter92bcde6f4594etl",
      "__gohashid": 23557
    },
    {
      "status": "dot",
      "to": "joina1cd9b090d13etl",
      "dash": [
        5,
        2
      ],
      "from": "data_filter9d91b3b912c8etl",
      "__gohashid": 23558
    },
    {
      "status": "dot",
      "to": "joine39729d6bd9detl",
      "dash": [
        5,
        2
      ],
      "from": "joina1cd9b090d13etl",
      "__gohashid": 23559
    },
    {
      "status": "dot",
      "to": "joine39729d6bd9detl",
      "dash": [
        5,
        2
      ],
      "from": "data_filtere6f283494b13etl",
      "__gohashid": 23560
    },
    {
      "status": "dot",
      "to": "full_joind744c994be21etl",
      "dash": [
        5,
        2
      ],
      "from": "data_filterf751674c09c4etl",
      "__gohashid": 23561
    },
    {
      "status": "dot",
      "to": "full_joind744c994be21etl",
      "dash": [
        5,
        2
      ],
      "from": "joine39729d6bd9detl",
      "__gohashid": 23562
    },
    {
      "status": "dot",
      "to": "sql6798b7003d2detl",
      "dash": [
        5,
        2
      ],
      "from": "alter_field5dd720b4c94fetl",
      "__gohashid": 23563
    },
    {
      "status": "dot",
      "to": "sql6798b7003d2detl",
      "dash": [
        5,
        2
      ],
      "from": "alter_field036e17998ff4etl",
      "__gohashid": 23564
    },
    {
      "status": "dot",
      "to": "sql6798b7003d2detl",
      "dash": [
        5,
        2
      ],
      "from": "alter_fieldd5679a5bc012etl",
      "__gohashid": 23565
    },
    {
      "status": "dot",
      "to": "sql307f97d3c8f0etl",
      "dash": [
        5,
        2
      ],
      "from": "data_filter0712487009ceetl",
      "__gohashid": 23566
    },
    {
      "status": "dot",
      "to": "sql307f97d3c8f0etl",
      "dash": [
        5,
        2
      ],
      "from": "alter_field9fbdd5abaabdetl",
      "__gohashid": 23567
    },
    {
      "status": "dot",
      "to": "joina93e483c81bdetl",
      "dash": [
        5,
        2
      ],
      "from": "full_joind744c994be21etl",
      "__gohashid": 42727
    },
    {
      "status": "dot",
      "to": "joina93e483c81bdetl",
      "dash": [
        5,
        2
      ],
      "from": "sql6798b7003d2detl",
      "__gohashid": 42728
    },
    {
      "status": "dot",
      "to": "anti_join43d05339e459etl",
      "dash": [
        5,
        2
      ],
      "from": "sql307f97d3c8f0etl",
      "__gohashid": 42729
    },
    {
      "status": "dot",
      "to": "anti_join43d05339e459etl",
      "dash": [
        5,
        2
      ],
      "from": "joina93e483c81bdetl",
      "__gohashid": 42730
    },
    {
      "status": "dot",
      "to": "output8ee745001897etl",
      "dash": [
        5,
        2
      ],
      "from": "anti_join43d05339e459etl",
      "__gohashid": 42731
    },
    {
      "status": "dot",
      "to": "alter_fieldc5923fd7267betl",
      "dash": [
        5,
        2
      ],
      "from": "input681e81aa6be6etl",
      "__gohashid": 42732
    },
    {
      "status": "dot",
      "to": "sql6798b7003d2detl",
      "dash": [
        5,
        2
      ],
      "from": "alter_fieldf3a62959844aetl",
      "__gohashid": 42733
    },
    {
      "status": "dot",
      "to": "sql6798b7003d2detl",
      "dash": [
        5,
        2
      ],
      "from": "alter_fieldc5923fd7267betl",
      "__gohashid": 42734
    },
    {
      "status": "dot",
      "to": "anti_join1cd90185fcc0etl",
      "dash": [
        5,
        2
      ],
      "from": "alter_fieldc5923fd7267betl",
      "__gohashid": 42735
    },
    {
      "status": "dot",
      "to": "anti_join1cd90185fcc0etl",
      "dash": [
        5,
        2
      ],
      "from": "alter_fieldf3a62959844aetl",
      "__gohashid": 42736
    },
    {
      "status": "dot",
      "to": "sql6798b7003d2detl",
      "dash": [
        5,
        2
      ],
      "from": "anti_join1cd90185fcc0etl",
      "__gohashid": 42737
    },
    {
      "status": "dot",
      "to": "outputa3740eeb87a1etl",
      "dash": [
        5,
        2
      ],
      "from": "joine39729d6bd9detl"
    },
    {
      "status": "dot",
      "to": "outputd8102ce86759etl",
      "dash": [
        5,
        2
      ],
      "from": "sql6798b7003d2detl"
    },
    {
      "status": "dot",
      "to": "output4064f9854861etl",
      "dash": [
        5,
        2
      ],
      "from": "data_filterf751674c09c4etl"
    }
  ]
}