import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDI9cGB8sP4kfvbvOtHFiKkXkrf89E1qc4",
  authDomain: "student-attendence-5ef5d.firebaseapp.com",
  databaseURL: "https://student-attendence-5ef5d-default-rtdb.firebaseio.com",
  projectId: "student-attendence-5ef5d",
  storageBucket: "student-attendence-5ef5d.appspot.com",
  messagingSenderId: "1080917670583",
  appId: "1:1080917670583:web:0e8a03c7bdefbcf5fa6b32"
};
firebase.initializeApp(firebaseConfig);
 
export default firebase.database();