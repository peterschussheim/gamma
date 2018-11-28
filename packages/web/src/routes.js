import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Global, css } from '@emotion/core'
import { Query } from 'react-apollo'

import { GET_GIST_BY_ID } from './queries'

import { BlueButton, UserBtnsContainer } from './components/buttons'
import globalStyles from './components/global'
import Navbar from './components/navbar'
import Login from './components/form/login'
import Signup from './components/form/signup'
import Skeleton from './components/editor/skeleton'
import Footer from './components/editor/footer'
import { FileList } from './components/editor/sidebar'
import CodeEditor from './components/editor'
import Icon from './components/icon'
import Delete from './components/delete'

import Profile from './views/profile'
import Editor from './views/editor'
import NewGist from './views/new'
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
        <Global styles={globalStyles} />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/signup" component={Signup} />
          <Route exact path="/success" component={Home} />
          <Route exact path="/new" component={NewGist} />
          <Route exact path="/editor" component={Editor} />
          <Route
            exact
            path="/confirm"
            component={ConfirmEmail}
            props={this.props}
          />
          <Route path="/confirm/:id" component={ConfirmEmail} />
          <Route
            path="/g/:gistId"
            render={({ history, match }) => (
              <React.Fragment>
                <h1>Viewing Gist: {match.params.gistId}</h1>
                <UserBtnsContainer>
                  <BlueButton onClick={() => history.push('/editor')}>
                    Back
                  </BlueButton>
                  <Delete gistId={match.params.gistId} history={history} />
                </UserBtnsContainer>
                <Query
                  query={GET_GIST_BY_ID}
                  variables={{ gistId: match.params.gistId }}
                >
                  {({ loading, error, data }) => {
                    if (loading) {
                      return null
                    } else if (error) {
                      return `Error!: ${error}`
                    } else
                      return (
                        <React.Fragment>
                          <Skeleton
                            sidebar={
                              <FileList
                                gist={data.getGistById}
                                handleLoadSelectedFile={event => {
                                  console.log(event.target)
                                }}
                                {...this.props}
                              />
                            }
                          >
                            <CodeEditor
                              value={data.getGistById.files[0].content}
                              language={data.getGistById.files[0].language}
                              theme="vs-dark"
                            />
                          </Skeleton>
                          <Footer
                            currentFile={data.getGistById.files[0].filename}
                            iconComponent={
                              <Icon
                                height={17}
                                name={data.getGistById.files[0].filename}
                              />
                            }
                          />
                        </React.Fragment>
                      )
                  }}
                </Query>
              </React.Fragment>
            )}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default Routes
