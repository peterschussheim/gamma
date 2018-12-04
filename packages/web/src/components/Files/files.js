import React from 'react'

import { FileListContainer } from '../ListItems/elements'

export class Files extends React.Component {
  state = {
    activeIndex: this.props.defaultActiveIndex || 0
  }

  isControlled() {
    return this.props.activeIndex != null
  }

  selectFileIndex = activeIndex => {
    this.props.onChange(activeIndex)
    if (!this.isControlled()) {
      this.setState({ activeIndex })
    }
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        activeIndex: this.isControlled()
          ? this.props.activeIndex
          : this.state.activeIndex,
        onSelectFile: this.selectFileIndex
      })
    })
    return <div className="Files">{children}</div>
  }
}

export class FileList extends React.Component {
  render() {
    const { activeIndex } = this.props
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === activeIndex,
        onSelect: () => this.props.onSelectFile(index)
      })
    })
    return <FileListContainer>{children}</FileListContainer>
  }
}

export class File extends React.Component {
  render() {
    const { isActive, isDisabled, onSelect } = this.props
    return (
      <div
        className={
          isDisabled ? 'file disabled' : isActive ? 'file active' : 'file'
        }
        onClick={isDisabled ? null : onSelect}
      >
        {this.props.children}
      </div>
    )
  }
}

export class FilePanels extends React.Component {
  render() {
    const { activeIndex, children } = this.props
    return <div className="panels">{children[activeIndex]}</div>
  }
}

export class FilePanel extends React.Component {
  render() {
    return this.props.children
  }
}
