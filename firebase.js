const firebaseConfig = {
  apiKey: "AIzaSyAxt0tJ3E5XHGeiwrQiY8LD1W5bVH0gBX8",
  authDomain: "solo-leveling-painel.firebaseapp.com",
  projectId: "solo-leveling-painel",
  storageBucket: "solo-leveling-painel.appspot.com",
  messagingSenderId: "437464048214",
  appId: "1:437464048214:web:a0733fc7bea4078df391f7",
  measurementId: "G-3PYTM7TKRC"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
