// Generated by CoffeeScript 1.4.0
(function() {

  this.Video = (function() {

    function Video(element) {
      var _this = this;
      this.el = $(element).find('.video');
      this.id = this.el.attr('id').replace(/video_/, '');
      this.start = this.el.data('start');
      this.end = this.el.data('end');
      this.caption_data_dir = this.el.data('caption-data-dir');
      this.caption_asset_path = this.el.data('caption-asset-path');
      this.show_captions = this.el.data('show-captions') === "true";
      window.player = null;
      this.el = $("#video_" + this.id);
      this.parseVideos(this.el.data('streams'));
      this.fetchMetadata();
      this.parseSpeed();
      $("#video_" + this.id).data('video', this).addClass('video-load-complete');
      this.hide_captions = $.cookie('hide_captions') === 'true';
      if (YT.Player) {
        this.embed();
      } else {
        window.onYouTubePlayerAPIReady = function() {
          return _this.el.each(function() {
            return $(this).data('video').embed();
          });
        };
      }
    }

    Video.prototype.youtubeId = function(speed) {
      return this.videos[speed || this.speed];
    };

    Video.prototype.parseVideos = function(videos) {
      var _this = this;
      this.videos = {};
      return $.each(videos.split(/,/), function(index, video) {
        var speed;
        video = video.split(/:/);
        speed = parseFloat(video[0]).toFixed(2).replace(/\.00$/, '.0');
        return _this.videos[speed] = video[1];
      });
    };

    Video.prototype.parseSpeed = function() {
      this.setSpeed($.cookie('video_speed'));
      return this.speeds = ($.map(this.videos, function(url, speed) {
        return speed;
      })).sort();
    };

    Video.prototype.setSpeed = function(newSpeed) {
      if (this.videos[newSpeed] !== void 0) {
        this.speed = newSpeed;
        return $.cookie('video_speed', "" + newSpeed, {
          expires: 3650,
          path: '/'
        });
      } else {
        return this.speed = '1.0';
      }
    };

    Video.prototype.embed = function() {
      return this.player = new VideoPlayer({
        video: this
      });
    };

    Video.prototype.fetchMetadata = function(url) {
      var _this = this;
      this.metadata = {};
      return $.each(this.videos, function(speed, url) {
        return $.get("https://gdata.youtube.com/feeds/api/videos/" + url + "?v=2&alt=jsonc", (function(data) {
          return _this.metadata[data.data.id] = data.data;
        }), 'jsonp');
      });
    };

    Video.prototype.getDuration = function() {
      return this.metadata[this.youtubeId()].duration;
    };

    Video.prototype.log = function(eventName) {
      return Logger.log(eventName, {
        id: this.id,
        code: this.youtubeId(),
        currentTime: this.player.currentTime,
        speed: this.speed
      });
    };

    return Video;

  })();

}).call(this);
