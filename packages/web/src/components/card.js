import React from 'react'

export default class Card extends React.Component {
  state = {
    showMenu: false
  }

  showMenu = event => {
    event.preventDefault()

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu)
    })
  }

  closeMenu = event => {
    event.preventDefault()
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu)
      })
    }
  }

  render() {
    const { children } = this.props
    return (
      <React.Fragment>
        {!this.state.showMenu ? (
          <button onClick={this.showMenu}>Menu</button>
        ) : (
          <span style={{ fontSize: '30px' }}> ✕ </span>
        )}

        {this.state.showMenu ? (
          <div
            className="menu"
            ref={element => {
              this.dropdownMenu = element
            }}
          >
            {children}
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}
