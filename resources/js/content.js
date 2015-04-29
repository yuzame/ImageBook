document.addEventListener("contextmenu", function(e) {
	var element = e.toElement;
	url = getComputedStyle(element).getPropertyValue("background-image");
	if (url === "none") return;
    chrome.runtime.sendMessage({
			type: 'BACKGROUND_IMAGE',
			url: url
		});
});

