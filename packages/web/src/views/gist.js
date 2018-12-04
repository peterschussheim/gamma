import React from 'react'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'

import { BlueButton, UserBtnsContainer } from '../components/buttons'
import Skeleton from '../components/skeleton'
import Footer from '../components/footer'
import OldFileList from '../components/SidebarList'
import Editor from '../components/editor/newEditor'
import Icon from '../components/icon'
import Delete from '../components/delete'

import { GET_GIST_BY_ID } from '../queries'

export default class Gist extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  render() {
    const { match, location, history } = this.props
    return (
      <React.Fragment>
        <h1>Viewing Gist: {match.params.gistId}</h1>
        <UserBtnsContainer>
          <BlueButton onClick={() => history.push('/editor')}>Back</BlueButton>
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
                    data={data.getGistById}
                    sidebar={
                      <OldFileList
                        gist={data.getGistById}
                        handleLoadSelectedFile={event => {
                          console.log(event.target)
                        }}
                        {...this.props}
                      />
                    }
                    editor={
                      <Editor
                        editorRef={editor => {
                          this.editor = editor
                        }}
                        value={data.getGistById.files[0].content}
                        language={data.getGistById.files[0].language}
                      />
                    }
                  />
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
    )
  }
}
