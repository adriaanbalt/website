<script>
//https://zeo.org/resources/blog/how-to-send-user-id-to-google-analytics-4
//https://joyofcode.xyz/sveltekit-google-analytics
import { page } from '$app/stores';
$: {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-CLEQW23GL0', {
            page_title: document.title,
            page_path: $page.path,
        })
    }
}
// Track client-side navigation events
$: if (typeof window !== 'undefined' && window.analytics && $page.path) {
	window.analytics.page();
}
</script>
<svelte:head>
<script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-CLEQW23GL0">
</script>
<script>
    window.dataLayer = window.dataLayer || []

    function gtag() {
        dataLayer.push(arguments)
    }

    gtag('js', new Date())
    gtag('config', 'G-CLEQW23GL0')
</script>
</svelte:head>

<!-- 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCgV6BlxtXyjBtDUawhdqTKa2uLLYy7A0",
  authDomain: "balt-website.firebaseapp.com",
  projectId: "balt-website",
  storageBucket: "balt-website.appspot.com",
  messagingSenderId: "20196450868",
  appId: "1:20196450868:web:35743cbf1cba9a008ca061",
  measurementId: "G-CLEQW23GL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); -->