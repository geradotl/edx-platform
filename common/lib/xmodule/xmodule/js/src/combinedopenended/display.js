// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Rubric = (function() {

    function Rubric() {}

    Rubric.initialize = function(location) {
      $('.rubric').data("location", location);
      $('input[class="score-selection"]').change(this.tracking_callback);
      $(window).unbind('keydown', this.keypress_callback);
      $(window).keydown(this.keypress_callback);
      this.categories = $('.rubric-category');
      this.category = $(this.categories.first());
      this.category.prepend('> ');
      return this.category_index = 0;
    };

    Rubric.keypress_callback = function(event) {
      var inputs, max_score, old_category_text, selected;
      if ($(event.target).is('input, textarea')) {
        return;
      }
      if (event.which >= 48 && event.which <= 57) {
        selected = event.which - 48;
      } else if (event.which >= 96 && event.which <= 105) {
        selected = event.which - 96;
      } else {
        return;
      }
      if (Rubric.category_index <= Rubric.categories.length) {
        inputs = $("input[name='score-selection-" + Rubric.category_index + "']");
        max_score = inputs.length - 1;
        if (selected > max_score || selected < 0) {
          return;
        }
        inputs.filter("input[value=" + selected + "]").click();
        old_category_text = Rubric.category.html().substring(5);
        Rubric.category.html(old_category_text);
        Rubric.category_index++;
        Rubric.category = $(Rubric.categories[Rubric.category_index]);
        return Rubric.category.prepend('> ');
      }
    };

    Rubric.tracking_callback = function(event) {
      var category, data, location, target_selection;
      target_selection = $(event.target).val();
      category = $(event.target).data("category");
      location = $('.rubric').data('location');
      data = {
        location: location,
        selection: target_selection,
        category: category
      };
      return Logger.log('rubric_select', data);
    };

    Rubric.get_score_list = function() {
      var i, num_categories, score, score_lst, _i, _ref;
      num_categories = $('.rubric-category').length;
      score_lst = [];
      for (i = _i = 0, _ref = num_categories - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        score = $("input[name='score-selection-" + i + "']:checked").val();
        score_lst.push(score);
      }
      return score_lst;
    };

    Rubric.get_total_score = function() {
      var score, score_lst, tot, _i, _len;
      score_lst = this.get_score_list();
      tot = 0;
      for (_i = 0, _len = score_lst.length; _i < _len; _i++) {
        score = score_lst[_i];
        tot += parseInt(score);
      }
      return tot;
    };

    Rubric.check_complete = function() {
      var i, num_categories, score, _i, _ref;
      num_categories = $('.rubric-category').length;
      for (i = _i = 0, _ref = num_categories - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        score = $("input[name='score-selection-" + i + "']:checked").val();
        if (score === void 0) {
          return false;
        }
      }
      return true;
    };

    return Rubric;

  }).call(this);

  this.CombinedOpenEnded = (function() {

    function CombinedOpenEnded(element) {
      this.prompt_hide = __bind(this.prompt_hide, this);

      this.prompt_show = __bind(this.prompt_show, this);

      this.collapse_question = __bind(this.collapse_question, this);

      this.replace_text_inputs = __bind(this.replace_text_inputs, this);

      this.hide_file_upload = __bind(this.hide_file_upload, this);

      this.setup_file_upload = __bind(this.setup_file_upload, this);

      this.poll = __bind(this.poll, this);

      this.queueing = __bind(this.queueing, this);

      this.gentle_alert = __bind(this.gentle_alert, this);

      this.next_problem = __bind(this.next_problem, this);

      this.reset = __bind(this.reset, this);

      this.skip_post_assessment = __bind(this.skip_post_assessment, this);

      this.save_hint = __bind(this.save_hint, this);

      this.save_assessment = __bind(this.save_assessment, this);

      this.keydown_handler = __bind(this.keydown_handler, this);

      this.save_answer = __bind(this.save_answer, this);

      this.rebind = __bind(this.rebind, this);

      this.message_post = __bind(this.message_post, this);

      this.show_legend_current = __bind(this.show_legend_current, this);

      this.show_status_current = __bind(this.show_status_current, this);

      this.show_combined_rubric_current = __bind(this.show_combined_rubric_current, this);

      this.show_results = __bind(this.show_results, this);

      this.show_results_current = __bind(this.show_results_current, this);
      this.element = element;
      this.reinitialize(element);
      $(window).keydown(this.keydown_handler);
    }

    CombinedOpenEnded.prototype.reinitialize = function(element) {
      this.wrapper = $(element).find('section.xmodule_CombinedOpenEndedModule');
      this.el = $(element).find('section.combined-open-ended');
      this.combined_open_ended = $(element).find('section.combined-open-ended');
      this.id = this.el.data('id');
      this.ajax_url = this.el.data('ajax-url');
      this.state = this.el.data('state');
      this.task_count = this.el.data('task-count');
      this.task_number = this.el.data('task-number');
      this.accept_file_upload = this.el.data('accept-file-upload');
      this.location = this.el.data('location');
      Rubric.initialize(this.location);
      this.allow_reset = this.el.data('allow_reset');
      this.reset_button = this.$('.reset-button');
      this.reset_button.click(this.reset);
      this.next_problem_button = this.$('.next-step-button');
      this.next_problem_button.click(this.next_problem);
      this.status_container = this.$('.status-elements');
      this.show_results_button = this.$('.show-results-button');
      this.show_results_button.click(this.show_results);
      this.question_header = this.$('.question-header');
      this.question_header.click(this.collapse_question);
      Collapsible.setCollapsibles(this.el);
      this.submit_evaluation_button = $('.submit-evaluation-button');
      this.submit_evaluation_button.click(this.message_post);
      this.results_container = $('.result-container');
      this.combined_rubric_container = $('.combined-rubric-container');
      this.legend_container = $('.legend-container');
      this.show_legend_current();
      this.el = $(element).find('section.open-ended-child');
      this.errors_area = this.$('.error');
      this.answer_area = this.$('textarea.answer');
      this.prompt_container = this.$('.prompt');
      this.rubric_wrapper = this.$('.rubric-wrapper');
      this.hint_wrapper = this.$('.hint-wrapper');
      this.message_wrapper = this.$('.message-wrapper');
      this.submit_button = this.$('.submit-button');
      this.child_state = this.el.data('state');
      this.child_type = this.el.data('child-type');
      if (this.child_type === "openended") {
        this.skip_button = this.$('.skip-button');
        this.skip_button.click(this.skip_post_assessment);
      }
      this.file_upload_area = this.$('.file-upload');
      this.can_upload_files = false;
      this.open_ended_child = this.$('.open-ended-child');
      this.out_of_sync_message = 'The problem state got out of sync.  Try reloading the page.';
      if (this.task_number > 1) {
        this.prompt_hide();
      } else if (this.task_number === 1 && this.child_state !== 'initial') {
        this.prompt_hide();
      }
      this.find_assessment_elements();
      this.find_hint_elements();
      this.rebind();
      if (this.task_number > 1) {
        this.show_combined_rubric_current();
        return this.show_results_current();
      }
    };

    CombinedOpenEnded.prototype.$ = function(selector) {
      return $(selector, this.el);
    };

    CombinedOpenEnded.prototype.show_results_current = function() {
      var data,
        _this = this;
      data = {
        'task_number': this.task_number - 1
      };
      return $.postWithPrefix("" + this.ajax_url + "/get_results", data, function(response) {
        if (response.success) {
          _this.results_container.after(response.html).remove();
          _this.results_container = $('div.result-container');
          _this.submit_evaluation_button = $('.submit-evaluation-button');
          _this.submit_evaluation_button.click(_this.message_post);
          Collapsible.setCollapsibles(_this.results_container);
          $('.evaluation-response a').click(_this.log_feedback_click);
          return $('input[name="evaluation-score"]').change(_this.log_feedback_selection);
        }
      });
    };

    CombinedOpenEnded.prototype.show_results = function(event) {
      var data, status_item, status_number,
        _this = this;
      status_item = $(event.target).parent();
      status_number = status_item.data('status-number');
      data = {
        'task_number': status_number
      };
      return $.postWithPrefix("" + this.ajax_url + "/get_results", data, function(response) {
        if (response.success) {
          _this.results_container.after(response.html).remove();
          _this.results_container = $('div.result-container');
          _this.submit_evaluation_button = $('.submit-evaluation-button');
          _this.submit_evaluation_button.click(_this.message_post);
          return Collapsible.setCollapsibles(_this.results_container);
        } else {
          return _this.gentle_alert(response.error);
        }
      });
    };

    CombinedOpenEnded.prototype.show_combined_rubric_current = function() {
      var data,
        _this = this;
      data = {};
      return $.postWithPrefix("" + this.ajax_url + "/get_combined_rubric", data, function(response) {
        if (response.success) {
          _this.combined_rubric_container.after(response.html).remove();
          return _this.combined_rubric_container = $('div.combined_rubric_container');
        }
      });
    };

    CombinedOpenEnded.prototype.show_status_current = function() {
      var data,
        _this = this;
      data = {};
      return $.postWithPrefix("" + this.ajax_url + "/get_status", data, function(response) {
        if (response.success) {
          _this.status_container.after(response.html).remove();
          return _this.status_container = $('.status-elements');
        }
      });
    };

    CombinedOpenEnded.prototype.show_legend_current = function() {
      var data,
        _this = this;
      data = {};
      return $.postWithPrefix("" + this.ajax_url + "/get_legend", data, function(response) {
        if (response.success) {
          _this.legend_container.after(response.html).remove();
          return _this.legend_container = $('.legend-container');
        }
      });
    };

    CombinedOpenEnded.prototype.message_post = function(event) {
      var evaluation_scoring, external_grader_message, fd, feedback, grader_id, score, settings, submission_id,
        _this = this;
      external_grader_message = $(event.target).parent().parent().parent();
      evaluation_scoring = $(event.target).parent();
      fd = new FormData();
      feedback = evaluation_scoring.find('textarea.feedback-on-feedback')[0].value;
      submission_id = external_grader_message.find('input.submission_id')[0].value;
      grader_id = external_grader_message.find('input.grader_id')[0].value;
      score = evaluation_scoring.find("input:radio[name='evaluation-score']:checked").val();
      fd.append('feedback', feedback);
      fd.append('submission_id', submission_id);
      fd.append('grader_id', grader_id);
      if (!score) {
        this.gentle_alert("You need to pick a rating before you can submit.");
        return;
      } else {
        fd.append('score', score);
      }
      settings = {
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(response) {
          _this.gentle_alert(response.msg);
          $('section.evaluation').slideToggle();
          return _this.message_wrapper.html(response.message_html);
        }
      };
      return $.ajaxWithPrefix("" + this.ajax_url + "/save_post_assessment", settings);
    };

    CombinedOpenEnded.prototype.rebind = function() {
      this.submit_button.unbind('click');
      this.submit_button.show();
      this.reset_button.hide();
      this.next_problem_button.hide();
      this.hide_file_upload();
      this.hint_area.attr('disabled', false);
      if (this.task_number > 1 || this.child_state !== 'initial') {
        this.show_status_current();
      }
      if (this.task_number === 1 && this.child_state === 'assessing') {
        this.prompt_hide();
      }
      if (this.child_state === 'done') {
        this.rubric_wrapper.hide();
      }
      if (this.child_type === "openended") {
        this.skip_button.hide();
      }
      if (this.allow_reset === "True") {
        this.show_results_current;
        this.reset_button.show();
        this.submit_button.hide();
        this.answer_area.attr("disabled", true);
        this.replace_text_inputs();
        return this.hint_area.attr('disabled', true);
      } else if (this.child_state === 'initial') {
        this.answer_area.attr("disabled", false);
        this.submit_button.prop('value', 'Submit');
        this.submit_button.click(this.save_answer);
        return this.setup_file_upload();
      } else if (this.child_state === 'assessing') {
        this.answer_area.attr("disabled", true);
        this.replace_text_inputs();
        this.hide_file_upload();
        this.submit_button.prop('value', 'Submit assessment');
        this.submit_button.click(this.save_assessment);
        if (this.child_type === "openended") {
          this.submit_button.hide();
          return this.queueing();
        }
      } else if (this.child_state === 'post_assessment') {
        if (this.child_type === "openended") {
          this.skip_button.show();
          this.skip_post_assessment();
        }
        this.answer_area.attr("disabled", true);
        this.replace_text_inputs();
        this.submit_button.prop('value', 'Submit post-assessment');
        if (this.child_type === "selfassessment") {
          return this.submit_button.click(this.save_hint);
        } else {
          return this.submit_button.click(this.message_post);
        }
      } else if (this.child_state === 'done') {
        this.rubric_wrapper.hide();
        this.answer_area.attr("disabled", true);
        this.replace_text_inputs();
        this.hint_area.attr('disabled', true);
        this.submit_button.hide();
        if (this.child_type === "openended") {
          this.skip_button.hide();
        }
        if (this.task_number < this.task_count) {
          return this.next_problem();
        } else {
          this.show_results_current();
          return this.reset_button.show();
        }
      }
    };

    CombinedOpenEnded.prototype.find_assessment_elements = function() {
      return this.assessment = this.$('input[name="grade-selection"]');
    };

    CombinedOpenEnded.prototype.find_hint_elements = function() {
      return this.hint_area = this.$('textarea.post_assessment');
    };

    CombinedOpenEnded.prototype.save_answer = function(event) {
      var fd, files, max_filesize, settings,
        _this = this;
      event.preventDefault();
      max_filesize = 2 * 1000 * 1000;
      if (this.child_state === 'initial') {
        files = "";
        if (this.can_upload_files === true) {
          files = $('.file-upload-box')[0].files[0];
          if (files !== void 0) {
            if (files.size > max_filesize) {
              this.can_upload_files = false;
              files = "";
            }
          } else {
            this.can_upload_files = false;
          }
        }
        fd = new FormData();
        fd.append('student_answer', this.answer_area.val());
        fd.append('student_file', files);
        fd.append('can_upload_files', this.can_upload_files);
        settings = {
          type: "POST",
          data: fd,
          processData: false,
          contentType: false,
          success: function(response) {
            if (response.success) {
              _this.rubric_wrapper.html(response.rubric_html);
              _this.rubric_wrapper.show();
              Rubric.initialize(_this.location);
              _this.answer_area.html(response.student_response);
              _this.child_state = 'assessing';
              _this.find_assessment_elements();
              return _this.rebind();
            } else {
              return _this.gentle_alert(response.error);
            }
          }
        };
        return $.ajaxWithPrefix("" + this.ajax_url + "/save_answer", settings);
      } else {
        return this.errors_area.html(this.out_of_sync_message);
      }
    };

    CombinedOpenEnded.prototype.keydown_handler = function(e) {
      if (e.which === 13 && this.child_state === 'assessing' && Rubric.check_complete()) {
        return this.save_assessment(e);
      }
    };

    CombinedOpenEnded.prototype.save_assessment = function(event) {
      var checked_assessment, data, score_list,
        _this = this;
      event.preventDefault();
      if (this.child_state === 'assessing' && Rubric.check_complete()) {
        checked_assessment = Rubric.get_total_score();
        score_list = Rubric.get_score_list();
        data = {
          'assessment': checked_assessment,
          'score_list': score_list
        };
        return $.postWithPrefix("" + this.ajax_url + "/save_assessment", data, function(response) {
          if (response.success) {
            _this.child_state = response.state;
            if (_this.child_state === 'post_assessment') {
              _this.hint_wrapper.html(response.hint_html);
              _this.find_hint_elements();
            } else if (_this.child_state === 'done') {
              _this.rubric_wrapper.hide();
            }
            return _this.rebind();
          } else {
            return _this.errors_area.html(response.error);
          }
        });
      } else {
        return this.errors_area.html(this.out_of_sync_message);
      }
    };

    CombinedOpenEnded.prototype.save_hint = function(event) {
      var data,
        _this = this;
      event.preventDefault();
      if (this.child_state === 'post_assessment') {
        data = {
          'hint': this.hint_area.val()
        };
        return $.postWithPrefix("" + this.ajax_url + "/save_post_assessment", data, function(response) {
          if (response.success) {
            _this.message_wrapper.html(response.message_html);
            _this.child_state = 'done';
            return _this.rebind();
          } else {
            return _this.errors_area.html(response.error);
          }
        });
      } else {
        return this.errors_area.html(this.out_of_sync_message);
      }
    };

    CombinedOpenEnded.prototype.skip_post_assessment = function() {
      var _this = this;
      if (this.child_state === 'post_assessment') {
        return $.postWithPrefix("" + this.ajax_url + "/skip_post_assessment", {}, function(response) {
          if (response.success) {
            _this.child_state = 'done';
            return _this.rebind();
          } else {
            return _this.errors_area.html(response.error);
          }
        });
      } else {
        return this.errors_area.html(this.out_of_sync_message);
      }
    };

    CombinedOpenEnded.prototype.reset = function(event) {
      var _this = this;
      event.preventDefault();
      if (this.child_state === 'done' || this.allow_reset === "True") {
        return $.postWithPrefix("" + this.ajax_url + "/reset", {}, function(response) {
          if (response.success) {
            _this.answer_area.val('');
            _this.rubric_wrapper.html('');
            _this.hint_wrapper.html('');
            _this.message_wrapper.html('');
            _this.child_state = 'initial';
            _this.combined_open_ended.after(response.html).remove();
            _this.allow_reset = "False";
            _this.reinitialize(_this.element);
            _this.rebind();
            return _this.reset_button.hide();
          } else {
            return _this.errors_area.html(response.error);
          }
        });
      } else {
        return this.errors_area.html(this.out_of_sync_message);
      }
    };

    CombinedOpenEnded.prototype.next_problem = function() {
      var _this = this;
      if (this.child_state === 'done') {
        return $.postWithPrefix("" + this.ajax_url + "/next_problem", {}, function(response) {
          if (response.success) {
            _this.answer_area.val('');
            _this.rubric_wrapper.html('');
            _this.hint_wrapper.html('');
            _this.message_wrapper.html('');
            _this.child_state = 'initial';
            _this.combined_open_ended.after(response.html).remove();
            _this.reinitialize(_this.element);
            _this.rebind();
            _this.next_problem_button.hide();
            if (!response.allow_reset) {
              return _this.gentle_alert("Moved to next step.");
            } else {
              _this.gentle_alert("Your score did not meet the criteria to move to the next step.");
              return _this.show_results_current();
            }
          } else {
            return _this.errors_area.html(response.error);
          }
        });
      } else {
        return this.errors_area.html(this.out_of_sync_message);
      }
    };

    CombinedOpenEnded.prototype.gentle_alert = function(msg) {
      var alert_elem;
      if (this.el.find('.open-ended-alert').length) {
        this.el.find('.open-ended-alert').remove();
      }
      alert_elem = "<div class='open-ended-alert'>" + msg + "</div>";
      this.el.find('.open-ended-action').after(alert_elem);
      return this.el.find('.open-ended-alert').css({
        opacity: 0
      }).animate({
        opacity: 1
      }, 700);
    };

    CombinedOpenEnded.prototype.queueing = function() {
      if (this.child_state === "assessing" && this.child_type === "openended") {
        if (window.queuePollerID) {
          window.clearTimeout(window.queuePollerID);
        }
        return window.queuePollerID = window.setTimeout(this.poll, 10000);
      }
    };

    CombinedOpenEnded.prototype.poll = function() {
      var _this = this;
      return $.postWithPrefix("" + this.ajax_url + "/check_for_score", function(response) {
        if (response.state === "done" || response.state === "post_assessment") {
          delete window.queuePollerID;
          return _this.reload();
        } else {
          return window.queuePollerID = window.setTimeout(_this.poll, 10000);
        }
      });
    };

    CombinedOpenEnded.prototype.setup_file_upload = function() {
      if (this.accept_file_upload === "True") {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          this.can_upload_files = true;
          this.file_upload_area.html('<input type="file" class="file-upload-box">');
          return this.file_upload_area.show();
        } else {
          return this.gentle_alert('File uploads are required for this question, but are not supported in this browser. Try the newest version of google chrome.  Alternatively, if you have uploaded the image to the web, you can paste a link to it into the answer box.');
        }
      }
    };

    CombinedOpenEnded.prototype.hide_file_upload = function() {
      if (this.accept_file_upload === "True") {
        return this.file_upload_area.hide();
      }
    };

    CombinedOpenEnded.prototype.replace_text_inputs = function() {
      var answer_class, answer_id, answer_val, new_text;
      answer_class = this.answer_area.attr('class');
      answer_id = this.answer_area.attr('id');
      answer_val = this.answer_area.val();
      new_text = '';
      new_text = "<div class='" + answer_class + "' id='" + answer_id + "'>" + answer_val + "</div>";
      return this.answer_area.replaceWith(new_text);
    };

    CombinedOpenEnded.prototype.reload = function() {
      return location.reload();
    };

    CombinedOpenEnded.prototype.collapse_question = function() {
      var new_text;
      this.prompt_container.slideToggle();
      this.prompt_container.toggleClass('open');
      if (this.question_header.text() === "(Hide)") {
        new_text = "(Show)";
        Logger.log('oe_hide_question', {
          location: this.location
        });
      } else {
        Logger.log('oe_show_question', {
          location: this.location
        });
        new_text = "(Hide)";
      }
      return this.question_header.text(new_text);
    };

    CombinedOpenEnded.prototype.prompt_show = function() {
      if (this.prompt_container.is(":hidden") === true) {
        this.prompt_container.slideToggle();
        this.prompt_container.toggleClass('open');
        return this.question_header.text("(Hide)");
      }
    };

    CombinedOpenEnded.prototype.prompt_hide = function() {
      if (this.prompt_container.is(":visible") === true) {
        this.prompt_container.slideToggle();
        this.prompt_container.toggleClass('open');
        return this.question_header.text("(Show)");
      }
    };

    CombinedOpenEnded.prototype.log_feedback_click = function(event) {
      var generated_event_type, link_text;
      link_text = $(event.target).html();
      if (link_text === 'See full feedback') {
        return Logger.log('oe_show_full_feedback', {});
      } else if (link_text === 'Respond to Feedback') {
        return Logger.log('oe_show_respond_to_feedback', {});
      } else {
        generated_event_type = link_text.toLowerCase().replace(" ", "_");
        return Logger.log("oe_" + generated_event_type, {});
      }
    };

    CombinedOpenEnded.prototype.log_feedback_selection = function(event) {
      var target_selection;
      target_selection = $(event.target).val();
      return Logger.log('oe_feedback_response_selected', {
        value: target_selection
      });
    };

    return CombinedOpenEnded;

  })();

}).call(this);
