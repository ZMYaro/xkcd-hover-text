function setCaption(settings) {
	var midCont = document.getElementById("comic");
	if (midCont) {
		var image = midCont.getElementsByTagName("img")[0];
		if (image) {
			// Create and style the caption element.
			captionDiv = document.createElement("div");
			captionDiv.style.padding = '5px';
			settings.fontSize = Math.max(settings.fontSize, MIN_FONT_SIZE);
			settings.fontSize = Math.min(settings.fontSize, MAX_FONT_SIZE);
			captionDiv.style.fontSize = settings.fontSize + 'px';
			
			if (settings.mouseOver) {
				captionDiv.style.display = 'none';
			}
			
			if (settings.bgColor === 'white') {
				captionDiv.style.color = 'black';
			} else if (settings.bgColor === 'black') {
				captionDiv.style.backgroundColor = 'black';
				captionDiv.style.color = 'white';
			}
			
			if (settings.captionPos === 'top') {
				captionDiv.style.marginBottom = '20px';
			}
			//position: relative; top: 5px;
			
			// Fetch the caption text.
			captionDiv.innerHTML = image.getAttribute("title");
			
			// Insert the caption element.
			if (image.nextSibling) {
				image.parentNode.insertBefore(captionDiv,
					settings.captionPos === 'top'? image : image.nextSibling);
			} else {
				if (settings.captionPos === 'top') {
					image.parentNode.insertBefore(captionDiv, image);
				} else {
					image.parentNode.appendChild(captionDiv);
				}
			}
			
			// Add mouse listeners if the user set that option.
			if (settings.mouseOver) {
				image.addEventListener('mouseover', function () {
					captionDiv.style.display="";
					if (settings.captionPos === 'top') {
						window.scrollBy(0, captionDiv.offsetHeight + 20);
					}
				}, false);
				image.addEventListener('mouseout', function () {
					if (settings.captionPos === 'top') {
						window.scrollBy(0, -captionDiv.offsetHeight - 20);
					}
					captionDiv.style.display = 'none';
				}, false);
			}
		}
	}
}

chrome.storage.sync.get(DEFAULTS, setCaption);
