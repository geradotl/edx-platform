// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.VideoControlAlpha = (function(_super) {

    __extends(VideoControlAlpha, _super);

    function VideoControlAlpha() {
      this.togglePlayback = __bind(this.togglePlayback, this);
      return VideoControlAlpha.__super__.constructor.apply(this, arguments);
    }

    VideoControlAlpha.prototype.bind = function() {
      return this.$('.video_control').click(this.togglePlayback);
    };

    VideoControlAlpha.prototype.render = function() {
      this.el.append("<div class=\"slider\"></div>\n<div>\n  <ul class=\"vcr\">\n    <li><a class=\"video_control\" href=\"#\"></a></li>\n    <li>\n      <div class=\"vidtime\">0:00 / 0:00</div>\n    </li>\n  </ul>\n  <div class=\"secondary-controls\">\n    <a href=\"#\" class=\"add-fullscreen\" title=\"Fill browser\">Fill Browser</a>\n  </div>\n</div>");
      if (!onTouchBasedDevice()) {
        return this.$('.video_control').addClass('play').html('Play');
      }
    };

    VideoControlAlpha.prototype.play = function() {
      return this.$('.video_control').removeClass('play').addClass('pause').html('Pause');
    };

    VideoControlAlpha.prototype.pause = function() {
      return this.$('.video_control').removeClass('pause').addClass('play').html('Play');
    };

    VideoControlAlpha.prototype.togglePlayback = function(event) {
      event.preventDefault();
      if (this.$('.video_control').hasClass('play')) {
        return $(this).trigger('play');
      } else if (this.$('.video_control').hasClass('pause')) {
        return $(this).trigger('pause');
      }
    };

    return VideoControlAlpha;

  })(SubviewAlpha);

}).call(this);
