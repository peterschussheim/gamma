import React from 'react'

import { Toggle } from './index'
import Switch from '../Switch'

function CompoundComponents(props) {
  return (
    <Toggle {...props}>
      <Toggle.On>On</Toggle.On>
      <Toggle.Off>Off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  )
}

function RenderProps(props) {
  return (
    <Toggle {...props}>
      {({ on, getTogglerProps }) => (
        <div>
          {on ? 'On' : 'Off'}
          <Switch {...getTogglerProps()} />
        </div>
      )}
    </Toggle>
  )
}

class ToggleConsumerUsage extends React.Component {
  render() {
    const { on, getTogglerProps } = this.props
    return (
      <div>
        {on ? 'On' : 'Off'}
        <Switch {...getTogglerProps()} />
      </div>
    )
  }
}

function ComponentInjection(props) {
  return <Toggle {...props}>{ToggleConsumerUsage}</Toggle>
}

function ToggleProvider(props) {
  return (
    <Toggle {...props}>
      <div />
      <Toggle.Consumer>
        {({ on, toggle, getTogglerProps }) => (
          <div>
            {on ? 'On' : 'Off'}
            <Switch {...getTogglerProps()} />
          </div>
        )}
      </Toggle.Consumer>
    </Toggle>
  )
}

const Title = props => <strong style={{ display: 'block' }} {...props} />

function ToggleUsage({
  onToggle = (...args) => console.log('onToggle', ...args)
}) {
  return (
    <div>
      <h1>Toggle, 4 ways</h1>
      <Title>Compound Components</Title>
      <CompoundComponents onToggle={onToggle} />
      <hr />
      <Title>Render Props</Title>
      <RenderProps onToggle={onToggle} />
      <hr />
      <Title>Component Injection</Title>
      <ComponentInjection onToggle={onToggle} />
      <hr />
      <Title>Provider Pattern</Title>
      <ToggleProvider onToggle={onToggle} />
      <hr />
    </div>
  )
}

export default ToggleUsage
