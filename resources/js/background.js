var BOOK_KEY = 'bookimage';
var TAB_KEY = 'lasttab';
var TITLE = 'ImageBook';
var rimg = /.jpg|.png|.jpeg|.gif/;
var storage = chrome.storage.sync;
var parentID, backUrl;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    	switch(request.type) {
    		case 'COPY':
    		    copyToClipboard(request.url);
    		    break;
    		case 'BACKGROUND_IMAGE':
    		    backUrl = request.url.slice(4, -1)
    		    break;
    		case 'SAVE':
    			init();
    			break
    		default:
    		    break;
    	}
});

function copyToClipboard(url) {
    var textarea = document.createElement("textarea");
    textarea.style.cssText = "position:absolute;left:-100%";
    document.body.appendChild(textarea);
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

function save(tab, url) {
	storage.get(BOOK_KEY, function(book) {
		var data = {}
        var images = JSON.parse(book[BOOK_KEY] || '{}');
        var tabimages = images[tab] || [];
		tabimages.push(url);
		images[tab] = tabimages;
		data[BOOK_KEY] = JSON.stringify(images);
		storage.set(data, function() {
			if (chrome.runtime.error) {
				console.log(chrome.runtime.error);
			}
		});
	});
}

function createMenu(tab, i) {
	var id = chrome.contextMenus.create({
		title: tab,
		contexts:["image", "selection", "link"],
		parentId: parentID,
		onclick: function(info, e) {
			var url = backUrl || info.selectionText || info.linkUrl;
			if (rimg.exec(info.srcUrl) || info.mediaType === "image") {
				url = info.srcUrl
			}
			backUrl = '';
			save(tab, url);
		}
	});
}

function init() {
	storage.get(BOOK_KEY, function(book) {
		chrome.contextMenus.removeAll();
		parentID = chrome.contextMenus.create({
			title: TITLE,
			"contexts":["image", "selection", "link"]
			});
		var images = JSON.parse(book[BOOK_KEY] || '{}');
		var tabs = Object.keys(images);
		tabs.forEach(createMenu);
		//backUrl = "";
	});
}

init();