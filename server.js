const express = require('express');
const ProjectsRouter = require('./projectsRouter')
const ActionsRouter = require('./actionsRouter')

const server = express()

server.use(express.json())
server.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});
server.use('/api/projects', ProjectsRouter)
server.use('/api/actions', ActionsRouter)


server.get('/' , (req , res) => {
  res.status(200).json('hell yeah')
})


module.exports = server;