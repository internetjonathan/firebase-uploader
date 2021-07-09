const { db, admin } = require('../util/admin');
const config = require('../util/config')


exports.getAllPosts = (req, res) => {
    db.collection("posts").get().then((data) => {
        let posts = []
        data.forEach(doc => {
            posts.push({
                postId: doc.id,
                imgUrl: doc.data().imgUrl,
                userName: doc.data().userName,
                createdAt: doc.data().createdAt,
                title: doc.data().title,
                category: doc.data().category
            })
        });
        return res.json(posts)

    })
        .catch((err) => {
            console.error(err)
        })
}

exports.postOnePost = (req, res) => {

    const BusBoy = require('busboy')
    const path = require('path')
    const os = require('os')
    const fs = require('fs')

    const busboy = new BusBoy({ headers: req.headers })

    let uploadFileName;
    let fileToBeUploaded = {};

    const newPost = {
        userName: req.user.userName,
        createdAt: new Date().toISOString(),
        imageUrl: null,
        title: null
    };

    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
        newPost.category = val;
    });

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const uploadExtension = filename.split('.')[filename.split('.').length - 1];
        uploadFileName = filename;
        newPost.title = filename;
        const filepath = path.join(os.tmpdir(), uploadFileName);
        fileToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
        admin.storage().bucket().upload(fileToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: fileToBeUploaded.mimetype
                }
            }
        })
            .then(() => {
                const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${uploadFileName}?alt=media`
                newPost.imageUrl = fileUrl;
                return db.collection("posts")
                    .add(newPost)
                    .then((doc) => {
                        res.json({ message: `document ${doc.id} created successfully` })
                    })
                    .catch((err) => {
                        res.status(500).json({ error: "something went wrong" })
                        console.error(err)
                    })
            })
            .then(() => {
                return res.json({ message: 'file uploaded' })
            })
            .catch(err => {
                console.error(err)

            })
    })
    busboy.end(req.rawBody)
}

exports.deletePost = (req, res) => {
    const document = db.doc(`posts/${req.params.postId}`)
    document.get()
        .then(doc => {

            if (!doc.exists) {
                return res.status(404).json({ error: "post does not exist" })
            }
            if (doc.data().userName !== req.user.userName) {
                return res.status(403).json({ error: "unauthorized" })
            } else {
                return document.delete()
            }
        })
        .then(() => {
            return res.json({ message: "successfully deleted post" })
        })
        .catch(err => {
            console.error(err)
            return res.stats(500).json(err)
        })
}

// exports.uploadImage = (req, res) => {
//     const BusBoy = require('busboy')
//     const path = require('path')
//     const os = require('os')
//     const fs = require('fs')

//     const busboy = new BusBoy({ headers: req.headers })

//     let uploadFileName;
//     let fileToBeUploaded = {};

//     busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
//         const uploadExtension = filename.split('.')[filename.split('.').length - 1];
//         uploadFileName = `${Math.round(Math.random() * 100000000000000)}.${uploadExtension}`;
//         const filepath = path.join(os.tmpdir(), uploadFileName);
//         fileToBeUploaded = { filepath, mimetype };
//         file.pipe(fs.createWriteStream(filepath));
//     });
//     busboy.on('finish', () => {
//         admin.storage().bucket().upload(fileToBeUploaded.filepath, {
//             resumable: false,
//             metadata: {
//                 metadata: {
//                     contentType: fileToBeUploaded.mimetype
//                 }
//             }
//         })
//             .then(() => {
//                 const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${uploadFileName}?alt=media`
//                 return db.doc(`/posts/${req.posts.id}`).update({ imageUrl: fileUrl })
//             })
//             .then(() => {
//                 return res.json({ message: 'file uploaded' })
//             })
//             .catch(err => {
//                 console.error(err)

//             })
//     })
//     busboy.end(req.rawBody)
// }