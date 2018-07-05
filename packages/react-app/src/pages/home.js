import React from 'react'

import Post from '../components/post'

function Home() {
  return <div>HOME</div>
}

function Timeline({ users = [], posts = [] }) {
  return (
    <div>
      {posts
        .sort(sortByLatest)
        .map(p => (
          <Post
            key={p.id}
            post={p}
            author={users.find(u => u.id === p.authorId)}
          />
        ))}
    </div>
  )
}

function sortByLatest(p1, p2) {
  return p1.date > p2.date ? -1 : 1
}

export default Home
