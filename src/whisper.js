(function(window) {
	if (window.$W !== undefined) {
		return $W;
	}

	window.eventsCache = {};

	var add;

	//
	if (typeof addEventListener === 'function') {
		document.addEventListener('click', function(e) {
			var el = e.target;
			if (window.eventsCache[el] !== undefined) {
				for (var i = 0; i < window.eventsCache[el]['click'].length; i++) {
					window.eventsCache[el]['click'][i]();
				}
			}
		});
	}

	function addListener(el, event, callback) {
		if (window.eventsCache[el] !== undefined) {
			if (window.eventsCache[el][event] !== undefined) {
				window.eventsCache[el][event].push(callback);
			}
			else {
				window.eventsCache[el][event] = [callback];
			}
		}
		else {
			window.eventsCache[el] = {};
			window.eventsCache[el][event] = [callback];
			console.log(window.eventsCache[el]);
		}
	}

	function removeListener(el, event, callback) {
		if (window.eventsCache[el] !== undefined) {
			if (callback === undefined) {
				if (window.eventsCache[el][event] !== undefined) {
					window.eventsCache[el][event] = undefined;
				}
			}
			else {
				if (window.eventsCache[el][event] !== undefined) {
					window.eventsCache[el][event].splice(indexOf(callback), 1);
				}
				else {
					window.eventsCache[el][event] = [callback];
				}
			}
		}
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