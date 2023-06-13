export const CONTENTFUL_RENDER_OPTIONS = {
	renderNode: {
		['paragraph']: (node, next) => `<p>${next(node.content).replace(/\n/g, `</br>`)}</p>`,
		['hyperlink']: (node, next) => {
			return `<a href="${node.data.uri}"${
				node.data.uri.startsWith('/') || node.data.uri.includes('balt.us')
					? ''
					: ' target="_blank"'
			}>${next(node.content)}</a>`;
		}
	}
};

export function rand(min, max) {
	const r = Math.random() * (max - min) + min;
	return Math.floor(r);
}

export function lerp(start, end, amt) {
	return (1 - amt) * start + amt * end;
}

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export function scale(number, inMin, inMax, outMin, outMax) {
	return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function getPointInBetweenByLen(pointA, pointB, length) {
	const dir = pointB.clone().sub(pointA).normalize().multiplyScalar(length);
	return pointA.clone().add(dir);
}

export function isTouch() {
	return Boolean('ontouchstart' in window || navigator.maxTouchPoints);
}

export function addTouchHelper() {
	if (isTouch()) {
		document.documentElement.classList.add('touch');
	} else {
		document.documentElement.classList.add('no-touch');
	}
}

export function validateEmail(email) {
	if (/\S+@\S+\.\S+/.test(email)) {
		return true;
	} else {
		return false;
	}
}

export function getContentfulImageUrl(image) {
	return image && image.fields ? 'https:' + image.fields.file.url : null;
}

export function getContentfulImageAlt(image) {
	return image && image.fields ? image.fields.description : null;
}

export function formatContentfulDate(date) {
	return new Date(date).toLocaleString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

export function getContentfulTags(tags) {
	return tags.length ? tags[0].sys.id : '';
}

export function getDateTimeByZone(zone) {
	const dateOptions = {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};

	const timeOptions = {
		hour: 'numeric',
		minute: 'numeric'
	};

	timeOptions.timeZone = dateOptions.timeZone = zone;
	const date = new Date().toLocaleString(undefined, dateOptions);
	const time = new Date().toLocaleString(undefined, timeOptions).replace(/AM|PM/, '');
	return { date: date, time: time };
}

export function shortenText(string, maxLength) {
	var trimmedString = string.substr(0, maxLength);
	return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
}

/**
 * Converts :hover CSS to :active CSS on mobile devices.
 * Otherwise, when tapping a button on a mobile device, the button stays in
 * the :hover state until the button is pressed.
 *
 * Inspired by: https://gist.github.com/rcmachado/7303143
 * @author  Michael Vartan <michael@mvartan.com>
 * @version 1.0
 * @date    2014-12-20
 */
export function hoverTouchUnstick() {
	// Check if the device supports touch events
	if ('ontouchstart' in document.documentElement) {
		// Loop through each stylesheet
		for (var sheetI = document.styleSheets.length - 1; sheetI >= 0; sheetI--) {
			var sheet = document.styleSheets[sheetI];
			// Verify if cssRules exists in sheet
			if (sheet.cssRules) {
				// Loop through each rule in sheet
				for (var ruleI = sheet.cssRules.length - 1; ruleI >= 0; ruleI--) {
					var rule = sheet.cssRules[ruleI];
					// Verify rule has selector text
					if (rule.selectorText) {
						// Replace hover psuedo-class with active psuedo-class
						rule.selectorText = rule.selectorText.replace(':hover', ':active');
					}
				}
			}
		}
	}
}

export function parseSharingLinks() {
	// twitter
	var twitterShares = document.querySelectorAll('[data-js="twitter-share"]');
	for (var i = 0; i < twitterShares.length; i++) {
		var twitterShare = twitterShares[i];
		twitterShare.onclick = function (e) {
			e.preventDefault();
			var w = 600,
				h = 350;
			var l = screen.width / 2 - w / 2;
			var t = screen.height / 2 - h / 2;
			var twitterWindow = window.open(
				'https://twitter.com/share?url=' +
					document.URL +
					'&text=' +
					e.target.getAttribute('data-tweet'),
				'twitter-popup',
				'height=' + h + ',width=' + w + ',left=' + l + ',top=' + t
			);
			if (twitterWindow.focus) {
				twitterWindow.focus();
			}
			return false;
		};
	}

	// facebook
	var facebookShares = document.querySelectorAll('[data-js="facebook-share"]');
	for (var i = 0; i < facebookShares.length; i++) {
		var facebookShare = facebookShares[i];
		facebookShare.onclick = function (e) {
			e.preventDefault();
			var w = 600,
				h = 350;
			var l = screen.width / 2 - w / 2;
			var t = screen.height / 2 - h / 2;
			var facebookWindow = window.open(
				'https://www.facebook.com/sharer/sharer.php?u=' + document.URL,
				'facebook-popup',
				'height=' + h + ',width=' + w + ',left=' + l + ',top=' + t
			);
			if (facebookWindow.focus) {
				facebookWindow.focus();
			}
			return false;
		};
	}

	//copy
	var copyLinks = document.querySelectorAll('[data-js="copy-link"]');
	for (var i = 0; i < copyLinks.length; i++) {
		var copyLink = copyLinks[i];
		copyLink.onclick = function (e) {
			e.preventDefault();
			var textArea = document.createElement('input');
			textArea.value = e.target.getAttribute('data-copy-text');
			this.parentElement.appendChild(textArea);
			textArea.select();
			try {
				var successful = document.execCommand('copy');
				var msg = successful ? 'successful' : 'unsuccessful';
			} catch (err) {
				console.log('Oops, unable to copy', err);
			}
			this.parentElement.removeChild(textArea);

			var text = this.innerHTML;
			this.innerHTML = 'Link Copied';
			this.classList.add('disabled');

			var self = this;
			setTimeout(() => {
				self.innerHTML = text;
				self.classList.remove('disabled');
			}, 2000);
			return false;
		};
	}
}

export function isInView(element) {
	const rect = element.getBoundingClientRect();
	return rect.top <= window.innerHeight && rect.bottom >= 0;
}

export function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
