window.SR = function (c) {

  this.version = c.version;
  this.appId = c.appId
  if (c.config) {
    this.config = c.config
  } else {
    this.config = {
      apiKey: "AIzaSyBGxpBaFvFlgF94z6aXfCO1s4tT7NeXP9c",
      authDomain: "sr-analytics-a968c.firebaseapp.com",
      databaseURL: "https://sr-analytics-a968c.firebaseio.com",
      projectId: "sr-analytics-a968c",
      storageBucket: "sr-analytics-a968c.appspot.com",
      messagingSenderId: "857744111888"
    }
  }
  console.log(`Stomp Rocket Analytics app version ${this.version}, app id ${this.appId}`)
  let sr = firebase.initializeApp(this.config);
  let db = sr.database()
  let baseUrl = `apps/${this.appId}`
  let ip
  fetch('https://api.ipify.org?format=json')
  .then((resp) => resp.json()) // Transform the data into json
  .then(data => {
    // Create and append the li's to the ul
    ip = data
  })

  firebase.auth().signInAnonymously().catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  firebase.auth().onAuthStateChanged((user) => {
    let time = new Date().getTime();
    if (user) {
      this.uid = user.uid;
      //console.log(this.uid)
      db.ref(`${baseUrl}/users/${this.uid}/stats`).set({
          id: this.uid,
          version:this.version,
          lastSeen: time,
        lastIp: ip
        })
      let sessionRef = db.ref(`${baseUrl}/users/${this.uid}/times`).push()
      sessionRef.set({
        id: this.uid,
        version: this.version,
        time: time,
        ip: ip
      })
    // console.log(sessionRef.key)
      db.ref(`${baseUrl}/users/${this.uid}/times/${sessionRef.key}/timeOff`).set(new Date().getTime())
    }
  });
}