import React from 'react'

// need to implement proper logic for fade-in and fade-out
// INCOMPLETE!
export default class FadeIn extends React.Component {
  static defaultProps = { className: '' }
  state = { mounted: false }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ mounted: true })
    }, 2000)
  }

  handleReset = () => {
    this.setState({ mounted: false })
  }

  render() {
    const className = this.props.children.props.className || ''
    return React.cloneElement(this.props.children, {
      className: className + (this.state.mounted ? '' : 'fade-in'),
      onReset: this.handleReset
    })
  }
}
