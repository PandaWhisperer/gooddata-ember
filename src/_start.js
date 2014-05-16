(function(window, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser Global (gooddata_ember is our global library identifier)
    window.gooddata_ember = factory();
  }
}(this, function() {
