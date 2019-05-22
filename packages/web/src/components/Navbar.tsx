// tslint:disable:jsx-boolean-value
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { css } from 'emotion'
import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Menu, MenuButton, MenuList, MenuLink } from '@reach/menu-button'
import Profile from '../views/Profile'
import '@reach/menu-button/styles.css'

const NavLayout = props => (
  <div
    className={css({
      display: 'flex',
      flexDirection: 'row',
      padding: '5px 5px 0px 5px'
    })}
  >
    <Link to="/">gamma</Link>
    <div className={css({ flexGrow: 1 })} />
    <Menu>
      <MenuButton
        className={css({
          color: '#89A5DB',
          border: 'thin solid white',
          backgroundColor: '#0E2840'
        })}
        id="1"
      >
        Menu <span aria-hidden>▾</span>
      </MenuButton>
      <MenuList
        className={css({
          border: 'thin solid white',
          backgroundColor: '#0E2840'
        })}
      >
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
