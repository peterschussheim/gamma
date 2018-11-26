import React from 'react'
import PropTypes from 'prop-types'
import { compose, graphql, withApollo } from 'react-apollo'

import { GET_GIST_BY_ID } from '../queries'
import CodeEditor from '../components/editor'
import Skeleton from '../components/editor/skeleton'
import Header from '../components/editor/header'
import Sidebar from '../components/editor/sidebar'

const File = props => {
  return (
    <div>
      <span>{props.name}</span>
      <span>{props.language}</span>
      <pre>{props.content}</pre>
      <span>{props.type}</span>
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
    <File
      key={index}
      name={file.filename}
      language={file.language}
      type={file.type}
      content={file.content}
    />
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

/**
 * Takes an object representation of a 'gist' and iterates over its' keys
 * collecting each key (equiv to file name) and value in the result array.
 *
 * @param {object} g gist object from app state
 * @returns {array} An array containing object files
 */
function getFiles(g) {
  let { files } = g
  let result = []
  for (let key in files) {
    if (files.hasOwnProperty(key)) {
      result.push(files[key])
    }
  }
  return result
}

export default Gist
