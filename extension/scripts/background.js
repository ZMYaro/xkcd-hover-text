chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request.settings){
			var settings = {};
			for(var i in localStorage){
				settings[i] = localStorage[i];
			}
			sendResponse({"settings":settings});
		}
	}
);
