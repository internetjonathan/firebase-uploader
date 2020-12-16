const functions = require('firebase-functions');
const express = require('express');
const app = express()
const FBAuth = require('./util/fbAuth')

const { getAllPosts, postOnePost, deletePost } = require('./handlers/posts')
const { signUp, logIn } = require('./handlers/users')

//post routes
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, postOnePost)
app.delete('/post/:postId', FBAuth, deletePost)

//user routes
app.post('/signup', signUp)
app.post('/login', logIn)
// app.post('/post/image', FBAuth, uploadImage)

exports.api = functions.https.onRequest(app)
