import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import Switch from '../Switch'

// 🦉 this function is useful for the prop getter pattern that's utilized by several
// of the renderring patterns, but isn't a useful rendering pattern by itself.
// It allows us to compose event handlers into a single function. See the usage
// below in `getTogglerProps`
const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

// 🦉 React's new Context API is AMAZING and makes a lot of this as simple as it is.
// Learn more about React.createContext:
// - official docs: https://reactjs.org/docs/context.html#reactcreatecontext
// - My blog post: https://medium.com/dailyjs/reacts-new-context-api-70c9fe01596b
// 🐻 It enables compound components to have a flexible layout
// 🦊 And it's basically an implementation of Provider pattern!
const ToggleContext = React.createContext({
  // 🦉 this is the default value in the event that someone attempts
  // to render the Consumer outside the Provider tree.
  on: false,
  toggle: () => {},
  getTogglerProps: props => props
})

class Toggle extends React.Component {
  // 🦉 rather than exposing ToggleContext directly, we'll expose the Consumer as a
  // static property on the Toggle class. This has the effect of not only making the
  // relationship between the Provider renderer (Toggle) and the Consumer component
  // more obvious, but also allows us to use Toggle.getUI which allows our consumer
  // to support than just render props. Read more below.
  // 🐻 This is what the compound components use to know the state of Toggle
  // 🦊 And it's the consumer side of the provider pattern.
  static Consumer = props => (
    <ToggleContext.Consumer {...props}>
      {state => Toggle.getUI(props.children, state)}
    </ToggleContext.Consumer>
  )
  // 🐻 The next three static properties are compound components. We put them as static
  // properties of the Toggle class to make their relationship to the Toggle class
  // explicit. They each use the Toggle.Consumer we define above.
  static On = ({ children }) => (
    <Toggle.Consumer>{({ on }) => (on ? children : null)}</Toggle.Consumer>
  )
  static Off = ({ children }) => (
    <Toggle.Consumer>{({ on }) => (on ? null : children)}</Toggle.Consumer>
  )
  static Button = props => (
    <Toggle.Consumer>
      {({ getTogglerProps }) => <Switch {...getTogglerProps(props)} />}
    </Toggle.Consumer>
  )
  // 🦉 This is a utility method used internally by both the `Consumer` and the `render`
  // methods that enables several of the patterns to be used simultaneously
  static getUI(children, state) {
    let ui
    if (Array.isArray(children) || React.isValidElement(children)) {
      // 🐻🦊🐸 if the children is normal react elements, then the developer could
      // possibly be using compound components, the provider pattern, an HOC, or
      // a combination of each of them! In this case, we'll just render the children
      // as they are. The developer will get access to the state by some other means.
      ui = children
    } else if (children.prototype && children.prototype.isReactComponent) {
      // 🦆 if the children is a React component, then the developer is using
      // the component injection API. In this case, we'll use that component
      // to create a react element with the state as props and render that for them.
      ui = React.createElement(children, state)
    } else if (typeof children === 'function') {
      // 🦁 if children is a function then they're using the render prop API so
      // we'll call their children function with the state and use what they return.
      ui = children(state)
    } else {
      // 🦉 if none of the above cases work, then they're probably doing something wrong
      // so we'll give them an error message. Fail fast etc etc.
      throw new Error('Please use one of the supported APIs for children')
    }
    return ui
  }
  // 🦉 this is a mechanism we'll expose to updating the state. In our case it's pretty
  // simple (intentionally) because we're just keeping track of the state of a single
  // boolean value.
  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    )
  // 🦉 this is a prop getter! Its job is to handle a common use case for the component.
  // It's not necessarily required by any pattern, but is useful for several of them.
  // It's useful because it allows developers to apply props to the toggle they render
  // without concerning themselves how to wire up what they render to the Toggle
  // component's state (like the toggle method). In this simple example it may be difficult
  // to see the value, but trust me, this is definitely worth its weight for more complex
  // components (see downshift's prop getters).
  getTogglerProps = ({ onClick, ...props } = {}) => ({
    onClick: callAll(onClick, this.toggle),
    'aria-pressed': this.state.on,
    ...props
  })
  // 🦊🐻 because this.state will be used in ToggleContext.Provider's `value` prop
  // (in order to support the provider pattern and compound components), we need to
  // put everything into state that consumers will need, even event handlers.
  // A common (already!?) mistake people make with Context Providers is creating a
  // new object in the render method. Doing this will force the re-render of all
  // consumers even if no changes were actually made to the state we're exposing.
  // In this simple example the Toggle's render method wont run unless state was
  // changed in a way that would necessitate a re-render of consumers anyway, so
  // quite honestly it doesn't make a difference in this simple scenario, but it's
  // better to err on the side of caution than unecessary re-renders in this case.

  // 🦉 note that if you didn't want to expose _all_ your `state`, then you could
  // place things on a state property called `context`, but then any time you update
  // that state you'd have to do some extra work... Give it a try and you'll learn
  // why it's just easier to put things directly on `state` if you can.
  // Note that you could also use shouldComponentUpdate to help avoid unecessary
  // re-renders. There's no one right way to do this.
  state = {
    on: false,
    // 🦉 important note because of JavaScript. Because we're referencing `this.toggle`
    // and `this.getTogglerProps` here, `state` must be defined _after_ those have
    // be initialized, otherwise these values would be set to `undefined` because they
    // haven't been ... eh... defined yet. :)
    toggle: this.toggle,
    getTogglerProps: this.getTogglerProps
  }
  render() {
    // 🐻 I'd like to mention here that you can implement the compound components
    // pattern in a way that's much simpler if you don't care about allowing users
    // to render elements at arbitrary depths (all compound components must be
    // rendered as direct children). If that's the case (and you don't care to support
    // other patterns), then you can do this:
    // https://github.com/kentcdodds/advanced-react-patterns-v2/blob/845ba0490a401e2cb4d2be145f2efd88f7ef9f94/src/exercises-final/02.js#L19-L24
    return (
      <ToggleContext.Provider value={this.state}>
        {Toggle.getUI(this.props.children, this.state)}
      </ToggleContext.Provider>
    )
  }
}
// 🦉 we're just making React DevTools not be terrible here.
Toggle.Consumer.displayName = 'Toggle.Consumer'
Toggle.On.displayName = 'Toggle.On'
Toggle.Off.displayName = 'Toggle.Off'
Toggle.Button.displayName = 'Toggle.Button'

