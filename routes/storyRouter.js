const router=require('express').Router();
const uploadImage=require("../controller/uploadController")
const {
    getallStory,
    getSinglstory,
    createStory,
    updateStory,
    deleteStory
}=require("../controller/stories")


router.route("/").get(getallStory).post(createStory);
router.route("/:storyId").get(getSinglstory).patch(updateStory).delete(deleteStory);

router.post('/upload',uploadImage);


module.exports = router