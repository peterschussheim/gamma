import React from 'react'
import styled from 'react-emotion'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Loading from './../components/loading'

// temporary query tied to airbnb data model.
// remove once transition to 'today I learned' is complete.
const FEATURED_DESTINATIONS = gql`
  {
    featuredDestinations {
      name
      city {
        name
      }
      featured
      slug
    }
  }
`
function Home() {
  return (
    <div>
      <Query query={FEATURED_DESTINATIONS}>
        {({ loading, error, data }) =>
          loading ? (
            <Loading />
          ) : error ? (
            'error'
          ) : data ? (
            <div>
              HI!!!!! HOME!
              {/* <Timeline featuredDestinations={data.featuredDestinations} /> */}
            </div>
          ) : null
        }
      </Query>
    </div>
  )
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

function Post({
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

export default Home
