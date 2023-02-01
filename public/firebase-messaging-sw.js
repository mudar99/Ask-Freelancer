// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../firebase-messaging-sw.js')
//       .then(function(registration) {
//         console.log('Registration successful, scope is:', registration.scope);
//       }).catch(function(err) {
//         console.log('Service worker registration failed, error:', err);
//       });
//     }

importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyA1msCV6oobQEgoFstT3DK1IR6xZ3_pxbw",
    authDomain: "ask-freelancer.firebaseapp.com",
    projectId: "ask-freelancer",
    storageBucket: "ask-freelancer.appspot.com",
    messagingSenderId: "791877754371",
    appId: "1:791877754371:web:1181a0ee50e3ab9c48f836",
    measurementId: "G-B6TWMDJDFM"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    console.log('Recieved Background message: ', payload)
    const notificaitonTitle = payload.notificaiton.title;
    const notificaitonOptions = {
        body: payload.notificaiton.body
    };
    self.registration.showNotification(notificaitonTitle, notificaitonOptions);
});

// messaging.onBackGroundMessage(function (payload) {
//     console.log('Recieved Background message: ', payload)
//     const notificaitonTitle = payload.notificaiton.title;
    // const notificaitonOptions = {
    //     body: payload.notificaiton.body
    // };

//     self.ServiceWorkerRegistration.showNotification(notificaitonTitle, notificaitonOptions);
// })