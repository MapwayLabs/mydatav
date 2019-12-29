// 评测题目: 树结构转化
// [
//   { id: 2, text: '研发计划', parent: 1 },
//   { id: 3, text: '产品方案', parent: 1 },
//   { id: 4, text: '第二主题' },
//   { id: 1, text: '中心主题' },
// ]
//
// [
//   {
//		id: 1,
// 		text: '中心主题',
//      children: [
//		  { id: 2, text: '研发计划' },
//		  { id: 3, text: '产品方案' },
//		]
//	 },
//   { id: 4, text: '第二主题' },
// ]

function convertTree(tree) {
  const result = [];
  const treeObj = tree.reduce((a, v) => {
    a[v.id] = v;
    return a;
  }, {});

  tree.forEach(node => {
    if (!node.parent) {
      result.push(node);
    } else {
      (treeObj[node.parent].children || (treeObj[node.parent].children = [])).push(node);
    }
  });

  return result;
}

// 循环引用问题
convertTree([
  { id: 2, text: '研发计划', parent: 1 },
  { id: 3, text: '产品方案', parent: 1 },
  { id: 4, text: '第二主题' },
  { id: 1, text: '中心主题', parent: 2 }
])