(() => {
  "use strict";
  console.log("hello world"),
    console.log(
      new (function n(o) {
        !(function (n, o) {
          if (!(n instanceof o))
            throw new TypeError("Cannot call a class as a function");
        })(this, n),
          (this.name = o);
      })("wss")
    );
})();
