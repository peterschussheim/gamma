import React from 'react'
import { Link } from 'react-router-dom'
import NavbarLink from './navbarlink'
import Profile from '../views/profile'

const Navbar = () => (
  <nav>
    <div>
      <div>
        <Link to="/">gamma</Link>
      </div>
      <ul>
        <NavbarLink title="Search" href="/search" />
        <NavbarLink title="Profile" href="/profile" />
        <NavbarLink title="Create" href="/create" />
      </ul>

      <Profile />
    </div>
  </nav>
)

export default Navbar
