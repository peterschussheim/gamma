import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Menu, MenuButton, MenuList, MenuLink } from '@reach/menu-button'
import Profile from '../views/Profile'
import '@reach/menu-button/styles.css'

const NavLayout = props => (
  <div className="flex-container">
    <div className="flex-item">
      <Link to="/">gamma</Link>
    </div>
    <Menu className="flex-item">
      <MenuButton id="1">
        Menu <span aria-hidden>▾</span>
      </MenuButton>
      <MenuList>
        <MenuLink
          to="/new"
          onClick={() => props.history.push('/new')}
          props={props}
        >
          New Gist
        </MenuLink>
        <MenuLink
          to="/editor"
          onClick={() => props.history.push('/editor')}
          props={props}
        >
          Editor
        </MenuLink>
      </MenuList>
    </Menu>
  </div>
)

const NavLayoutWithRouter = withRouter(NavLayout)

const Navbar = props => (
  <nav>
    <NavLayoutWithRouter {...props} />
    <Profile />
  </nav>
)

export default Navbar
