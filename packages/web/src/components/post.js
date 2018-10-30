import React from 'react'
import styled from '@emotion/styled'

const PostContainer = styled('div')({
  background: 'white',
  marginBottom: 20,
  padding: '30px 50px',
  borderRadius: '20px',
  boxShadow: 'var(--shadow)'
})

const PostTitle = styled('h2')({
  color: 'var(--green)'
})

const PostSeparator = styled('hr')({
  border: 0,
  borderRadius: 0,
  height: 5,
  width: 30,
  margin: '0 0 10px 0',
  background: 'var(--green)'
})

const Tag = styled('span')({
  background: 'var(--green)',
  color: 'white',
  padding: 5,
  marginRight: 5,
  borderRadius: 5
})

export default function Post({
  post: { title, content, tags },
  author = { username: 'unknown' }
}) {
  return (
    <PostContainer>
      <PostTitle data-testid="post-title">{title}</PostTitle>
      <h4 data-testid="post-author-username">by {author.username}</h4>
      <PostSeparator />
      <p data-testid="post-content">{content}</p>
      <div>
        {tags.map((t, i) => (
          <Tag key={t} data-testid={`post-tag-${i}`}>
            {t}
          </Tag>
        ))}
      </div>
    </PostContainer>
  )
}
