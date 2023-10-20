var firebaseConfig = {
    apiKey: "AIzaSyBwSVrTCbrWe805gBfIDzsrwAtpCuM1m0A",
    authDomain: "hestia-waitlist.firebaseapp.com",
    databaseURL: "https://hestia-waitlist-default-rtdb.firebaseio.com",
    projectId: "hestia-waitlist",
    storageBucket: "hestia-waitlist.appspot.com",
    messagingSenderId: "314464097015",
    appId: "1:314464097015:web:cd4ab7b358ad57821639f2",
    measurementId: "G-H44JV48RF7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function onClick(){
    const submitButton = document.getElementById("submit");
    submitButton.innerHTML = submitButton.innerHTML.replace(/\n\r?/g, '<br />');
    const alerts = document.getElementById("alerts");

    const emailInput = document.getElementById("email-input");
    const email = emailInput.value;

    if (!isValidEmail(email)) {
        alerts.textContent="Invalid email";
        return;
    }

    const dbRef = firebase.database().ref('emails');
    const emailKey = email.replace(/[.#$\[\]]/g, '_');

    dbRef.child(emailKey).once('value', snapshot => {
        if (snapshot.exists()) {
            alerts.textContent="Email is already in list";
        } else {
            alerts.textContent="";
            dbRef.child(emailKey).set(email);
            const submitButton = document.getElementById("submit");
            submitButton.textContent="Thank you for\r\nsigning up";
            submitButton.innerHTML = submitButton.innerHTML.replace(/\n\r?/g, '<br />');
        }
    });
}