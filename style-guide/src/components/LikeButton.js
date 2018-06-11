import React from 'react'
import Button from './Button'

export default class LikeButton extends React.Component {
  static defaultProps = {
    defaultLikeCount: 0,
    onLike: () => {},
    onReset: () => {}
  }
  initialState = { likeCount: this.props.defaultLikeCount }
  state = this.initialState

  handleLike = () => {
    this.setState(previousState => ({
      likeCount: previousState.likeCount + 1
    }))
  }

  handleReset = () => {
    if (this.isLikeButtonControlled()) {
      console.log('component is controlled')
    } else {
      this.setState(this.initialState, () =>
        // this.props.onReset(this.state.likeCount)
        console.log('reset')
      )
    }
  }

  isLikeButtonControlled() {
    return this.props.likeCount !== undefined
  }

  // getLikeButtonProps = (({ onClick, ...props } = {}),
  // () => ({
  //   onClick: compose(onClick, this.handleLike),
  //   ...props
  // }))
  render() {
    const { likeCount } = this.state
    return (
      <div>
        <Button
          type="button"
          text={
            likeCount >= 1 && likeCount
              ? `${likeCount}  👏`
              : likeCount === 0 && <b> Be the first to like! </b>
          }
          handleClick={this.handleLike}
        />{' '}
        {likeCount >= 1 ? (
          <Button type="button" text={'Reset'} handleReset={this.handleReset} />
        ) : null}
      </div>
    )
  }
}
