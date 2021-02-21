const express = require("express")
const axios = require("axios")
const { authorize } = require("../auth/middlewares")

const albumsRouter = express.Router()

const config = {
  method: "GET",
  headers: {
    "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
    "x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
  },
}

albumsRouter.get("/:id", authorize, async (req, res, next) => {
  try {
    let response = await axios.get(
      "https://deezerdevs-deezer.p.rapidapi.com/album/" + req.params.id,
      config
    )
    console.log(response.data)
    res.send(response.data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = albumsRouter
