const Story = require("../models/story");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const getallStory = async (req, res) => {
  try {
    const story = await Story.find({ createdBy: req.user.userId });
    res.status(200).json({ noOfstories: story.length, story });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const getSinglstory = async (req, res) => {
  const { storyId } = req.params;
  try {
    const story = await Story.findOne({
      createdBy: req.user.userId,
      _id: storyId,
    });
    if (!story) {
      return res
        .status(404)
        .json({
          success: false,
          message: `story with the ${storyId} was not found`,
        });
    }
    res.status(201).json({ success: true, story });
  } catch (error) {
    console.log(error);
  }
};

const createStory = async (req, res) => {
  const { title, tags, paragraph } = req.body;
  req.body.createdBy = req.user.userId;
  if(!title||!tags||!paragraph){
    return res.status(400).json({success:false,message:"please provide neccesary information"})
  }
  try {
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      use_filename: true,
      folder: "storyImages"
    })
    fs.unlinkSync(req.files.image.tempFilePath)
    req.body.image = result.secure_url
    const story = await Story.create(req.body );
    res.status(201).json({ success: true, story });
  } catch (error) {
    console.log(error);
    res.json({ error})
  }
};

const updateStory = async (req, res) => {
  const { storyId } = req.params;
  const { title, tags, paragraph } = req.body;
  if(!title||!tags||!paragraph){
    return res.status(400).json({success:false,message:"please provide neccesary information"})
  }
  try {
    const story = await Story.findOneAndUpdate(
      { createdBy: req.user.userId, _id: storyId },
      req.body,
      { new: true, runValidators: true }
    );
    res
      .status(200)
      .json({ success: true, message: "story has been updated", story });
  } catch (error) {
    console.log(error);
  }
};

const deleteStory = async (req, res) => {
  const { storyId } = req.params;
  try {
    const story = await Story.findByIdAndDelete({
      createdBy: req.user.userId,
      _id: storyId,
    });
    if (!story) {
      return res
        .status(401)
        .json({
          success: false,
          message: " sorry story not found so cant be deleated",
        });
    }
    res.status(201).json({ message: "story deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getallStory,
  getSinglstory,
  createStory,
  updateStory,
  deleteStory,
};
