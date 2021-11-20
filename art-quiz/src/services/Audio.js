function Timer(callback, timeout) {
  var timer = null;
  var startTime = 0;
  var me = this;

  this.start = function () {
    if (!timer) {
      timer = createTimeout(onTimer, timeout);
      startTime = new Date();
    }
  };

  this.stop = function () {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  this.timeLeft = function () {
    if (!timer) return -1;

    return new Date().getTime() - startTime.getTime();
  };

  function onTimer() {
    me.stop();
    callback();
  }
}
