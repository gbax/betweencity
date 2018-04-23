const Deferred = (function () {
  function Deferred () {
    const _this = this;
    this.promise = new Promise((resolve, reject) => {
      _this.resolve = resolve;
      _this.reject = reject;
    });
    Object.freeze(this);
  }
  return Deferred;
}());
