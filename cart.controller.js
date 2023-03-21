const db = require("../models");
const Video = db.videos;
const Op = db.Sequelize.Op;

const addVideo = async (req, res) =>{

  let data = {
    title: req.body.title,
    discription: req.body.discription
  }
  const video = Video.create(data)
  req.status(200).send(video)
}

const getAllVideos = async (req, res) =>{

  const video = await Video.findAll({})
  req.status(200).send(video)
}

module.exports = {
  addVideo,
  getAllVideos
}