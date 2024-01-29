const noteModel = require('../model/Notes')
const { Router } = require("express");
const noteRoute = Router();
const { body, validationResult } = require('express-validator');
const fetchUser = require('../Middleware/fetchUser')

noteRoute.get('/allNote', fetchUser, async (req, res) => {
    const getNotes = await noteModel.find({ userId: req.user })
    if (getNotes) {
        res.send({ status: 200, data: getNotes })
    } else {
        res.send({ status: 404, message: 'Data Not found' })

    }
})

noteRoute.post('/addNote', fetchUser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'Description must be 5 character !').isLength({ min: 5 }),
], async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let newData = new noteModel({
            title, description, tag, userId: req.user
        })
        let saveNote = await newData.save();
        res.status(200).json(saveNote)
    } catch (err) {
        console.error(err.message);
        res.send({ status: 500, message: "Something went Wrong !" })
    }
})

noteRoute.put('/updateNote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    let newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    try {
        let getNote =await noteModel.findById(req.params.id);
        if (!getNote) { return res.status(404).send("Not Found") }

        if (getNote.userId.toString() !== req.user) {
            return res.status(401).send("Not Allowed")
        }

        let updateData = await noteModel.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.send({ status: 200, message: "Note has been Updated" })
    } catch (err) {
        console.error(err.message);
        res.send({ status: 500, message: "Something went Wrong !" })
    }
})

noteRoute.delete('/deleteNote/:id', fetchUser, async (req, res) => {

    try {
        let getNote =await noteModel.findById(req.params.id);
        if (!getNote) { return res.status(404).send("Not Found") }

        if (getNote.userId.toString() !== req.user) {
            return res.status(401).send("Not Allowed")
        }

        let deleteData = await noteModel.findByIdAndDelete(req.params.id)
        res.send({ status: 200, message: "Note has been Deleted" })
    } catch (err) {
        console.error(err.message);
        res.send({ status: 500, message: "Something went Wrong !" })
    }
})

module.exports = noteRoute
