import { setDoc, doc, getDoc, addDoc, collection, query, where, getDocs, deleteDoc, } from 'firebase/firestore';
import { db, getAuth, signInWithPopup, GoogleAuthProvider } from './firebase';

export async function saveData(collectionName, docId, jsonObject) {
  try {
    return await setDoc(doc(db, collectionName, docId), jsonObject, {
      merge: true,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function removeData(collectionName, docId) {
  try {
    return await deleteDoc(doc(db, collectionName, docId));
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function saveDataWithoutDocId(collectionName, jsonObject) {
  try {
    return await addDoc(collection(db, collectionName), jsonObject);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function getData(collectionName, docId) {
  try {
    return await getDoc(doc(db, collectionName, docId));
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function getDataWithoutDocId(collectionName, condition) {
  console.log("THis is the condition", condition)
  try {
    let q = null;
    if (condition) {
      q = query(collection(db, collectionName), condition);
    } else {
      q = query(collection(db, collectionName));
    }

    return await getDocs(q);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function signInUsingGoogle() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const { user } = result;

      if (result.user) {
        getData('Users', result.user.uid).then((doc) => {
          if (doc.data()) {
            const user = doc.data();
            const { email } = user;
            localStorage.setItem('email', email);
            localStorage.setItem('userName', user.userName);
            localStorage.setItem('id', result.user.uid);
            window.location.reload()
          } else {
            saveData('Users', result.user.uid, {
              id: result.user.uid,
              email: result.user.email,
              userName: result.user.displayName,
            }).then(() => {
              const { email } = result.user;
              localStorage.setItem('email', email);
              localStorage.setItem('id', result.user.uid);
              localStorage.setItem('userName', result.user.displayName);
              window.location.reload()
            });
          }
        });
      }
    })
    .catch((error) => {
      // Handle Errors here.
      console.log("THis is the error", error)
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const { email } = error.customData;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export async function sendToOpenAi(jsonData,formName) {
  var prompt = formName + " "
  var myHeaders = new Headers();
  JSON.parse(jsonData).map(
    (field) => {
      if (field.value) {
        prompt += field.label.replace("<br>", ": ") + field.value + " "
      }
      else if (field.values) {
        field.values.map(
          (val) => {
            if (val.selected === true) {
              prompt += field.label.replace("<br>", ": ") + val.label + " "
            }
          }
        )
      }
      else{
        prompt += field.label.replace("<br>", "")
      }
    }
  )
  console.log("This is the prompt", prompt)
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "prompt": prompt + " " + "formatted in Html"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("https://formsai-backend.onrender.com/chat", requestOptions)
    .then(response => response.text())
}
