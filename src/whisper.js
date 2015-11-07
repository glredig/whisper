/*!
  WhisperJS click event delegation {{ version }}
  Gabriel Redig
  License: MIT
*/


(function(window) {
	if (window.$W !== undefined) {
		return $W;
	}

	eventsCache = {};

	//
	if (typeof addEventListener === 'function') {
		document.addEventListener('click', function(e) {
			fireCallbacks(e);
		});
	}
	else if (typeof attachEvent === 'function') {
		document.attachEvent('onclick', function(e) {
			fireCallbacks(e);
		});
	}

	function fireCallbacks(e) {
		var el = e.target,
			ident = e.target.getAttribute('data-whisper-id');

		if (eventsCache[ident] !== undefined && eventsCache[ident]['click'] !== undefined) {
			for (var i = 0; i < eventsCache[ident]['click'].length; i++) {
				eventsCache[ident]['click'][i]();
			}
		}
	}

	function addListener(el, event, callback) {
		var ident = el.getAttribute('data-whisper-id') === null ? generateId() : el.getAttribute('data-whisper-id');
		
		el.setAttribute('data-whisper-id', ident);

		if (eventsCache[ident] !== undefined) {
			if (eventsCache[ident][event] !== undefined) {
				eventsCache[ident][event].push(callback);
			}
			else {
				eventsCache[ident][event] = [callback];
			}
		}
		else {
			eventsCache[ident] = {};
			eventsCache[ident][event] = [callback];
		}
	}

	function removeListener(el, event, callback) {
		var ident = el.getAttribute('data-whisper-id') === null ? generateId() : el.getAttribute('data-whisper-id');
		if (eventsCache[ident] !== undefined) {
			if (callback === undefined) {
				if (eventsCache[ident][event] !== undefined) {
					eventsCache[ident][event] = undefined;
				}
			}
			else {
				if (eventsCache[ident][event] !== undefined) {
					eventsCache[ident][event].splice(indexOf(callback), 1);
				}
				else {
					eventsCache[ident][event] = [callback];
				}
			}
		}
	}

	// Necessary to track DOM elements with listeners added
	function generateId() {
		return Math.floor(Math.random() * 1000000) + ((new Date).getTime()).toString();
	}

	window.$W = function(el) {
		return {
			on: function(event, callback) {
				addListener(el, event, callback);
			},
			off: function(event, callback) {
				removeListener(el, event, callback);
			}
		}
	}

})(window);