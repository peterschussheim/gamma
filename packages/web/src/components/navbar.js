import React from 'react'
import { Link } from 'react-router-dom'
import NavbarLink from './navbarlink'
import Profile from '../views/profile'
import Card from '../components/card'

const NavLayout = props => (
  <div id="flex-container">
    <div className="flex-item" id="flex">
      <Link to="/">gamma</Link>
    </div>
    <Card className="flex-item" id="flex">
      {/* <NavbarLink title="Search" href="/search" props={props} />
      <NavbarLink title="Profile" href="/profile" props={props} /> */}
      <NavbarLink title="Editor" href="/editor" props={props} />
    </Card>
  </div>
)

const Navbar = () => (
  <nav>
    <NavLayout>{'  |  '}</NavLayout>
    <Profile />
  </nav>
)

export default Navbar
