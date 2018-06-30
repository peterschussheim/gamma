import React from 'react'
import FaAutomobile from 'react-icons/lib/fa/automobile'
import FaBed from 'react-icons/lib/fa/bed'
import FaPlane from 'react-icons/lib/fa/plane'
import FaSpaceShuttle from 'react-icons/lib/fa/space-shuttle'

class Tabs extends React.Component {
  state = {
    activeIndex: this.props.defaultActiveIndex || 0
  }

  isControlled() {
    return this.props.activeIndex != null
  }

  selectTabIndex = activeIndex => {
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
        onSelectTab: this.selectTabIndex
      })
    })
    return <div className="Tabs">{children}</div>
  }
}

class TabList extends React.Component {
  render() {
    const { activeIndex } = this.props
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === activeIndex,
        onSelect: () => this.props.onSelectTab(index)
      })
    })
    return <div className="tabs">{children}</div>
  }
}

class Tab extends React.Component {
  render() {
    const { isActive, isDisabled, onSelect } = this.props
    return (
      <div
        className={
          isDisabled ? 'tab disabled' : isActive ? 'tab active' : 'tab'
        }
        onClick={isDisabled ? null : onSelect}
      >
        {this.props.children}
      </div>
    )
  }
}

class TabPanels extends React.Component {
  render() {
    const { activeIndex, children } = this.props
    return <div className="panels">{children[activeIndex]}</div>
  }
}

class TabPanel extends React.Component {
  render() {
    return this.props.children
  }
}

const COLORS = ['red', 'blue', 'green', 'yellow']

class TabsExample extends React.Component {
  state = {
    currentTab: 0
  }

  render() {
    const { currentTab } = this.state
    const color = COLORS[currentTab]
    return (
      <div className={`Tab-Usage ${color}-bg`}>
        <Tabs
          activeIndex={this.state.currentTab}
          onChange={index => {
            this.setState({ currentTab: index })
          }}
        >
          <TabList>
            <Tab>
              <FaAutomobile
                className={currentTab === 0 ? COLORS[currentTab] : ''}
              />
            </Tab>
            <Tab>
              <FaBed className={currentTab === 1 ? COLORS[currentTab] : ''} />
            </Tab>
            <Tab>
              <FaPlane className={currentTab === 2 ? COLORS[currentTab] : ''} />
            </Tab>
            <Tab>
              <FaSpaceShuttle
                className={currentTab === 3 ? COLORS[currentTab] : ''}
              />
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{cars}</TabPanel>
            <TabPanel>{hotels}</TabPanel>
            <TabPanel>{flights}</TabPanel>
            <TabPanel>{space}</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    )
  }
}

const cars = (
  <div>
    <h2>Car rentals</h2>
    <p>We offer the finest selection of cars:</p>
    <ul>
      <li>Sedans</li>
      <li>Donks</li>
      <li>Hoopdies</li>
      <li>Ghetto Sleds</li>
      <li>Trucks</li>
      <li>Wild Wheels</li>
    </ul>
  </div>
)

const hotels = (
  <div>
    <h2>Hotels</h2>
    <p>
      The best hotels at the best price. Whether you're looking for a romantic
      get-away or just need a place to crash that offers free breakfast and a
      hot tub, we have the best hotels around.
    </p>
  </div>
)

const flights = (
  <div>
    <h2>Flights</h2>
    <p>
      Cheap fare and great flights. We have the most non-stop from major cities
      across the world than anybody else.
    </p>
  </div>
)

const space = (
  <div>
    <h2>Space</h2>
    <p>
      Sometimes when I watch shows like Passengers, and they're experiencing
      intergallactic travel, slingshotting around a star and gazing at it out
      the window, or standing outside the ship staring into the universe, I get
      actually angry that I won't experience it. Time to find a religion that
      believes we can create worlds and travel from one to the other.
    </p>
  </div>
)

export default TabsExample
