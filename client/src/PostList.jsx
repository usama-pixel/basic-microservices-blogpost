import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'


const PostList = () => {
  const [posts, setPosts] = useState({})
  useEffect(() => {
    const fetchPosts = async() => {
      const res = await axios.get('http://localhost:4000/posts')
      setPosts(res.data)
    }
    fetchPosts()
  },[])

  // object.value gives us an array of all values inside the given object
  const renderedPosts = Object.values(posts).map(post => {
    return (
      <div
        className='card'
        style={{width: '30%', marginBottom: '20px'}}
        key={post.id}
        >
          <div className='card-body'>
            <h3>{post.title}</h3>
          </div>
          <CommentList postId={post.id} />
          <CommentCreate postId={post.id} />
      </div>
    )
  })

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>{renderedPosts}</div>
  )
}

export default PostList