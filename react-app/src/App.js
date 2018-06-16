import React from 'react'
import ErrorBoundary from 'react-error-boundary'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import styled from 'react-emotion'

import User from './components/user'
import Login from './components/login'
import Loading from './components/loading'
import Home from './pages/home'
import Editor from './pages/editor'
import githubLogo from './assets/github.svg'

const Header = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '20px 0px'
})

const TitleContainer = styled('div')({
  display: 'flex',
  '@media only screen and (max-width: 819px)': {
    order: 0,
    width: '100%'
  },
  '& > div': {
    borderRadius: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: 'white',
    textAlign: 'center',
    padding: '30px 50px',
    boxShadow: 'var(--shadow)'
  }
})

const Title = styled('h1')({
  color: 'var(--green)',
  fontSize: 50,
  lineHeight: '40px',
  textTransform: 'upperase'
})

const SecondaryTitle = styled('span')({
  color: 'var(--black)'
})

const SocialLogo = styled('img')({
  width: 55,
  background: 'white',
  boxShadow: 'var(--shadow)',
  borderRadius: 0,
  padding: 15,
  marginRight: 15,
  cursor: 'pointer',
  transition: '0.5s',
  ':hover': {
    boxShadow: 'var(--shadowHover)'
  }
})

const UserBtnsContainer = styled('div')({
  width: '25%',
  display: 'flex',
  justifyContent: 'center',
  '@media only screen and (max-width: 819px)': {
    order: 1,
    marginTop: 10,
    flex: 1
  }
})

const UserBtn = styled('span')({
  background: 'white',
  boxShadow: 'var(--shadow)',
  borderRadius: 15,
  padding: 15,
  marginLeft: 15,
  cursor: 'pointer',
  transition: '0.5s',
  ':hover': {
    boxShadow: 'var(--shadowHover)'
  }
})

const NewPostBtn = styled('span')({
  background: 'var(--green)',
  boxShadow: 'var(--shadow)',
  color: 'white',
  fontSize: 40,
  borderRadius: 15,
  padding: 15,
  lineHeight: 0.5,
  transition: '0.5s',
  cursor: 'pointer',
  position: 'fixed',
  bottom: 10,
  right: 10,
  ':hover': {
    boxShadow: 'var(--shadowHover)'
  }
})

const SocialButton = styled('a')({
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none'
})

const SocialMedia = () => (
  <UserBtnsContainer>
    <SocialButton href="https://github.com/peterschussheim">
      <SocialLogo src={githubLogo} />
    </SocialButton>
  </UserBtnsContainer>
)

function App() {
  return (
    <ErrorBoundary>
      <User>
        {({ user, error, loading, login, logout, register }) =>
          loading ? (
            <Loading />
          ) : (
            <Router>
              <div>
                {error ? (
                  <pre>{JSON.stringify(error.response, null, 2)}</pre>
                ) : null}
                <Header>
                  <SocialMedia />
                  <TitleContainer>
                    <div>
                      <Title>
                        <Link to="/">
                          Today<br />
                          <SecondaryTitle>I Learned</SecondaryTitle>
                        </Link>
                      </Title>
                    </div>
                  </TitleContainer>
                  <UserBtnsContainer>
                    {user ? (
                      <div>
                        <UserBtn data-testid="email-display">
                          {user.email.split('@')[0]}
                        </UserBtn>
                        <UserBtn onClick={logout}>Logout</UserBtn>
                        <NewPostBtn>
                          <Link to="/editor">
                            <span>+</span>
                          </Link>
                        </NewPostBtn>
                      </div>
                    ) : (
                      <div>
                        <Link to="/login">
                          <UserBtn>Login</UserBtn>
                        </Link>
                        <Link to="/register">
                          <UserBtn>Register</UserBtn>
                        </Link>
                      </div>
                    )}
                  </UserBtnsContainer>
                </Header>
                <Route exact path="/" component={Home} />

                {user ? (
                  <Route
                    path="/editor/:postId?"
                    render={props => <Editor user={user} {...props} />}
                  />
                ) : null}
                <React.Fragment>
                  <Route
                    path="/login"
                    render={() =>
                      user ? <Redirect to="/" /> : <Login onSubmit={login} />
                    }
                  />
                  <Route
                    path="/register"
                    render={() =>
                      user ? <Redirect to="/" /> : <Login onSubmit={register} />
                    }
                  />
                </React.Fragment>
              </div>
            </Router>
          )
        }
      </User>
    </ErrorBoundary>
  )
}

export default App
