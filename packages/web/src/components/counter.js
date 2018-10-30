import React from 'react'
import { Subscription } from 'react-apollo'
import { COUNTER_SUBSCRIPTION } from '../queries'

export default () => (
  <Subscription subscription={COUNTER_SUBSCRIPTION}>
    {({ data, loading }) => (
      <span data-cy="counter-sub">{!loading && data.counter.count}</span>
    )}
  </Subscription>
)
