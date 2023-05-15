import { database, auth } from '../functions/firebase';
import { getDatabase, ref, set, get, child, onValue } from 'firebase/database';
import { setAllChats, setAllUsers, setTrackHistory } from './data.slice';
import { store } from '../redux/store';

export const getAllConversations = () => {
   return new Promise((resolve, reject) => {
      const dbRef = ref(database);
      get(child(dbRef, `conversations/`))
         .then((snapshot) => {
            if (snapshot.exists()) {
               resolve(snapshot.val());
            } else {
               console.log('No data available');
               resolve([]);
            }
         })
         .catch((error) => {
            console.error(error);
            reject(error);
         });
   });
};

export const getUserList = () => {
   return new Promise((resolve, reject) => {
      const dbRef = ref(database);
      get(child(dbRef, `users/`))
         .then((snapshot) => {
            if (snapshot.exists()) {
               resolve(snapshot.val());
            } else {
               console.log('No data available');
               resolve([]);
            }
         })
         .catch((error) => {
            console.error(error);
            reject(error);
         });
   });
};

export const getAllUsers = async (dispatch) => {
   const dbRef = ref(database);
   get(child(dbRef, `users/`))
      .then((snapshot) => {
         if (snapshot.exists()) {
            const allUsers = snapshot.val();
            const allOtherUsers = allUsers.filter((user) => user.userId !== auth.currentUser.uid);
            dispatch(setAllUsers(allOtherUsers));
            return allOtherUsers;
         } else {
            console.log('No data available');
            dispatch(setAllUsers([]));
         }
      })
      .catch((error) => {
         console.error(error);
      });
};

export async function writeUserData(userId, name, email, imageUrl, userType) {
   const allUsers = await getUserList();

   allUsers.push({
      userId: userId,
      username: name,
      email: email,
      profile_picture: imageUrl,
      userType: userType
   });
   set(ref(database, 'users/'), allUsers);
}

export const setMessageRead = async (senderId, receiverId) => {
   const allConversations = await getAllConversations();
   const thisConversation = allConversations.filter(
      (chat) => (chat.user1 === senderId && chat.user2 === receiverId) || (chat.user1 === receiverId && chat.user2 === senderId)
   );

   if (thisConversation.length) {
      // add chat to existing conversation
      thisConversation[0].chats.forEach((chat) => {
         if (chat.senderId === receiverId) {
            chat.isRead = true;
         }
      });
      // update the list of all conversations
      const index = allConversations.findIndex(
         (chat) => (chat.user1 === senderId && chat.user2 === receiverId) || (chat.user1 === receiverId && chat.user2 === senderId)
      );
      allConversations[index] = thisConversation[0];

      set(ref(database, 'conversations/'), allConversations);
      return;
   }
   return;
};

export async function saveChat(senderId, receiverId, message) {
   const allConversations = await getAllConversations();
   const thisConversation = allConversations.filter(
      (chat) => (chat.user1 === senderId && chat.user2 === receiverId) || (chat.user1 === receiverId && chat.user2 === senderId)
   );
   if (thisConversation.length) {
      // add chat to existing conversation
      thisConversation[0].chats.push({
         receiverId,
         senderId,
         message: message,
         time: new Date().getTime(),
         isRead: false
      });
      // update the list of all conversations
      const index = allConversations.findIndex(
         (chat) => (chat.user1 === senderId && chat.user2 === receiverId) || (chat.user1 === receiverId && chat.user2 === senderId)
      );

      allConversations[index] = thisConversation[0];

      set(ref(database, 'conversations/'), allConversations);
      return;
   } else {
      // add chat to a new conversation
      allConversations.push({
         id: allConversations.length + 1,
         user1: senderId,
         user2: receiverId,
         chats: [
            {
               receiverId,
               senderId,
               message: message,
               time: new Date().getTime(),
               isRead: false
            }
         ]
      });
      set(ref(database, 'conversations/'), allConversations);
      return;
   }
}

export const getAllUserConversations = (dispatch) => {
   const dbRef = ref(database);
   get(child(dbRef, `conversations/`))
      .then((snapshot) => {
         if (snapshot.exists()) {
            const allConversations = snapshot.val();
            const userConversations = allConversations.filter((chat) => chat.user1 === auth.currentUser.uid || chat.user2 === auth.currentUser.uid);
            dispatch(setAllChats(userConversations));
            return userConversations;
         } else {
            console.log('No data available');
            dispatch(setAllChats([]));
         }
      })
      .catch((error) => {
         console.error(error);
      });
};

export const getUserTrackHistory = (dispatch) => {
   const dbRef = ref(database);
   get(child(dbRef, `users/`))
      .then((snapshot) => {
         if (snapshot.exists()) {
            const allUsers = snapshot.val();
            const currentUser = allUsers.filter((user) => user.userId === auth.currentUser.uid);
            dispatch(setTrackHistory(currentUser[0].location || []));
            return snapshot.val();
         } else {
            console.log('No data available');
            dispatch(setTrackHistory([]));
         }
      })
      .catch((error) => {
         console.error(error);
      });
};

const conversationListener = () => {
   const dbRef = ref(database, 'conversations/');

   onValue(
      dbRef,
      (snapshot) => {
         if (snapshot.exists()) {
            const allConversations = snapshot.val();
            const userConversations = allConversations.filter((chat) => chat.user1 === auth.currentUser.uid || chat.user2 === auth.currentUser.uid);
            store.dispatch(setAllChats(userConversations));
         } else {
            console.log('No data available');
         }
      },
      (error) => {
         console.error(error);
      }
   );
};

const usersListener = () => {
   const dbRef = ref(database, 'users/');

   onValue(
      dbRef,
      (snapshot) => {
         if (snapshot.exists()) {
            const allUsers = snapshot.val();
            const allOtherUsers = allUsers.filter((user) => user.userId !== auth.currentUser.uid);
            store.dispatch(setAllUsers(allOtherUsers));
         } else {
            console.log('No data available');
         }
      },
      (error) => {
         console.error(error);
      }
   );
};

export const saveCurrentLocation = async (location) => {
   console.log('SAVING LOCATIONlocation', location);
   const allUsers = await getUserList();
   const index = allUsers.findIndex((user) => user.userId === auth.currentUser.uid);

   if (allUsers[index].location) {
      const userTrack = allUsers[index].location;
      console.log('userTrack', userTrack);
      if (userTrack[userTrack.length - 1].latitude === location.latitude && userTrack[userTrack.length - 1].longitude === location.longitude) {
         console.log('SAME LOCATION');
         return;
      }
      userTrack.push(location);
      allUsers[index].location = userTrack;
      set(ref(database, 'users/'), allUsers);
      return;
   } else {
      allUsers[index].location = [location];
      set(ref(database, 'users/'), allUsers);
      return;
   }
};

conversationListener();
usersListener();
