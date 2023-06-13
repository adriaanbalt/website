import getUserId from "./getUserId";

export function event(name, body) {
    let dev = window.location.toString().includes('localhost');
    const userId = getUserId();
    body = {...body, userId }
    
    if ( !dev ) {
        gtag('event', name, body);
        // segment.com
        window.analytics.track(name, body);
    }
}
