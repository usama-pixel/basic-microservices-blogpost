const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { randomBytes } = require('crypto')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res, next) => {
  console.log(req.params.id)
  console.log(commentsByPostId)
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res, next) => {
  const commentId = randomBytes(4).toString('hex')
  const { content } = req.body

  const comments = commentsByPostId[req.params.id] || []

  comments.push({ id: commentId, content })
  commentsByPostId[req.params.id] = comments

  res.status(201).send(comments)
})

app.listen(4001, () => {
  console.log('Listening to port 4001')
})