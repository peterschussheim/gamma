import React from 'react'
import PropTypes from 'prop-types'
import { compose, graphql, withApollo } from 'react-apollo'

import getFiles from '../utils/getFiles'
import { GET_GIST_BY_ID } from '../queries'
import Icon from '../components/icon'
import CodeEditor from '../components/editor'
import Skeleton from '../components/editor/skeleton'
import Footer from '../components/editor/footer'
import Sidebar from '../components/editor/sidebar'

const File = props => {
  return (
    <div>
      {props.name}
      <Icon name={props.name} />
      {/* <span>{props.language}</span> */}
      <pre>{props.content}</pre>
    </div>
  )
}

File.propTypes = {
  name: PropTypes.string,
  language: PropTypes.string,
  type: PropTypes.string,
  content: PropTypes.string
}

function Files({ gist }) {
  const files = getFiles(gist).map((file, index) => (
    <li key={index}>
      <File
        name={file.filename}
        language={file.language}
        type={file.type}
        content={file.content}
      />
    </li>
  ))

  return <div>{files}</div>
}

Files.propTypes = {
  gist: PropTypes.object.isRequired
}

const Gist = props => {
  const { gist } = props
  return (
    <div>
      <h1>{gist.description || 'No Description'}</h1>
      <ul>
        <Files gist={props.gist} />
      </ul>
    </div>
  )
}

export default Gist
