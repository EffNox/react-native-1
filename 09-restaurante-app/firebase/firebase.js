import app from "firebase/app";
import firebaseConfig from "./config";
import 'firebase/firestore'

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.db = app.firestore()
    }
}

const firebase = new Firebase();
// firebase.firestore().settings({ experimentalForceLongPolling: true });
firebase.db.app.firestore().settings({ experimentalForceLongPolling: true });
export default firebase;
