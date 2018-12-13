import * as React from 'react'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'

import { BlueButton, UserBtnsContainer } from '../components/Buttons'
import Skeleton from '../components/Skeleton'
import Footer from '../components/Footer'
import GistFilesList from '../components/SidebarList/GistFilesList'
// import MonacoEditor from '../components/MonacoEditor'
import Icon from '../components/icon'
import { Debugger } from '../components/Debugger'
import Delete from '../components/Delete'
import MRE from '../components/MonacoEditor/MRE'
import { GET_GIST_BY_ID } from '../queries'

// class CodeEditor extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       code: '// type your code... \n'
//     }
//   }

//   onChange = (newValue, e) => {
//     console.log('onChange', newValue, e) // eslint-disable-line no-console
//   }

//   editorDidMount = editor => {
//     // eslint-disable-next-line no-console
//     console.log('editorDidMount', editor, editor.getValue(), editor.getModel())
//     this.editor = editor
//   }

//   changeEditorValue = () => {
//     if (this.editor) {
//       this.editor.setValue('// code changed! \n')
//     }
//   }

//   changeBySetState = () => {
//     this.setState({ code: '// code changed by setState! \n' })
//   }

//   render() {
//     const { code } = this.state
//     const options = {
//       selectOnLineNumbers: true,
//       roundedSelection: false,
//       readOnly: false,
//       cursorStyle: 'line',
//       automaticLayout: false
//     }
//     return (
//       <div>
//         <MRE
//           language="javascript"
//           value={code}
//           options={options}
//           onChange={this.onChange}
//           editorDidMount={this.editorDidMount}
//         />
//       </div>
//     )
//   }
// }

export default class Gist extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    gistId: null,
    files: null,
    currentFile: null,
    apolloDataLoaded: null,
    error: {}
  }

  componentDidMount() {
    // this.loadData(this.props)
  }

  loadData = props => {
    this.setState((state, props) => ({
      error: null,
      apolloDataLoaded: false,
      gistId: props.match.params.gistId
    }))

    const { data } = props
    const { loading, error } = data

    if (error) {
      this.setState({ error })
    } else if (loading === false) {
      this.setState({ apolloDataLoaded: true })
      console.log(data.getGistById)
      this.setState((state, props) => ({ files: props.data.getGistById.files }))
    } else {
      this.setState({ error: 'apollo data failed to load' })
    }
  }

  handleUpdateCurrentFile = event => {
    event.persist()
    this.setState({ currentFile: event.target.textContent })
  }

  editorDidMount = editor => {
    // console.log('editorDidMount', editor, editor.getValue(), editor.getModel())
    this.editor = editor
  }

  changeEditorValue = newValue => {
    if (this.editor) {
      this.editor.setValue(newValue)
    }
  }

  handleValueChange = code => {
    this.setState(state => ({
      files: {
        ...state.files,
        [state.currentFile]: code
      }
    }))
    this.changeEditorValue(code)
  }

  findFileObject = (filesArray, currentFile) => {
    const obj = filesArray.find(file => file.filename === currentFile)
    console.log(obj)
    return obj.content
  }

  handleOpenPath = path => this.setState({ currentFile: path })

  render() {
    const {
      match,
      history,
      data: { loading, error, getGistById }
    } = this.props
    const { currentFile } = this.state

    return (
      <Query query={GET_GIST_BY_ID} variables={match.params.gistId}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error!: ${error}`
          return (
            <React.Fragment>
              <h1>Viewing Gist: {match.params.gistId}</h1>
              <UserBtnsContainer>
                <BlueButton onClick={() => history.push('/editor')}>
                  Back
                </BlueButton>
                <Delete gistId={match.params.gistId} history={history} />
              </UserBtnsContainer>
              <React.Fragment>
                <Skeleton
                  data={getGistById}
                  sidebar={
                    <GistFilesList
                      handleClickFile={this.handleUpdateCurrentFile}
                      gistId={match.params.gistId}
                      {...this.props}
                    />
                  }
                  editor={
                    <MRE
                      files={getGistById.files}
                      onOpenPath={this.handleOpenPath}
                      value={getGistById.files[0].content}
                      editorDidMount={this.editorDidMount}
                      onValueChange={this.handleValueChange}
                    />
                  }
                />
                <Footer
                  currentFile={getGistById.files[0].filename}
                  iconComponent={
                    <Icon
                      height={17}
                      filename={getGistById.files[0].filename}
                    />
                  }
                />
              </React.Fragment>
              <Debugger state={this.state} props={this.props} />
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}
