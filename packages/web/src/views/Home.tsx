import * as React from 'react'

import Counter from '../components/counter'

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
