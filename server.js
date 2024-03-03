import express from 'express'

const app = express()
app.get('/', (req, res) => {
    console.log("this is server")
})
app.listen(5100, () => {
   console.log('server is running.....')
})