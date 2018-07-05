import React from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
// import Profile from './Profile'

const Navbar = () => (
  <nav>
    <div>
      <div>
        <Link to="/feed">gamma</Link>
      </div>
      <ul>
        <NavbarLink title="Search" href="/search" />
        <NavbarLink title="Profile" href="/profile" />
        <NavbarLink title="Create" href="/create" />
      </ul>

      {/* <Profile /> */}
    </div>
  </nav>
)

const NavbarLink = ({ title, href, location }) => {
  const isActive = location.pathname === href

  return (
    <li className={isActive ? 'active' : ''}>
      <NavLink to={href}>
        {title}
        {isActive && <span>(current)</span>}
      </NavLink>
    </li>
  )
}

NavbarLink.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

export const NavbarLinkWithRouter = withRouter(NavbarLink)
