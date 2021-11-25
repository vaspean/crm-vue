import firebase from "@firebase/app-compat"
// import firebase from 'firebase/compat/app'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        throw error
      }
    }
  }
}
