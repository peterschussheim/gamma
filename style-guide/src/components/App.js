import React from 'react'
import { hot } from 'react-hot-loader'
import StyleGuideLayout from './StyleGuideLayout'
import Button from './Button'
import LikeButton from './LikeButton'
import FadeIn from './FadeIn'
import TabsExample from './Tabs'
import { ToggleUsage } from './Toggle'
import { ReflexAdvancedDemo } from './SplitPane/usage'

import {
  Loading,
  fakeRequest,
  Donut,
  Link,
  Grid,
  InputExamples,
  Text,
  Typography,
  ResponsiveTypography
} from './usage'

import '../style.css'

class App extends React.Component {
  state = {
    name: 'React',
    isLoading: false
  }

  handleClick = () => {
    this.setState({ isLoading: !this.state.isLoading }, () => {
      fakeRequest(2500).then(() => {
        this.setState({ isLoading: !this.state.isLoading })
      })
    })
  }

  render() {
    const { isLoading } = this.state
    return (
      <div>
        <StyleGuideLayout
          label="SplitPane"
          component={<ReflexAdvancedDemo />}
        />
        <StyleGuideLayout label="Loading Balls" component={<Loading />} />
        <StyleGuideLayout label="Donut" component={<Donut />} />
        <StyleGuideLayout label="Link" component={<Link />} />
        <StyleGuideLayout label="Tabs" component={<TabsExample />} />
        <StyleGuideLayout label="Input" component={<InputExamples />} />
        <StyleGuideLayout label="Typography" component={<Typography />} />
        <StyleGuideLayout label="Grid" component={<Grid name="test" />} />
        <StyleGuideLayout label="Toggle" component={<ToggleUsage />} />
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
                text={isLoading ? 'Loading...' : 'Click me!'}
                disabled={isLoading ? true : false}
              />
            </div>
          }
        />
        <StyleGuideLayout
          label="Responsive Typography"
          component={<ResponsiveTypography />}
        />
        <StyleGuideLayout
          label="FadeIn"
          component={
            <FadeIn>
              <Text className="fade-demo" content="HI">
                <button
                  className="fade-demo"
                  type="button"
                  onClick={this.props.handleReset}
                >
                  Reset
                </button>
              </Text>
            </FadeIn>
          }
        />
        <StyleGuideLayout
          label="Truncated Text"
          component={
            <Text
              className="truncate-text"
              content="If I exceed this line's width of 200 pixels, I will be truncated."
            />
          }
        />
      </div>
    )
  }
}
export default hot(module)(App)
