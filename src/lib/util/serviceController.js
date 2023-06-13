// import * as contentful from 'contentful';

// const CONTENTFUL_SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
// const CONTENTFUL_ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
// const CONTENTFUL_PREVIEW = import.meta.env.VITE_CONTENTFUL_PREVIEW === 'true';

// export const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

// let client;

// function getClient() {
// 	if (!client) {
// 		client = contentful.createClient({
// 			space: CONTENTFUL_SPACE_ID,
// 			accessToken: CONTENTFUL_ACCESS_TOKEN,
// 			host: CONTENTFUL_PREVIEW ? 'preview.contentful.com' : 'cdn.contentful.com',
// 			removeUnresolved: true
// 		});
// 	}
// 	return client;
// }

// export async function getHomePage() {
// 	const response = await getClient().getEntries({
// 		content_type: 'homepage',
// 		include: 3
// 	});
// 	return response.items[0];
// }

// export async function getMeritPage() {
// 	const response = await getClient().getEntries({
// 		content_type: 'meritpage',
// 		include: 3
// 	});
// 	return response.items[0];
// }

// export async function getLegalPage() {
// 	const response = await getClient().getEntries({
// 		content_type: 'legalPage',
// 		include: 3
// 	});
// 	return response.items[0];
// }

// export async function getFooter() {
// 	const response = await getClient().getEntries({
// 		content_type: 'footer',
// 		include: 1
// 	});
// 	return response.items[0];
// }
