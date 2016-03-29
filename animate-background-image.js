(function () {
  'use strict';

  /**
   * AnimateBackgroundImage
   *
   * Animate element background images based on attributes or options object.
   *
   * attributes:
   * - data-animate-background-image-base-url
   *   base-url for frames. must have ${frame} placeholder that will be replace with the frame index.
   *   e.g. 'http://mycdn.com/my-animation-frame-${frame}.jpg'
   * - data-animate-background-image-frames
   *   number of frames available for animation
   * - data-animate-background-image-speed
   *   timeout between frames
   *
   * options object:
   * - {
   *   baseUrl: same as above,
   *   framesCount: same as above,
   *   speed: same as above
   * }
   * 
   */
  
  function AnimateBackgroundImage(element, options) {

    if (!element) {
      return false;
    }
    
    this.element = element;
    this.visibleFrame = 0;
    this.framesUrls = [];
    this.frames = [];

    this.setup(options);

    if (this.valid) {
      this.getFramesUrls();
      this.loadFrames();
      this.run();
      return this;
    } else {
      return false;
    }

  }
  AnimateBackgroundImage.prototype.setup = function (options) {
    this.speed = (options && parseInt(options.speed)) || parseInt(this.element.getAttribute('data-animate-background-image-speed')) || 200;
    this.baseUrl = (options && options.baseUrl) || this.element.getAttribute('data-animate-background-image-base-url') || false;
    this.framesCount = (options && parseInt(options.framesCount)) || parseInt(this.element.getAttribute('data-animate-background-image-frames')) || false;
    this.valid = this.speed && this.baseUrl && this.framesCount && this.speed;
  };
  AnimateBackgroundImage.prototype._getFrameUrlBuilder = function () {
    var prefix;
    var suffix;
    var unparsedBaseUrl = this.element.getAttribute('data-animate-background-image-base-url');
    if (unparsedBaseUrl && unparsedBaseUrl.length) {
      var indexOfFrame = unparsedBaseUrl.indexOf('${frame}');
      prefix = unparsedBaseUrl.substring(0, indexOfFrame);
      suffix = unparsedBaseUrl.substring(indexOfFrame + '${frame}'.length);
    }
    return function (frameId) {
      return suffix.length && prefix.length ?
        prefix + frameId + suffix :
        prefix.length ? prefix + frameId :
        suffix.length ? frameId + suffix :
        frameId;
    }
  }
  AnimateBackgroundImage.prototype.getFramesUrls = function () {
    var frameUrlBuilder = this._getFrameUrlBuilder();
    var numberOfFrames = parseInt(this.element.getAttribute('data-animate-background-image-frames'));
    for (var i = 0; i < numberOfFrames; i++) {
      this.framesUrls.push(frameUrlBuilder(i));
    }
  };
  AnimateBackgroundImage.prototype.loadFrames = function () {
    for (var i = 0; i < this.framesUrls.length; i++) {
      var frame = new Image();
      frame.src = this.framesUrls[i];
      this.frames.push(frame);
    }
  };
  AnimateBackgroundImage.prototype.run = function () {
    var _this = this;
    var nextFrameIdx = this.visibleFrame + 1 < this.frames.length ? this.visibleFrame + 1 : 0;
    if (this.frames[nextFrameIdx] && this.frames[nextFrameIdx].complete) {
      this.element.style.backgroundImage = 'url(' + this.framesUrls[nextFrameIdx] + ')';
      this.visibleFrame = nextFrameIdx;
    }
    setTimeout(function () { this.run(); }.bind(this), this.speed);
  };

  /**
   * API
   */
  
  var targets = document.querySelectorAll('[data-animate-background-image]');
  if (targets) {
    for (var i = 0; i < targets.length; i++) {
      new AnimateBackgroundImage(targets[i]);
    }
  }

  window.animateBackgroundImage = function (el, options) {
    return new AnimateBackgroundImage(el, options);
  };

})();
