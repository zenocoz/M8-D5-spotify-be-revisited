//imports
const express = require("express")
const mongoose = require("mongoose")
const {
  notFoundHandler,
  forbiddenHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandlers")

const listEndpoints = require("express-list-endpoints")
//instances
const server = express()

server.use(express.json())

//routes
const albumsRouter = require("./services/albums")
const usersRouter = require("./services/users")

server.use("/albums", albumsRouter)
server.use("/users", usersRouter)

//errors middleware

server.use(badRequestHandler)
server.use(forbiddenHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

console.log(listEndpoints(server))

const port = process.env.PORT || 3005

mongoose
  .connect(process.env.MONGO_COMPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("server listening on port", port)
    })
  )
  .catch((error) => console.log(error))
