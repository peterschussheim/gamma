import * as React from 'react'

import EditableText from '../EditableText'
import { Description, ListItem } from './elements'
import { Icon } from '../Icon'
import { isFileDirty } from '../../utils/isFileDirty'
import EditIcons from '../EditIcons'
import { EditorContext } from '../CodeEditor/EditorProvider'

type Props = {
  type: 'description' | 'file'
  handleOpenPath?(path: string): void
  handleRenameFile?(filename: string): void
  handleDescriptionChange?(description: string): void
  handleCancel?(description: string): void
  /** Signals that we are rendering data from `EditorProvider`, not apollo */
  isCreating: boolean
  loading: boolean
  filename?: string
  /** Description of this Gist */
  description?: string
  data: any
}

type IndicatorProps = {
  isDirty: boolean
}

const DirtyIndicator: React.FunctionComponent<IndicatorProps> = props => {
  return (
    <span style={{ float: 'right', color: 'magenta', fontWeight: 'bold' }}>
      {props.isDirty ? 'M' : null}
    </span>
  )
}

class FileListItem extends React.Component<Props> {
  isCreating: boolean
  static contextType = EditorContext
  constructor(props) {
    super(props)
    this.isCreating = this.props.isCreating
    this.state = {
      itemState: props.itemState || '',
      error: false,
      selected: false,
      hovering: false
    }
  }

  onMouseEnter = () => this.setState({ hovering: true })
  onMouseLeave = () => this.setState({ hovering: false })

  render() {
    const { data, description, isCreating } = this.props
    if (!isCreating) {
      return <div>viewing or editing gist</div>
    } else {
      // we are creating a new gist
      return <div>creating new gist</div>
    }
  }
}

export default FileListItem
