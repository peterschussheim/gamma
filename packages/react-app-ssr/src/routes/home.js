import React from 'react'
import { Subscription } from 'react-apollo'
import gql from 'graphql-tag'

// import Post from '../components/post'

const COUNTER_SUBSCRIPTION = gql`
  subscription {
    counter {
      count
    }
  }
`
const Counter = () => (
  <Subscription subscription={COUNTER_SUBSCRIPTION}>
    {({ data, loading }) => <span>{!loading && data.counter.count}</span>}
  </Subscription>
)

function Home() {
  return (
    <React.Fragment>
      <div>HOME</div>
      <span>
        Count: <Counter />
      </span>
    </React.Fragment>
  )
}

// // function Timeline({ users = [], posts = [] }) {
// //   return (
// //     <div>
// //       {posts
// //         .sort(sortByLatest)
// //         .map(p => (
// //           <Post
// //             key={p.id}
// //             post={p}
// //             author={users.find(u => u.id === p.authorId)}
// //           />
// //         ))}
// //     </div>
// //   )
// // }

// function sortByLatest(p1, p2) {
//   return p1.date > p2.date ? -1 : 1
// }

export default Home
