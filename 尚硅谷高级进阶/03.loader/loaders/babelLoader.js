const { getOptions } = require("loader-utils");
const { validate } = require("schema-utils");

const { promisify } = require("util");
const { transform } = require("@babel/core");

let schema = {
  type: "object",
  properties: {
    presets: {
      type: "array",
    },
  },
  additionalProperties: true,
};

module.exports = function (content, map, meta) {
  // 获取loader的options配置
  const options = getOptions(this) || {};

  // 校验该loader的options配置
  validate(schema, options, {
    name: "babelLoader",
  });

  // 异步loader
  const callback = this.async();

  // 使用babel编译代码
  promisify(transform)(content, options)
    .then(({ code, map, ast }) => {
      callback(null, code, map, meta);
    })
    .catch((e) => {
      callback(e);
    });
};
