import * as React from 'react'
import { FillSpaceError, LargeEmoji, Heading, Subheading } from './style'
import { Button } from '../buttons'

// type Props = {
//   emoji?: string,
//   heading?: string,
//   subheading?: string,
//   refresh?: boolean,
//   children?: React.Node,
//   small?: boolean,
//   dataCy?: string
// }

class ViewError extends React.Component {
  render() {
    const {
      heading,
      subheading,
      refresh,
      emoji,
      children,
      small,
      dataCy
    } = this.props

    const moji = emoji || '😌'
    const head = heading || 'We could all use a refresh.'
    const subhead = subheading || 'Refresh this page to try again.'

    return (
      <FillSpaceError small={small} data-cy={dataCy}>
        <LargeEmoji small={small} role="img" aria-label="Emoji">
          {moji}
        </LargeEmoji>
        <Heading small={small}>{head}</Heading>
        <Subheading small={small}>{subhead}</Subheading>

        {refresh && (
          <Button
            large={!small}
            icon="view-reload"
            onClick={() => window.location.reload(true)}
          >
            Refresh the page
          </Button>
        )}

        {children}
      </FillSpaceError>
    )
  }
}

export default ViewError
