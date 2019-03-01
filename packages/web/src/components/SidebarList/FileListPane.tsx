/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

type Props = {
  title: string
  expanded: boolean
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  buttons?: React.ReactNode[]
  children?: React.ReactNode
  className?: string
}

export default function FileListPane({
  title,
  expanded,
  buttons,
  children,
  onClick
}: Props) {
  return (
    <div css={{ display: 'flex', flexDirection: 'column', margin: '8px 0' }}>
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0 4px'
        }}
      >
        <div
          css={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            padding: '8px 4px',
            cursor: 'pointer'
          }}
          onClick={onClick}
          data-test-id={`file-list-pane-${title
            .toLowerCase()
            .replace(/[^a-z]/g, '-')}`}
        >
          <svg
            css={[
              { margin: '1px 6px 1px 2px', opacity: 0.7 },
              expanded
                ? { transform: 'rotate(0deg)' }
                : { transform: 'rotate(180deg)' }
            ]}
            width="12px"
            height="12px"
            viewBox="0 0 12 12"
          >
            <g
              stroke="none"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline
                stroke="currentColor"
                // tslint:disable-next-line:max-line-length
                transform="translate(6.000000, 6.000000) scale(-1, 1) rotate(180.000000) translate(-6.000000, -6.000000) "
                points="2 4 6 8 10 4"
              />
            </g>
          </svg>
          <h4
            css={{
              fontSize: '1em',
              color: 'white',
              fontWeight: 500,
              lineHeight: 1,
              margin: 0
            }}
          >
            {title}
          </h4>
        </div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          {buttons}
        </div>
      </div>
      {expanded ? children : null}
    </div>
  )
}
