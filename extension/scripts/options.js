window.onload = function () {
	// Load saved options.
	chrome.storage.sync.get(DEFAULTS, restoreOptions);
}

/**
 * Update the options page UI based on saved settings.
 * @param {Object} settings - The saved setting values
 */
function restoreOptions(settings) {
	// Get the form elements.
	var mouseOverCheckbox = document.getElementById('mouseOver');
	var bgColorSelect = document.getElementById('bgColor');
	var fontSizeInput = document.getElementById('fontSize');
	var captionPosSelect = document.getElementById('captionPos');
	
	// Set each form element's value.
	mouseOverCheckbox.checked = settings.mouseOver;
	bgColorSelect.value = settings.bgColor;
	fontSizeInput.value = settings.fontSize;
	captionPosSelect.value = settings.captionPos;
	
	// Add change event listeners.
	mouseOverCheckbox.onchange =
		bgColorSelect.onchange =
		captionPosSelect.onchange = saveOption;
	fontSizeInput.oninput = function () {
		if (validateSize(this.value)) {
			saveOption.call(this);
		}
	};
	
	// Enable all form elements.
	mouseOverCheckbox.disabled = false;
	bgColorSelect.disabled = false;
	fontSizeInput.disabled = false;
	captionPosSelect.disabled = false;
}

/**
 * Ensure a font size value is valid.
 * @returns {Boolean}
 */
function validateSize(size) {
	return !('' + size).match("[^0-9]") &&
		size >= MIN_FONT_SIZE &&
		size <= MAX_FONT_SIZE;
}

/**
 * Save an option when its form element is changed.
 */
function saveOption() {
	var changes = {};
	if (this.type === 'checkbox') {
		changes[this.id] = this.checked;
	} else {
		changes[this.id] = this.value;
	}
	chrome.storage.sync.set(changes);
}
