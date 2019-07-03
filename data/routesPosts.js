const express = require('express');

const PostDB = require('./helpers/postDb.js');
const UserDB = require('./helpers/userDb.js');

const routesPosts = express.Router();


// Server.js handles the /api path. Router.js handles the posts path


// Get all the posts
routesPosts.get('/', async (req, res) => {
    try {
        const posts = await PostDB.get(req.query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "The posts could not be retrieved." });
    }
});


// Get single post by id
routesPosts.get('/:id', async (req, res) => {
    try {
        const postById = await PostDB.getById(req.params.id);
        if (!postById) {  
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(200).json(postById);
        }
    } 
    catch (error) { 
        res.status(500).json({ error: "The post could not be retrieved." });
    }
});


// Add a new post as user by id
routesPosts.post('/', async (req, res) => {

    if (!req.body.text) {
        return res.status(400).json({ message: "Post cannot be blank!" });
    }
    if (!req.body.user_id) {
        return res.status(400).json({ message: "Please include user id." });
    }
    
    try {
        const checkUserExists = await PostDB.getUserById(req.body.user_id);
        if (!checkUserExists) {
            return res.status(400).json({ message: "User does not exist." });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error checking for existence of user." })
    }

    try {
        const post = await PostDB.insert(req.body);
        res.status(200).json(`Successfully added post as user_id: ${post.user_id}`);
    }
    catch (error) {
        res.status(500).json({ error: "Error adding post!" });
    }
});


// Delete a post from the db
routesPosts.delete('/:id', async (req, res) => {
    const checkPostExists = await PostDB.getById(req.params.id);
    if (!checkPostExists) { 
        return res.status(404).json({ message: "The post with ID does not exist. Cannot delete!" });
    }
    try {
        const postDeleted = await PostDB.remove(req.params.id);
        if (postDeleted > 1) {
            res.status(200).json({ message: `${postDeleted} posts have been deleted`, deletedPost: checkPostExists })
        } else {
            res.status(200).json({ message: `${postDeleted} post has been deleted`, deletedPost: checkPostExists })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong deleting post!"})
    }
});


// Update post
routesPosts.put('/:id', async (req, res) => {
    const checkPostExists = await PostDB.getById(req.params.id);
    if (!checkPostExists) { 
        return res.status(404).json({ message: "The post with the specified ID does not exist. Cannot update!" });
    } 
    if (!req.body.text) {
        return res.status(400).json({ message: "Please include text to update post with. Nothing to update." })
    }

    try {
        const postUpdate = await PostDB.update(req.params.id, req.body);
        res.status(200).json({ 
            message: `${postUpdate} post has been updated`, 
            originalPost: checkPostExists, 
            updatedPost: req.body
        });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong updating post!"});
    }
});



module.exports = routesPosts;
