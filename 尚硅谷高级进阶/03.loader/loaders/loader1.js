const { getOptions } = require("loader-utils");
const { validate } = require("schema-utils");
const schema = require("./schema.json");

// loader 本质是一个函数
// 同步loader的两种写法

// module.exports = function (content, map, meta) {
//   console.log(111);

//   return content;
// };

// module.exports = function (content, map, meta) {
//   console.log(111);

//   this.callback(null, content, map, meta);
// };

// 异步loader
module.exports = function (content, map, meta) {
  console.log(111);

  console.log("options :>> ", getOptions(this));
  // 获取loader的options配置
  const options = getOptions(this);

  // 校验options内容
  validate(schema, options, {
    name: "loader1",
  });

  const callback = this.async();

  setTimeout(() => {
    callback(null, content);
  }, 2000);
};

module.exports.pitch = function () {
  console.log("pitch 111");
};
