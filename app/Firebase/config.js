import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAPawRP0s1pAI8HfX3flIqd0YKtFFt8i18",
  projectId: "shopping-cart-rn",
  databaseURL: "https://shopping-cart-rn-default-rtdb.firebaseio.com/",
  appId: "1:50673562191:android:91556d7aaa24051219303a",
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// let app = firebase.initializeApp(config);
export default firebase.initializeApp(firebaseConfig);
