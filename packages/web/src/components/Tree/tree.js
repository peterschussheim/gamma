import React from 'react'
import PropTypes from 'prop-types'

import TreeNode from './tree_node'

export default class Tree extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired
  }

  state = {
    nodes: [{ 'data.js': 'test.dglkjfds' }]
  }

  getRootNodes = () => {
    const { nodes } = this.state
    return nodes.filter(node => node.isRoot === true)
  }

  getChildNodes = node => {
    const { nodes } = this.state
    if (!node.children) return []
    return node.children.map(path => nodes[path])
  }

  onToggle = node => {
    const { nodes } = this.state
    nodes[node.path].isOpen = !node.isOpen
    this.setState({ nodes })
  }

  onNodeSelect = node => {
    const { onSelect } = this.props
    onSelect(node)
  }

  render() {
    const rootNodes = this.getRootNodes()
    return (
      <div>
        {rootNodes.map(node => (
          <TreeNode
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
          />
        ))}
      </div>
    )
  }
}
