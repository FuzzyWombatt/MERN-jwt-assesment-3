const express = require('express')
const { check: check, validationResult: validationResult} = require('express-validator')

const Bug = require("../models/Bug.js");
const User = require('../models/User.js')
const auth = require ("../middleware/auth.js");

const bugsRouter = express.Router();

//@route    GET api/bugs
//@desc     Get all user's bugs
//@access   Private
bugsRouter.get("/", auth, async (req, res) => {
  try {
    const { title } = req.query;

    let bugs = null;

    if (Object.keys(req.query).length === 0) {
        //starts with the last item added first
        bugs = await Bug.find({ user: req.user.id }).sort({ date: -1 }).limit(32);
    } else {
        bugs = await Bug.find({ user: req.user.id, title: title });
    }

    res.json(bugs);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

//@route    POST api/bugs
//@desc     Add new Bug
//@access   private
bugsRouter.post(
  "/",
  [auth, [check("title", "Title is required").not().isEmpty(), check("description", "Description is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {title, description} = req.body;

    try {
        let asignee = await User.findById(req.user.id);

        const newBug = new Bug({
            title,
            description,
            asignee: asignee.name,
            user: req.user.id
        })

        const bug = await newBug.save();
        res.json(bug)
    } catch (err) {
        console.error(err);
        res.status(500).send("server error");
    }
  }
);

//@route    PUT api/bugs/:id
//@desc     Update Bug
//@access   private
bugsRouter.put("/:id",auth,async (req, res) => {
const {title, description} = req.body;

  const bugFields = {};
  if(title)  bugFields.title = title;
  if(description) bugFields.description = description;

  try {
      let bug = await Bug.findById(req.params.id)

      if(!bug) return res.status(404).json({msg: 'Contact not found'});

      if(bug.user.toString() !== req.user.id){
          return res.status(401).json({msg: 'not authorized'})
      }

      bug = await Bug.findByIdAndUpdate(req.params.id, 
        {$set: bugFields},
        {new: true})

        res.json(bug)
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

//@route    DELETE api/bugs/:id
//@desc     Delete Bug
//@access   private
bugsRouter.delete("/:id",auth, async (req, res) => {
    try {
        let bug = await Bug.findById(req.params.id)
  
        if(!bug) return res.status(404).json({msg: 'Bug not found'});
  
        if(bug.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'not authorized'})
        }
  
        bug = await Bug.findByIdAndRemove(req.params.id)
  
        res.json({msg: 'bug removed'})
    } catch (err) {
      console.error(err);
      res.status(500).send("server error");
    }
});

//@route    Get api/bugs/:id
//@desc     get ONE bug by _id
//@access   private
bugsRouter.get("/:id",auth, async (req, res) => {
  try {
    const { id } = req.params;

    const bug = await Bug.findById(id);

    if (!bug) return res.status(404).json({ msg: "bug not found" });

    res.status(200).json({ bug });
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

module.exports = bugsRouter;
