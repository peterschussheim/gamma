/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import * as React from 'react'

export type Action = {
  label: string
  handler: () => void
  disabled?: boolean
  combo?: number[]
}

type Props = {
  innerRef?: React.Ref<HTMLUListElement>
  visible: boolean
  actions: Array<Action | undefined>
  position?: {
    pageX: number
    pageY: number
  } | null
  onHide: () => void
  className?: string
}

const BOTTOM_OFFSET = 35
const MENU_ITEM_HEIGHT = 28

class ContextMenu extends React.PureComponent<Props> {
  render() {
    const {
      visible,
      position,
      actions,
      onHide,
      // @ts-ignore
      innerRef
    } = this.props

    if (!visible) {
      return null
    }

    const shownActions = actions.filter(action => action) as Action[]

    return (
      <ul
        ref={innerRef}
        css={[menu, menuDark]}
        style={
          position
            ? {
                position: 'fixed',
                top: Math.min(
                  position.pageY,
                  window.innerHeight -
                    BOTTOM_OFFSET -
                    shownActions.length * MENU_ITEM_HEIGHT
                ),
                left: position.pageX,
                marginTop: -8
              }
            : {}
        }
      >
        {shownActions.map(({ label, handler, disabled, combo }: Action) => (
          <li key={label}>
            <button
              disabled={disabled}
              css={[item, disabled && disabledStyle]}
              onClick={() => {
                handler()
                onHide()
              }}
            >
              <div>{label}</div>
              {/* {combo ? (
                <kbd className={css(styles.hint)}>
                  <ShortcutLabel combo={combo} />
                </kbd>
              ) : null} */}
            </button>
          </li>
        ))}
      </ul>
    )
  }
}

export default React.forwardRef(
  (props: Props, ref: React.Ref<HTMLUListElement>) => (
    <ContextMenu {...props} innerRef={ref} />
  )
)

const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 }
}

const menu = css({
  zIndex: 10,
  listStyle: 'none',
  padding: 4,
  borderRadius: 3,
  borderStyle: 'solid',
  boxShadow: '0px 4px 9px rgba(0, 0, 0, 0.34)',
  minWidth: 160,
  animationName: 'fadeIn',
  animationDuration: '0.083s',
  animationTimingfunction: 'linear',
  fontFamily: '-apple-system, Lucida Grande',
  fontSize: 14,
  lineHeight: 15,
  backgroundColor: 'rgba(239, 239, 239, 0.95)',
  borderColor: 'black',
  color: '#3C3C3C'
})

const menuLight = css({
  borderWidth: 0
})

const menuDark = css({
  borderWidth: 1,
  borderStyle: 'solid'
})

const item = css({
  lineHeight: 1,
  display: 'flex',
  justifyContent: 'space-between',
  appearance: 'none',
  background: 'none',
  border: 0,
  outline: 0,
  width: '100%',
  padding: '8px 12px',
  textAlign: 'left',
  userSelect: 'none',
  borderRadius: 2,

  ':hover': {
    background: '#4630eb',
    color: 'white'
  }
})

const disabledStyle = css({
  pointerEvents: 'none',
  opacity: 0.5
})

const hint = css({
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  marginLeft: 24,
  opacity: 0.3
})
