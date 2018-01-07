jQuery(document).ready(function($) {


  // Main Dropdown JS
  $('.dropdown').click(function () {
      $(this).toggleClass('open');
  });



  // Material fomr JS
  var textarea = document.querySelector('textarea');

textarea.addEventListener('keydown', autosize);

function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}

// Generated by CoffeeScript 1.4.0
(function() {
  var $;

  $ = window.jQuery || window.Zepto || window.$;

  $.fn.fancySelect = function(opts) {
    var isiOS, settings;
    if (opts == null) {
      opts = {};
    }
    settings = $.extend({
      forceiOS: false,
      includeBlank: false,
      optionTemplate: function(optionEl) {
        return optionEl.text();
      },
      triggerTemplate: function(optionEl) {
        return optionEl.text();
      }
    }, opts);
    isiOS = !!navigator.userAgent.match(/iP(hone|od|ad)/i);
    return this.each(function() {
      var copyOptionsToList, disabled, options, sel, trigger, updateTriggerText, wrapper, fancy;
      sel = $(this);
      if (sel.hasClass('fancified') || sel[0].tagName !== 'SELECT') {
        return;
      }
      sel.addClass('fancified');
      sel.css({
        width: 1,
        height: 1,
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0
      });
      sel.wrap('<div class="fancy-select">');
      wrapper = sel.parent();
      if (sel.data('class')) {
        wrapper.addClass(sel.data('class'));
      }
      wrapper.append('<div class="trigger">');
      if (!(isiOS && !settings.forceiOS)) {
        wrapper.append('<ul class="options">');
      }

      fancy = wrapper;

      trigger = wrapper.find('.trigger');
      options = wrapper.find('.options');
      disabled = sel.prop('disabled');
      if (disabled) {
        wrapper.addClass('disabled');
      }
      updateTriggerText = function() {
        var triggerHtml;
        triggerHtml = settings.triggerTemplate(sel.find(':selected'));
        return trigger.html(triggerHtml);
      };
      sel.on('blur.fs', function() {
        if (trigger.hasClass('open')) {
          return setTimeout(function() {
            return trigger.trigger('close.fs');
          }, 120);
        }
      });
      trigger.on('close.fs', function() {
        trigger.removeClass('open');
        fancy.removeClass('open');
        return options.removeClass('open');
      });
      trigger.on('click.fs', function() {
        var offParent, parent;
        if (!disabled) {
          trigger.toggleClass('open');
          fancy.toggleClass('open');
          if (isiOS && !settings.forceiOS) {
            if (trigger.hasClass('open')) {
              return sel.focus();
            }
          } else {
            if (trigger.hasClass('open')) {
              parent = trigger.parent();
              offParent = parent.offsetParent();
              if ((parent.offset().top + parent.outerHeight() + options.outerHeight() + 20) > $(window).height() + $(window).scrollTop()) {
                options.addClass('overflowing');
              } else {
                options.removeClass('overflowing');
              }
            }
            options.toggleClass('open');
            if (!isiOS) {
              return sel.focus();
            }
          }
        }
      });
      sel.on('enable', function() {
        sel.prop('disabled', false);
        wrapper.removeClass('disabled');
        disabled = false;
        return copyOptionsToList();
      });
      sel.on('disable', function() {
        sel.prop('disabled', true);
        wrapper.addClass('disabled');
        return disabled = true;
      });
      sel.on('change.fs', function(e) {
        if (e.originalEvent && e.originalEvent.isTrusted) {
          return e.stopPropagation();
        } else {
          return updateTriggerText();
        }
      });
      sel.on('keydown', function(e) {
        var hovered, newHovered, w;
        w = e.which;
        hovered = options.find('.hover');
        hovered.removeClass('hover');
        if (!options.hasClass('open')) {
          if (w === 13 || w === 32 || w === 38 || w === 40) {
            e.preventDefault();
            return trigger.trigger('click.fs');
          }
        } else {
          if (w === 38) {
            e.preventDefault();
            if (hovered.length && hovered.index() > 0) {
              hovered.prev().addClass('hover');
            } else {
              options.find('li:last-child').addClass('hover');
            }
          } else if (w === 40) {
            e.preventDefault();
            if (hovered.length && hovered.index() < options.find('li').length - 1) {
              hovered.next().addClass('hover');
            } else {
              options.find('li:first-child').addClass('hover');
            }
          } else if (w === 27) {
            e.preventDefault();
            trigger.trigger('click.fs');
          } else if (w === 13 || w === 32) {
            e.preventDefault();
            hovered.trigger('mousedown.fs');
          } else if (w === 9) {
            if (trigger.hasClass('open')) {
              trigger.trigger('close.fs');
            }
          }
          newHovered = options.find('.hover');
          if (newHovered.length) {
            options.scrollTop(0);
            return options.scrollTop(newHovered.position().top - 12);
          }
        }
      });
      options.on('mousedown.fs', 'li', function(e) {
        var clicked;
        clicked = $(this);
        sel.val(clicked.data('raw-value'));
        if (!isiOS) {
          sel.trigger('blur.fs').trigger('focus.fs');
        }
        options.find('.selected').removeClass('selected');
        clicked.addClass('selected');
        trigger.addClass('selected');
        fancy.addClass('selected');
        return sel.val(clicked.data('raw-value')).trigger('change.fs').trigger('blur.fs').trigger('focus.fs');
      });
      options.on('mouseenter.fs', 'li', function() {
        var hovered, nowHovered;
        nowHovered = $(this);
        hovered = options.find('.hover');
        hovered.removeClass('hover');
        return nowHovered.addClass('hover');
      });
      options.on('mouseleave.fs', 'li', function() {
        return options.find('.hover').removeClass('hover');
      });
      copyOptionsToList = function() {
        var selOpts;
        updateTriggerText();
        if (isiOS && !settings.forceiOS) {
          return;
        }
        selOpts = sel.find('option');
        return sel.find('option').each(function(i, opt) {
          var optHtml;
          opt = $(opt);
          if (!opt.prop('disabled') && (opt.val() || settings.includeBlank)) {
            optHtml = settings.optionTemplate(opt);
            if (opt.prop('selected')) {
              return options.append("<li data-raw-value=\"" + (opt.val()) + "\" class=\"selected\">" + optHtml + "</li>");
            } else {
              return options.append("<li data-raw-value=\"" + (opt.val()) + "\">" + optHtml + "</li>");
            }
          }
        });
      };
      sel.on('update.fs', function() {
        wrapper.find('.options').empty();
        return copyOptionsToList();
      });
      return copyOptionsToList();
    });
  };

}).call(this);

$('.select-field').fancySelect();


});

















// iframes
(function(document){

    'use strict';

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    }

    function forEachIframe(callback) {
        if (iframes.length > 0) {
            for (var i = 0; i < iframes.length; i++) {
                var iframe = iframes[i];
                if (iframe.className.indexOf('dont-resize') !== -1) {
                    iframes.splice(i, 1);
                } else {
                    callback(iframe);
                }
            }
            iframe = undefined;
        }
    }

    function resizeIframes() {
        forEachIframe(function(iframe) {
            var maxWidth = iframe.parentElement.getBoundingClientRect().width,
            ratio = iframe.height / iframe.width,
            height = maxWidth * ratio;
            iframe.style.height = height + 'px';
            iframe.style.width = '100%';
        });
    }

    var iframeDoms = document.getElementsByTagName('iframe'),
        iframes    = Array.prototype.slice.call( iframeDoms );

    window.onload = resizeIframes();
    window.onresize = debounce(resizeIframes, 100);

})(document);