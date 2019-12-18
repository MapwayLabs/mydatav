var data = {
  position: "433.425829910338 3.2649018560552747",
  zoom: 0.3235489603624977,
  line_type: "polyline",
  line_color: "#C6CAD2",
  is_trigger_auto_layout: false,
  node_meta: [
    {
      status: 1,
      loc: "-120.46117368933814 781.2682386103804",
      nodeType: "base_tb",
      is_streaming: 0,
      title: "7ee3c92bce714f31f992ad2911e29aaf",
      type: "input",
      streaming_node: 0,
      meta: {
        fields: [
          {
            formula: null,
            desc: "",
            type: "string",
            id: "fk9843e39b",
            title: "姓名1"
          },
          {
            formula: null,
            desc: "",
            type: "double",
            id: "fk87dbd62b",
            title: "身份证号"
          },
          {
            formula: null,
            desc: "",
            type: "string",
            id: "fk7f52bfd5",
            title: "照片"
          },
          {
            formula: null,
            desc: "",
            type: "string",
            id: "fk6786bc11",
            title: "特征值"
          },
          {
            formula: null,
            desc: "",
            type: "datetime",
            id: "fk2e12cd91",
            title: "采集时间"
          },
          {
            formula: null,
            desc: "",
            type: "string",
            id: "fk4b998f4c",
            title: "系统来源"
          },
          {
            formula: null,
            desc: "",
            type: "datetime",
            id: "fk23f905d6",
            title: "入库时间"
          },
          {
            formula: null,
            desc: "",
            type: "double",
            id: "fk764d4486",
            title: "备份字段1"
          },
          {
            formula: null,
            desc: "",
            type: "string",
            id: "fk20473cc8",
            title: "备份字段2"
          },
          {
            formula: null,
            desc: "",
            type: "datetime",
            id: "fk199a019f",
            title: "备份字段3"
          }
        ],
        tb_id: "tb_968231d74fd24308a624a4549c5e1102",
        data_count: 1,
        title: "7ee3c92bce714f31f992ad2911e29aaf"
      },
      parents: [],
      key: "input9a665c3ae918etl",
      originType: "excel",
      id: "input9a665c3ae918etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 484",
      nodeType: "translate",
      streaming_node: 0,
      title: "修改字段",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "alter_fieldbc01bca73463etl",
      type: "alter_field",
      id: "alter_fieldbc01bca73463etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 154",
      nodeType: "translate",
      streaming_node: 0,
      title: "数据聚合",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "data_aggre7498f273a22etl",
      type: "data_aggr",
      id: "data_aggre7498f273a22etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 594",
      nodeType: "translate",
      streaming_node: 0,
      title: "数据过滤",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "data_filtera29aca822713etl",
      type: "data_filter",
      id: "data_filtera29aca822713etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 1034",
      nodeType: "translate",
      streaming_node: 0,
      title: "添加字段",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "add_fieldf7071ec12b60etl",
      type: "add_field",
      id: "add_fieldf7071ec12b60etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 1914",
      nodeType: "translate",
      streaming_node: 0,
      title: "选择列",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "select34ab6b8d033eetl",
      type: "select",
      id: "select34ab6b8d033eetl"
    },
    {
      status: 0,
      loc: "657.9999985694885 1144",
      nodeType: "translate",
      streaming_node: 0,
      title: "字典映射",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "map_field9bff7d55181cetl",
      type: "map_field",
      id: "map_field9bff7d55181cetl"
    },
    {
      status: 0,
      loc: "657.9999985694885 44",
      nodeType: "translate",
      streaming_node: 0,
      title: "字典映射",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "map_field74b355f9b678etl",
      type: "map_field",
      id: "map_field74b355f9b678etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 264",
      nodeType: "translate",
      streaming_node: 0,
      title: "身份证15转18",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "id_trans5f5fb4546ec6etl",
      type: "id_trans",
      id: "id_trans5f5fb4546ec6etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 1804",
      nodeType: "translate",
      streaming_node: 0,
      title: "交集",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "joindcfa3a21ff8betl",
      type: "join",
      id: "joindcfa3a21ff8betl"
    },
    {
      status: 0,
      loc: "657.9999985694885 374",
      nodeType: "translate",
      streaming_node: 0,
      title: "左连接",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "left_joinc169646c6239etl",
      type: "left_join",
      id: "left_joinc169646c6239etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 1584",
      nodeType: "translate",
      streaming_node: 0,
      title: "字典映射",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "map_field84124a6c44e4etl",
      type: "map_field",
      id: "map_field84124a6c44e4etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 924",
      nodeType: "translate",
      streaming_node: 0,
      title: "添加字段",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "add_fielde27cae1926e5etl",
      type: "add_field",
      id: "add_fielde27cae1926e5etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 1694",
      nodeType: "translate",
      streaming_node: 0,
      title: "添加字段",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "add_field2c30ac4279a7etl",
      type: "add_field",
      id: "add_field2c30ac4279a7etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 1254",
      nodeType: "translate",
      streaming_node: 0,
      title: "数据过滤",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "data_filterb7ed0006a80betl",
      type: "data_filter",
      id: "data_filterb7ed0006a80betl"
    },
    {
      status: 0,
      loc: "657.9999985694885 1474",
      nodeType: "translate",
      streaming_node: 0,
      title: "数据过滤",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "data_filter853e3532db53etl",
      type: "data_filter",
      id: "data_filter853e3532db53etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 814",
      nodeType: "translate",
      streaming_node: 0,
      title: "数据聚合",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "data_aggraca6840cd190etl",
      type: "data_aggr",
      id: "data_aggraca6840cd190etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 704",
      nodeType: "translate",
      streaming_node: 0,
      title: "数据聚合",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "data_aggrf0b363912553etl",
      type: "data_aggr",
      id: "data_aggrf0b363912553etl"
    },
    {
      status: 0,
      loc: "657.9999985694885 1364",
      nodeType: "translate",
      streaming_node: 0,
      title: "添加字段",
      meta: {},
      parents: ["input9a665c3ae918etl"],
      key: "add_field3e03b1521a5betl",
      type: "add_field",
      id: "add_field3e03b1521a5betl"
    },
    {
      status: 0,
      loc: "767.9999985694885 154",
      nodeType: "translate",
      title: "输出",
      streaming_node: 0,
      meta: {},
      parents: ["data_aggre7498f273a22etl"],
      key: "output98cda5b2d682etl",
      type: "output",
      id: "output98cda5b2d682etl"
    }
  ],
  line_meta: [
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "alter_fieldbc01bca73463etl",
      to: "alter_fieldbc01bca73463etl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "5a47204d-2149-48b8-a1fc-817976fa9253"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "data_aggre7498f273a22etl",
      to: "data_aggre7498f273a22etl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "e0f853ac-caa2-4cb8-8842-e45310a89888"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "data_filtera29aca822713etl",
      to: "data_filtera29aca822713etl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "f59eaaa4-dbb4-43a6-95ac-7c1bb71cd186"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "add_fieldf7071ec12b60etl",
      to: "add_fieldf7071ec12b60etl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "f0197b60-b416-4b82-8a41-c0ebcedcb5f5"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "select34ab6b8d033eetl",
      to: "select34ab6b8d033eetl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "a9ed9529-7986-4388-9087-f6ca2af57c4d"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "map_field9bff7d55181cetl",
      to: "map_field9bff7d55181cetl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "05821aa6-8e93-47a9-97a7-f2caf2954c68"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "map_field74b355f9b678etl",
      to: "map_field74b355f9b678etl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "1b1ebad4-3644-43a9-8253-6c5dc91f82ee"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "id_trans5f5fb4546ec6etl",
      to: "id_trans5f5fb4546ec6etl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "20318748-04ea-460c-b75c-9263660082b4"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "joindcfa3a21ff8betl",
      to: "joindcfa3a21ff8betl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "8b8ed3b0-c309-4c00-95cd-78020f3f8e85"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "left_joinc169646c6239etl",
      to: "left_joinc169646c6239etl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "b4482857-ab03-442f-b9e6-bed8c9dbfe64"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "map_field84124a6c44e4etl",
      to: "map_field84124a6c44e4etl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "af9e261f-0486-48a8-9296-4a9c82ac929b"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "add_fielde27cae1926e5etl",
      to: "add_fielde27cae1926e5etl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "e85f72bc-6072-49c5-9d85-7e67d8392baa"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "add_field2c30ac4279a7etl",
      to: "add_field2c30ac4279a7etl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "ed507c45-128f-43a7-a300-c90b045f5fcd"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "data_filterb7ed0006a80betl",
      to: "data_filterb7ed0006a80betl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "ae9251e4-501b-4c0c-a991-eeb9a5d5a3b6"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "data_filter853e3532db53etl",
      to: "data_filter853e3532db53etl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "49b2dc15-90f2-445f-8aad-e3a4f1322312"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "data_aggraca6840cd190etl",
      to: "data_aggraca6840cd190etl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "f2e19cca-c599-4cd9-889e-6a396a7b8758"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "data_aggrf0b363912553etl",
      to: "data_aggrf0b363912553etl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "c768d0a3-a173-4b1b-90ee-facf705d3fd5"
    },
    {
      status: "dot",
      from: "input9a665c3ae918etl",
      target: "add_field3e03b1521a5betl",
      to: "add_field3e03b1521a5betl",
      dash: [5, 2],
      source: "input9a665c3ae918etl",
      id: "695e18a4-35cb-4d32-859e-c6ca0e72c58c"
    },
    {
      status: "dot",
      from: "data_aggre7498f273a22etl",
      target: "output98cda5b2d682etl",
      source: "data_aggre7498f273a22etl",
      dash: [5, 2],
      to: "output98cda5b2d682etl",
      id: "1caf4ad9-9b0f-4ec1-8dd8-bd2575adcb87"
    }
  ]
};
