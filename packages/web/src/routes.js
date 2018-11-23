import React from 'react'
import { Route, Switch } from 'react-router'
import Loadable from 'react-loadable'
import { Global, css } from '@emotion/core'
import Navbar from './components/navbar'
import Login from './components/form/login'
import Signup from './components/form/signup'
import Profile from './views/profile'
import Editor from './views/editor'
import NotFound from './views/notfound'
import ConfirmEmail from './views/confirmEmail'

const Loading = () => <div>Loading...</div>

const Home = Loadable({
  loader: () => import('./views/home'),
  loading: Loading
})

class Routes extends React.Component {
  render() {
    // const { currentUser } = this.props
    return (
      <React.Fragment>
        <Global
          styles={css`
            * {
              box-sizing: border-box;
              font-family: ;
            }
            :root {
              --green: #5edb93;
              --black: #414141;
              --shadow: 0px 8px 30px -5px rgba(79, 79, 79, 0.3);
              --shadowHover: 0px 8px 5px -5px rgba(79, 79, 79, 0.3);
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                'Segoe UI Emoji', 'Segoe UI Symbol';
              font-size: 14px;
              line-height: 1.5;
              color: #24292e;
              background-color: #fff;
            }

            a {
              color: #08c;
            }

            code {
              background: #eee;
              padding: 0.1rem;
              font-family: 'Menlo';
              font-size: 13px;
              color: #ff00aa;
            }

            #flex-container {
              display: flex;
              flex-direction: row;
            }

            #flex-container > .flex-item {
              flex: auto;
            }

            #flex-container > .raw-item {
              width: 5rem;
            }

            .text-input {
              padding: 0.5rem;
              font-size: 16px;
              width: 100%;
              display: block;
              border-radius: 0px;
              border: 1px solid #ccc;
            }

            .text-input:focus {
              border-color: #007eff;
              box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
                0 0 0 3px rgba(0, 126, 255, 0.1);
              outline: none;
            }

            .error .text-input {
              border-color: red;
            }

            .label {
              font-weight: bold;
              display: block;
              margin-bottom: 0.5rem;
            }

            .error .label {
              color: red;
            }

            .input-feedback {
              color: #999;
              margin-top: 0.25rem;
            }

            .error .input-feedback {
              color: red;
            }

            .input-group {
              margin-bottom: 1rem;
            }

            button:disabled {
              opacity: 0.5;
              cursor: not-allowed !important;
            }

            button + button {
              margin-left: 0.5rem;
            }

            button.outline {
              background-color: #eee;
              border: 1px solid #aaa;
              color: #555;
            }
          `}
        />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/signup" component={Signup} />
          <Route exact path="/success" component={Home} />
          <Route exact path="/editor" component={Editor} />
          <Route
            exact
            path="/confirm"
            component={ConfirmEmail}
            props={this.props}
          />
          {/* <Route path="/confirm/:id" component={ConfirmEmail} /> */}
          <Route path="/g/:id" component={Editor} />
          <Route path="*" component={NotFound} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default Routes
