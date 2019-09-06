const server = require('./server')


const port = 7000;

server.listen(port , () => {
    console.log(`api is running on port ${port}`)
})