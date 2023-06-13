export const COLOR_CREAM = '#F0E7E4';
export const COLOR_CHOCOLATE = '#433e3c';
export const COLOR_BRIGHT_GREEN = '#56D270';

export const CONTENTFUL_RICH_TEXT_OPTIONS = {
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
