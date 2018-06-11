import React from 'react'
import Button from './Button'
import LikeButton from './LikeButton'
import StyleGuideLayout from './StyleGuideLayout'

var state = {
  isLoading: false
}

export default () => (
  <StyleGuideLayout
    label="Button"
    component={
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Button text="Button" />
        <Button disabled text="Disabled Button" />
        <Button
          text="handleClick"
          handleClick={() => console.log('clicked!')}
        />
        <LikeButton />
        <Button
          handleClick={this.handleClick}
          text={state.isLoading ? 'Loading...' : 'Click me!'}
          disabled={state.isLoading ? true : false}
        />
      </div>
    }
  />
)
