const {
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncSeriesHook,
} = require("tapable");

class Lesson {
  constructor() {
    // 初始化hooks容器
    this.hooks = {
      // Sync 同步钩子，任务会依次执行
      // go: new SyncHook(["address"]),
      // 在所有注册的回调中，遇到return值就会退出
      go: new SyncBailHook(["address"]),

      // Async 异步钩子
      // AsyncParallelHook 异步并行
      // leave: new AsyncParallelHook(["name", "age"]),
      // 异步串行
      leave: new AsyncSeriesHook(["name", "age"]),
    };
  }

  tap() {
    // 给hooks容器中注册事件/添加回调函数
    this.hooks.go.tap("class0303", (address) => {
      console.log("class0303", address);
      return false;
    });
    this.hooks.go.tap("class0401", (address) => {
      console.log("class0401", address);
    });

    this.hooks.leave.tapAsync("class0510", (name, age, cb) => {
      setTimeout(() => {
        console.log("class0510", name, age);
        cb();
      }, 2000);
    });

    this.hooks.leave.tapPromise("class0610", (name, age) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("class0610", name, age);
          resolve();
        }, 1000);
      });
    });
  }

  start() {
    // 触发hooks
    this.hooks.go.call("c101");
    this.hooks.leave.callAsync("jack", 18, (err) => {
      // 所有leave容器中的回调函数触发完了，才触发
      console.log("end~~~");
    });
    // this.hooks.leave.promise("jacky", 20).then((res) => {
    //   console.log("res :>> ", res);
    // });
  }
}

let lesson = new Lesson();
lesson.tap();
lesson.start();
