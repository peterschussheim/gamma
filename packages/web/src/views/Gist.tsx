import * as React from 'react'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'

import { BlueButton, UserBtnsContainer } from '../components/Buttons'
import Skeleton from '../components/Skeleton'
import Footer from '../components/Footer'
import GistFilesList from '../components/SidebarList/GistFilesList'
import Icon from '../components/icon'
import { Debugger } from '../components/Debugger'
import Delete from '../components/Delete'
import GistEditor from '../components/EnhancedEditors/GistEditor'
import { GET_GIST_BY_ID } from '../queries'

export default class Gist extends React.Component<{}> {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  findFileObject = (filesArray, currentFile) => {
    const obj = filesArray.find(file => file.filename === currentFile)
    return obj.content
  }

  render() {
    const { match, history } = this.props

    return (
      <Query query={GET_GIST_BY_ID} variables={{ gistId: match.params.gistId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return null
          }
          if (error) {
            return `Error!: ${error}`
          }
          return (
            <React.Fragment>
              <h1>Viewing Gist: {match.params.gistId}</h1>
              <UserBtnsContainer>
                <BlueButton onClick={() => history.push('/editor')}>
                  Back
                </BlueButton>
                <Delete gistId={match.params.gistId} history={history} />
              </UserBtnsContainer>
              <GistEditor
                getGistById={data.getGistById}
                gistId={match.params.gistId}
              />
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}