// 🐸 It's my moment to shine! This is a function that returns a component. So we call it
// a Higher Order Component (HOC for short)! An HOC can accept any argument and any number
// of arguments. Often they accept a component to enhance in some way like we're doing here.
// The usefulness of this component is a bit lost in this simple example because the
// Toggle.Consumer is pretty ergonomic already, but in some situations an HOC can really
// simplify common use cases and help prevent deeply nested render prop consumers.
//
// 🦉 Felicity didn't want to mention this, but it should be noted that HOCs are strictly
// less flexible than render props because the composition model is static (you consume
// the HOC at app initialization time) rather than dynamic (you consume a render prop
// in every render phase).
function withToggle(Component) {
  function Wrapper(props, ref) {
    // 🦉 see how we can simply use the Toggle.Consumer here? Kinda neat how we can combine
    // these patterns in ways that make everything simpler!
    return (
      <Toggle.Consumer>
        {toggleState => <Component {...props} toggle={toggleState} ref={ref} />}
      </Toggle.Consumer>
    )
  }
  // 🐸 Make the React DevTools experience less bad
  Wrapper.displayName = `withToggle(${Component.displayName || Component.name})`
  // 🐸 this is here because nobody wants to pass a ref to our wrapper
  // but they might want to pass one to the underlying component and part of the job
  // of a good HOC is to make its existance unobservable.
  const WrapperWithRef = React.forwardRef(Wrapper)
  // 🐸 This is something else we do to try to make the presence of the HOC unobservable.
  // If the Component has static properties (like its own compound components for example),
  // then we want to put those on the component we're returning from our HOC so people
  // can use them as if they're using their original component's static properties.
  hoistNonReactStatics(WrapperWithRef, Component)
  return WrapperWithRef
}

// 🦉 note that we're not exposing ToggleContext. That's an implementation detail
// that nobody needs to know about.
export { Toggle, withToggle }
