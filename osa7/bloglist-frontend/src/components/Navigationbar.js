import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginreducer'

const Navigationbar = ({ padding, user }) => {

  const dispatch = useDispatch()

  const logoutHelper = (event) => {

    event.preventDefault()
    dispatch(logout())

  }

  return(
    <div>
      <Navbar variant='dark' bg='dark'>
        <Navbar.Brand href="/">
                    Fullstack-bloglist
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className='mr-auto'>
            <Nav.Link href="#" as="span">
              <Link style={{ padding:padding }} to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={{ padding:padding }} to="/users">Users</Link>
            </Nav.Link>
            <Navbar.Text style={{ paddingRight:10, paddingLeft:30 }}>
                   User {user.name} logged in
            </Navbar.Text>
            <Button variant="danger" onClick={logoutHelper} float="right">Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>

  )

}

export default Navigationbar