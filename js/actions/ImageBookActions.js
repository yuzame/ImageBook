var AppDispatcher = require('../dispatcher/AppDispatcher');
var C = require('../constants/Constants');

var ImageBookActions = {

    save: function(tab, url) {
        chrome.runtime.sendMessage({
            type: 'SAVE'
        });
        AppDispatcher.dispatch({
            actionType: C.SAVE,
            tab: tab,
            url: url
        });
    },

    copy: function(url, mode, tab) {
        var ret = url;
        switch(mode) {
            case 'markdown':
                ret = "!["+tab+"]"+"("+url+")";
                break;
            case 'html':
                ret = "<img src=\""+url+"\" alt=\""+tab+"\" >";
                break;
            default:
                break;
        }
        chrome.runtime.sendMessage({
            type: 'COPY',
            url: ret
        });
    },

    deleteImage: function(tab, index) {
        AppDispatcher.dispatch({
            actionType: C.DELETE_IMAGE,
            tab: tab,
            index: index
        });
    },
    
    deleteTab: function(tab) {
        AppDispatcher.dispatch({
            actionType: C.DELETE_TAB,
            tab: tab
        });
    }

};

module.exports = ImageBookActions;
