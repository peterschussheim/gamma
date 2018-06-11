import React from 'react'

import Layout from './Layout'

export function Loading() {
  return (
    <div className="bouncing-loader">
      <div />
      <div />
      <div />
    </div>
  )
}

export function fakeRequest(ms) {
  console.log('Fake request started')
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log('Fake request succeeded'))
    }, ms)
  })
}

export function Donut() {
  return <div className="donut" />
}

export function Link() {
  return (
    <p className="hover-underline-animation">
      Hover this text to see the effect!
    </p>
  )
}

export function Grid({ name }) {
  return <Layout>{name}</Layout>
}

export function Text({ className = '', content, ...props }) {
  return (
    <p className={className} {...props}>
      {content}
    </p>
  )
}

export function Typography() {
  return (
    <div>
      <h1 className="f1">f1</h1>
      <h1 className="f2">f2</h1>
      <h1 className="f3">f3</h1>
      <h1 className="f4">f4</h1>
      <h1 className="f5">f5</h1>
      <h1 className="f6">f6</h1>
    </div>
  )
}

export function ResponsiveTypography() {
  return (
    <div>
      <h1 className="f1">casus belli</h1>
      <h1 className="f2-ns">f2-ns</h1>
      <h1 className="f3">casus belli</h1>
      <h1 className="f4">f4</h1>
      <h1 className="f5">casus belli</h1>
      <h1 className="f6">f6</h1>
    </div>
  )
}

export function Input({ id, type, ...props }) {
  return <input type={type} id={id} {...props} />
}

export function InputExamples() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <label htmlFor="uncontrolled">Uncontrolled: </label>
        <Input
          id="uncontrolled"
          placeholder="uncontrolled input example"
          style={{ maxWidth: 'fit-content' }}
        />
      </div>
      <br />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <label htmlFor="checkbox">Uncontrolled checkbox: </label>
        <Input id="checkbox" type="checkbox" />
      </div>
      <br />
      <label>
        Option 1: <Input type="radio" />
      </label>
      <br />
      <label>
        Option 1: <Input type="radio" />
        {' | '}
        Option 2: <Input type="radio" />
        {' | '}
        Option 3: <Input type="radio" />
      </label>
    </div>
  )
}
