import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;

export const register = async (email, password, username) => {
  const newUser = await auth().createUserWithEmailAndPassword(email, password);
  return await newUser.user.updateProfile({
    displayName: username,
  });
};

export const signin = async (email, password) => {
  await auth().signInWithEmailAndPassword(email, password);
};

export const signOut = () => {
  auth().signOut();
};
