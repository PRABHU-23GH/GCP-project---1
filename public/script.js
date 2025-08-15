// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEy9SIlzIUmYujRzg7af7syAoKttnnq_A",
  authDomain: "real-time-poll-app.firebaseapp.com",
  projectId: "real-time-poll-app"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const pollRef = db.collection("polls").doc("main");

// Initialize poll document if not present
pollRef.get().then((doc) => {
  if (!doc.exists) {
    pollRef.set({ yes: 0, no: 0 });
  }
});

// Function to register a vote
function vote(option) {
  pollRef.update({
    [option]: firebase.firestore.FieldValue.increment(1)
  }).catch((error) => {
    console.error("Error voting:", error);
  });
}

// Real-time listener to update vote counts
pollRef.onSnapshot((doc) => {
  if (doc.exists) {
    const data = doc.data();
    document.getElementById("yes-count").textContent = data.yes || 0;
    document.getElementById("no-count").textContent = data.no || 0;
  }
});
