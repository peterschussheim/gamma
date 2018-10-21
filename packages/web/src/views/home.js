import React from 'react'
import { Subscription } from 'react-apollo'
import gql from 'graphql-tag'

const COUNTER_SUBSCRIPTION = gql`
  subscription {
    counter {
      count
    }
  }
`
const Counter = () => (
  <Subscription subscription={COUNTER_SUBSCRIPTION}>
    {({ data, loading }) => (
      <span data-cy="counter-sub">{!loading && data.counter.count}</span>
    )}
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

export default Home
