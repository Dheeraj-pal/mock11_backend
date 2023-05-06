const express = require("express");
const { NoticeModel } = require("../model/notice.model");
const noticeRouter = express.Router();

noticeRouter.get("/", async (req, res) => {
  try {
    const notice = await NoticeModel.find();
    res.send(notice);
  } catch (error) {
    console.log("Error while getting all the notices", error);
    res.send("Error while getting all the notices");
  }
});

noticeRouter.post("/", async (req, res) => {
  const { name, title, description } = req.body;

  try {
    const newNotice = new NoticeModel({ name, title, description });
    await newNotice.save();
    res.send({ msg: "Notice created successfully", newNotice });
  } catch (error) {
    console.log("Error while creating new notice", error);
    res.send("Error while creating new notice");
  }
});

noticeRouter.delete("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const notice = await NoticeModel.findByIdAndDelete(ID);
    res.send("Notice deleted successfully");
  } catch (error) {
    console.log("Error while deleting Notice", error);
    res.send("Error while deleting Notice");
  }
});

noticeRouter.put("/:id", async(req,res)=>{
    const ID = req.params.id;
    const payload = req.body;
    try {
      const notice = await NoticeModel.findByIdAndUpdate(ID, payload);
      res.send("Notice updated successfully");
    } catch (error) {
      console.log("Error while updating Notice", error);
      res.send("Error while updating Notice");
    }
})

module.exports = {
  noticeRouter,
};
