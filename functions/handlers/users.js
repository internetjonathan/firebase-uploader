const { db } = require('../util/admin')
const config = require('../util/config')
const firebase = require('firebase')
const { validateSignupData, validateLoginData } = require('../util/validators')
firebase.initializeApp(config)

exports.signUp = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        userName: req.body.userName,
    }
    const { valid, errors } = validateSignupData(newUser)

    if (!valid) {
        return res.status(400).json(errors)
    }
    let token, userId;
    db.doc(`/users/${newUser.userName}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ userName: 'This name is taken' })
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then(idToken => {
            token = idToken
            const userCredentials = {
                userName: newUser.userName,
                email: newUser.email,
                password: newUser.password,
                createdAt: new Date().toISOString(),
                userId
            }
            return db.doc(`/users/${newUser.userName}`).set(userCredentials)
        })
        .then(() => {
            return res.status(201).json({ token })
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ email: 'Email is taken' })
            } else {
                return res.status(500).json({ error: err.code })
            }
        })

}

exports.logIn = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLoginData(user)

    if (!valid) {
        return res.status(400).json(errors)
    }

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({ token })
        })
        .catch(err => {
            console.error(err)
            return res.status(500)
        })
}