import React from 'react'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'

import { BlueButton, UserBtnsContainer } from '../components/buttons'
import Skeleton from '../components/Skeleton'
import Footer from '../components/Footer'
import OldFileList from '../components/SidebarList'
// import MonacoEditor from '../components/MonacoEditor'
import Icon from '../components/icon'
import Delete from '../components/Delete'
import MRE from '../components/MonacoEditor/MRE'
import { GET_GIST_BY_ID } from '../queries'

const files = {}

class CodeEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '// type your code... \n'
    }
  }

  onChange = (newValue, e) => {
    console.log('onChange', newValue, e) // eslint-disable-line no-console
  }

  editorDidMount = editor => {
    // eslint-disable-next-line no-console
    console.log('editorDidMount', editor, editor.getValue(), editor.getModel())
    this.editor = editor
  }

  changeEditorValue = () => {
    if (this.editor) {
      this.editor.setValue('// code changed! \n')
    }
  }

  changeBySetState = () => {
    this.setState({ code: '// code changed by setState! \n' })
  }

  render() {
    const { code } = this.state
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false
    }
    return (
      <div>
        <div>
          <button onClick={this.changeEditorValue} type="button">
            Change value
          </button>
          <button onClick={this.changeBySetState} type="button">
            Change by setState
          </button>
        </div>
        <hr />
        <MRE
          height="500"
          language="javascript"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </div>
    )
  }
}

export default class Gist extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    files,
    current: ''
  }

  handleValueChange = code =>
    this.setState(state => ({
      files: {
        ...state.files,
        [state.current]: code
      }
    }))

  handleOpenPath = path => this.setState({ current: path })

  getFilenameToDisplayInSidebar = path => {
    const split = path.split('/')
    const cleaned = split[split.length - 1]
    return cleaned
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
                    editor={<CodeEditor />}
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
