/* global Tinycon:false, ansi_up:false */

window.App = (function app(window, document) {
  'use strict';

  /**
   * @type {Object}
   * @private
   */
  var _socket;

  /**
   * @type {HTMLElement}
   * @private
   */
  var _logContainer;

  /**
   * @type {HTMLElement}
   * @private
   */
  var _filterInput;

  /**
   * @type {String}
   * @private
   */
  var _filterValue = '';

  /**
   * @type {HTMLElement}
   * @private
   */
  var _topbar;

  /**
   * @type {HTMLElement}
   * @private
   */
  var _body;

  /**
   * @type {number}
   * @private
   */
  var _linesLimit = Math.Infinity;

  /**
   * @type {number}
   * @private
   */
  var _newLinesCount = 0;

  /**
   * @type {boolean}
   * @private
   */
  var _isWindowFocused = true;

  /**
   * @type {object}
   * @private
   */
  var _highlightConfig;

  /**
   * Hide element if doesn't contain filter value
   *
   * @param {Object} element
   * @private
   */
  var _filterElement = function(elem) {
    var pattern = new RegExp(_filterValue, 'i');
    var element = elem;
    if (pattern.test(element.textContent)) {
      element.style.display = '';
    } else {
      element.style.display = 'none';
    }
  };

  /**
   * Filter logs based on _filterValue
   *
   * @function
   * @private
   */
  var _filterLogs = function() {
    var collection = _logContainer.childNodes;
    var i = collection.length;

    if (i === 0) {
      return;
    }

    while (i) {
      _filterElement(collection[i - 1]);
      i -= 1;
    }
    window.scrollTo(0, document.body.scrollHeight);
  };

  /**
   * @return {Boolean}
   * @private
   */
  var _isScrolledBottom = function() {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    var totalHeight = document.body.offsetHeight;
    var clientHeight = document.documentElement.clientHeight;
    return totalHeight <= currentScroll + clientHeight;
  };

  /**
   * @return void
   * @private
   */
  var _faviconReset = function() {
    _newLinesCount = 0;
    Tinycon.setBubble(0);
  };

  /**
   * @return void
   * @private
   */
  var _updateFaviconCounter = function() {
    if (_isWindowFocused) {
      return;
    }

    if (_newLinesCount < 99) {
      _newLinesCount += 1;
      Tinycon.setBubble(_newLinesCount);
    }
  };

  /**
   * @return String
   * @private
   */
  var _highlightWord = function(line) {
    if (_highlightConfig) {
      if (_highlightConfig.words) {
        for (var wordCheck in _highlightConfig.words) { // eslint-disable-line
          if (_highlightConfig.words.hasOwnProperty(wordCheck)) { // eslint-disable-line
            line = line.replace( // eslint-disable-line
              wordCheck,
              '<span style="' + _highlightConfig.words[wordCheck] + '">' + wordCheck + '</span>'
            );
          }
        }
      }
    }

    return line;
  };

  /**
   * @return HTMLElement
   * @private
   */
  var _highlightLine = function(line, container) {
    if (_highlightConfig) {
      if (_highlightConfig.lines) {
        for (var lineCheck in _highlightConfig.lines) { // eslint-disable-line
          if (line.indexOf(lineCheck) !== -1) { // eslint-disable-line
            container.setAttribute('style', _highlightConfig.lines[lineCheck]);
          }
        }
      }
    }

    return container;
  };

  var _checkTime = function(number) {
    if (number < 10) {
      number = "0" + number;
    }
    return number;
  }

  var _showTime =function(sourceEpoch) {
		sourceEpoch = parseInt(sourceEpoch);
		if (!isNaN(sourceEpoch)) {
			if (sourceEpoch <= 9999999999) {
				sourceEpoch *= 1000;
			}
      var today = new Date(sourceEpoch);
      var h = _checkTime(today.getHours());
      var m = _checkTime(today.getMinutes());
      var s = _checkTime(today.getSeconds());
      return h + ":" + m + ":" + s;
		}
    return sourceEpoch;
  };

  var _getStatusClassName = function(statusNumber){
    var statusClass = "";
    if(statusNumber < 201){
      statusClass = "green";
    }else if(statusNumber > 200 && statusNumber <400){
      statusClass = "blue";
    } else if(statusNumber > 399){
      statusClass = "red";
    }
    return statusClass;
  }


  var _requestFrame = function(data){
    var reg = new RegExp("domID.*log");
    var readData = reg.exec(data);
    if(readData!=null){
      var domID=readData[0];
      data = data.replace(readData[0],"");

      if(data.search(CONSTANT.HTTP_GET) >= 0
      || data.search(CONSTANT.HTTP_POST) >= 0
      || data.search(CONSTANT.HTTP_PUT) >= 0
      || data.search(CONSTANT.HTTP_DELETE) >= 0
      || data.search(CONSTANT.HTTP_PATCH) >= 0
      || data.search(CONSTANT.HTTP_OPTIONS) >= 0){
        //var ramdomID = Date.now().toString() + Math.floor(Math.random() * 90000).toString();
        var panel = document.createElement('div');
        var text = data;
        if(data.length > 100){
          text = data.substring(0, 100);
          text = text + "...";
        }
        panel.className = 'panel-group';
        panel.innerHTML='<div class="panel panel-default">'
            + '<div class="panel-heading">'
              + '<h4 class="panel-title">'
                + '<a class="title-link" data-toggle="collapse" href="#'+domID+'" title="' + data+ '"><i class="caret"></i><span id="'+domID+'time"></span> ' + text+ '<span id="'+domID+'status" class="status"></span> <i id="'+domID+'status-icon" class="status-icon fas fa-circle"></i></a>'
              + '</h4>'
            + '</div>'
            + '<div id="'+domID+'" class="panel-collapse collapse">'
              + '<div class="panel-body">'
                  + '<div class="request-header request-header-txt">'
                    + '<span class="no-padding dot m-l-mini fill-radical-red"></span>'
                    + '<span class="no-padding dot fill-koromiko"></span>'
                    + '<span class="no-padding dot fill-algolia-blue"></span>'
                    + '<h6>Request Headers</h6>'
                  + '</div>'
                  + '<div class="request request-header-content"></div>'
                  + '<div class="request-header request-body-txt">'
                    + '<span class="no-padding dot m-l-mini fill-radical-red"></span>'
                    + '<span class="no-padding dot fill-koromiko"></span>'
                    + '<span class="no-padding dot fill-algolia-blue"></span>'
                    + '<h6>Request Body</h6>'
                  + '</div>'
                  + '<div class="request request-body-content"></div>'
                  + '<div class="request-header response-header-txt">'
                    + '<span class="no-padding dot m-l-mini fill-radical-red"></span>'
                    + '<span class="no-padding dot fill-koromiko"></span>'
                    + '<span class="no-padding dot fill-algolia-blue"></span>'
                    + '<h6>Response Headers</h6>'
                  + '</div>'
                  + '<div class="response response-header-content"></div>'
                  + '<div class="request-header response-body-txt">'
                    + '<span class="no-padding dot m-l-mini fill-radical-red"></span>'
                    + '<span class="no-padding dot fill-koromiko"></span>'
                    + '<span class="no-padding dot fill-algolia-blue"></span>'
                    + '<h6>Response Body</h6>'
                  + '</div>'
                  + '<div class="response response-body-content"></div>'
              + '</div>'
            + '</div>'
          + '</div>';
        _logContainer.insertBefore(panel, _logContainer.childNodes[0]);
      }else if (data.search('Error') >= 0){
        var panelError = document.createElement('div');
        panelError.className = 'errorBlock';
        panelError.innerHTML = data;
        _logContainer.insertBefore(panelError, _logContainer.childNodes[0]);
      }
      if(data.search(CONSTANT.RECEIVED_TIMESTAMP) >= 0){
        data = data.replace(CONSTANT.RECEIVED_TIMESTAMP, "").replace(/^\s+|\s+$/g, '');
        $('#' + domID + 'time').text(_showTime(data));
      }
      if(data.search(CONSTANT.RECEIVED_STATUS) >= 0){
        data = data.replace(CONSTANT.RECEIVED_STATUS, "").replace(/^\s+|\s+$/g, '');
        $('#' + domID + 'status').text(data);
        var statusString = data.slice(0, 3);
        var statusNumber = Number.parseInt(statusString);
        if(!Number.isNaN(statusNumber)){
          var statusClass = _getStatusClassName(statusNumber);
          $('#' + domID + 'status-icon').addClass(statusClass);
        }
      }

      if(data.search(CONSTANT.REQUEST_HEADERS) >= 0){
        data = data.replace(CONSTANT.REQUEST_HEADERS, "").replace(/^\s+|\s+$/g, '');
        $('#'+domID+ ' .panel-body .request-header-content').text(data);
      }
      if(data.search(CONSTANT.REQUEST_BODY) >= 0){
        var text = data.replace(CONSTANT.REQUEST_BODY, "");
        try {
          text = convertStringToJson(text);
          var renderTextFromJson = renderjson.set_show_by_default(true).set_icons('+', '-')(text);
          $('#'+domID+ ' .panel-body .request-body-content').html(renderTextFromJson);
        } catch (e) {
          $('#'+domID+ ' .panel-body .request-body-content').html(text);
        }
      }
      if(data.search(CONSTANT.RESPONSE_HEADERS) >= 0){
        data = data.replace(CONSTANT.RESPONSE_HEADERS, "").replace(/^\s+|\s+$/g, '');
        $('#'+domID+ ' .panel-body .response-header-content').text(data);
      }
      if(data.search(CONSTANT.RESPONSE_BODY) >= 0){
        var text = data.replace(CONSTANT.RESPONSE_BODY, "");
        try {
          text = convertStringToJson(text);
          var renderTextFromJson = renderjson.set_show_by_default(true).set_icons('+', '-')(text);
          $('#'+domID+ ' .panel-body .response-body-content').html(renderTextFromJson);
        }
        catch(err) {
            $('#'+domID+ ' .panel-body .response-body-content').html(text);
        }
      }
    }
  };

  var convertStringToJson = function(data){
    var text = data.replace(/^\s+|\s+$/g, '');
    try {
      text = text.substr(1,text.length-2);
      text.replace(/"/g , "'");
      text = jQuery.parseJSON(text);
    }
    catch(err) {
        console.log(err);
        return data;
    }
    return text;
  }

  return {
    /**
     * Init socket.io communication and log container
     *
     * @param {Object} opts options
     */
    init: function init(opts) {
      var self = this;

      // Elements
      _logContainer = opts.container;
      _filterInput = opts.filterInput;
      _filterInput.focus();
      _topbar = opts.topbar;
      _body = opts.body;

      // Filter input bind
      _filterInput.addEventListener('keyup', function(e) {
        // ESC
        if (e.keyCode === 27) {
          this.value = '';
          _filterValue = '';
        } else {
          _filterValue = this.value;
        }
        _filterLogs();
      });

      // Favicon counter bind
      window.addEventListener('blur', function() {
        _isWindowFocused = false;
      }, true);
      window.addEventListener('focus', function() {
        _isWindowFocused = true;
        _faviconReset();
      }, true);

      // socket.io init
      _socket = opts.socket;
      _socket
        .on('options:lines', function(limit) {
          _linesLimit = limit;
        })
        .on('options:hide-topbar', function() {
          _topbar.className += ' hide';
          _body.className = 'no-topbar';
        })
        .on('options:no-indent', function() {
          _logContainer.className += ' no-indent';
        })
        .on('options:highlightConfig', function(highlightConfig) {
          _highlightConfig = highlightConfig;
        })
        .on('line', function(line) {
          self.log(line);
        });
    },

    /**
     * Log data
     *
     * @param {string} data data to log
     */
    log: function log(data) {
      var wasScrolledBottom = _isScrolledBottom();
      var div = document.createElement('div');
      var p = document.createElement('p');
      p.className = 'inner-line';

      // convert ansi color codes to html && escape HTML tags
      data = ansi_up.escape_for_html(data); // eslint-disable-line
      data = ansi_up.ansi_to_html(data); // eslint-disable-line
      p.innerHTML = _highlightWord(data);

      div.className = 'line';
      div = _highlightLine(data, div);
      div.addEventListener('click', function click() {
        if (this.className.indexOf('selected') === -1) {
          this.className = 'line-selected';
        } else {
          this.className = 'line';
        }
      });

      _requestFrame(data);
      div.appendChild(p);
      _filterElement(div);
      //_logContainer.appendChild(div);

      if (_logContainer.children.length > _linesLimit) {
        _logContainer.removeChild(_logContainer.children[0]);
      }

      if (wasScrolledBottom) {
        window.scrollTo(0, document.body.scrollHeight);
      }

      _updateFaviconCounter();
    },
  };
}(window, document));
