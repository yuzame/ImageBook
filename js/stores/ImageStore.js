var AppDispatcher = require('../dispatcher/AppDispatcher');
var C = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var storage = chrome.storage.sync;
var CHANGE_EVENT = 'change';

var BOOK_KEY = 'bookimage';
var TAB_KEY = 'lasttab';
var port;
var _images, _tab, _mode = 'plain';
var _index  = -1;

initMode();
initBook();

function initBook() {
    var images, tab;
    storage.get(BOOK_KEY, function(book) {
        _images = JSON.parse(book[BOOK_KEY] || '{}');
        var tabs   = Object.keys(_images);
        _tab       = tabs[0] || '';
        ImageStore.emitChange(CHANGE_EVENT);
    });
}

function initMode() {
    chrome.tabs.query({'active': true, currentWindow: true}, function(tab) {
        var url = tab[0].url;
        var r = /github.com/;
        if (r.exec(url)) _mode = 'markdown';
    });
}

function save(tab, url) {
    var data = {};
    _tab = tab;
    var tabImages = _images[tab] || [];
    tabImages.push(url);
    _images[tab] = tabImages;
    data[BOOK_KEY] = JSON.stringify(_images);
    storage.set(data, function() {
        if (chrome.runtime.error) {
          console.log(chrome.runtime.error);
        }
    });
}

function deleteImage(tab, i) {
    var data = {};
    _tab = tab;
    _index = -1;
    _images[tab].splice(i, 1);
    data[BOOK_KEY] = JSON.stringify(_images);
    storage.set(data, function() {
        if (chrome.runtime.error) {
          console.log(chrome.runtime.error);
        }
    });
}

function deleteTab(tab) {
    var data = {};
    _tab = Object.keys(_images)[0] || '';
    delete _images[tab];
    data[BOOK_KEY] = JSON.stringify(_images);
    storage.set(data, function() {
        if (chrome.runtime.error) {
          console.log(chrome.runtime.error);
        }
    });
}

var ImageStore = assign({}, EventEmitter.prototype, {

    getInitialState: function() {
        return {images: {}, mode: 'plain', tab:'', index: -1};
    },
    
    getState: function() {        
        return {images:_images, mode:_mode, tab:_tab, index: _index};
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    var tab, url, index;
    switch(action.actionType) {
        case C.SAVE:
            tab = action.tab, url = action.url;
            if (tab && url) {
                save(tab, url);
                ImageStore.emitChange(CHANGE_EVENT);
            }
            break;

        case C.DELETE_IMAGE:
            tab = action.tab;
            index = action.index;
            if (tab && index >= 0) {
                deleteImage(tab, index);
                ImageStore.emitChange(CHANGE_EVENT);
            }
            break;

        case C.DELETE_TAB:
            tab = action.tab;
            if (tab !== '') {
                deleteTab(tab);
                ImageStore.emitChange(CHANGE_EVENT);
            }
            break;

        default:
            break;
    }
});

module.exports = ImageStore;
