import * as React from 'react'
import { createComponent, combineRules } from 'cf-style-container'
import { omit } from 'lodash-es'

export interface IPositioning {
  position?:
    | React.CSSWideKeyword
    | 'static'
    | 'relative'
    | 'absolute'
    | 'fixed'
    | 'sticky'
  top?: string
  right?: string
  bottom?: string
  left?: string
  zIndex?: number
}
export const PositionAbsoluteRule = ({
  top,
  right,
  bottom,
  left,
  zIndex,
  position = 'absolute',
}: IPositioning) => ({
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
})

export const PositionAbsolute = createComponent(PositionAbsoluteRule)

export const Resize = createComponent(
  ({
    amount = 1,
    origin = 'initial',
  }: {
    amount?: number
    origin?: string
  }) => ({
    transform: `scale(${amount})`,
    transformOrigin: origin,
  }),
)

export type TFlexPassthroughProps = { direction?: 'row' | 'column' }
export const FlexPassthroughRule = ({
  direction = 'row',
}: TFlexPassthroughProps) => ({
  display: 'flex',
  flexDirection: direction,
  flex: 1,
})
export const FlexPassthrough = createComponent(FlexPassthroughRule)

export const OpacityRule = ({ opacity = 1 }: { opacity: number }) => ({
  opacity,
})
export const Opacity = createComponent(OpacityRule)

export const EditorWrapper = createComponent(
  ({ hideOverflow = false }: { hideOverflow?: boolean }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: hideOverflow ? 'hidden' : 'initial',
    // Normalize .file and .icon CSS since cf.core.css adds a lot of CSS
    '&': {
      '& .file': {
        backgroundColor: 'initial',
        border: 'initial',
        color: 'initial',
        marginBottom: 'initial',
        maxWidth: 'initial',
        position: 'initial',
        padding: 'initial',
        width: 'initial',
        mozBorderRadius: 'initial',
        webkitBorderRadius: 'initial',
        borderRadius: 'initial',
        display: 'initial',
        verticalAlign: 'initial',
      },

      '& .icon': {
        fontFamily: 'initial',
        fontWeight: 'initial',
        fontStyle: 'initial',
        textDecoration: 'initial',
        fontSmoothing: 'initial',
        display: 'initial',
        width: 'initial',
        height: 'initial',
        lineHeight: 'initial',
        verticalAlign: 'initial',
        backgroundImage: 'initial',
        backgroundPosition: 'initial',
        backgroundRepeat: 'initial',
        marginTop: 'initial',
      },

      '& .file:before': {
        backgroundColor: 'initial',
        color: 'initial',
        cursor: 'initial',
        content: 'initial',
        height: 'initial',
        position: 'initial',
        top: 'initial',
        left: 'initial',
        lineHeight: 'initial',
        padding: 'initial',
      },

      '& .icon:before': {
        textDecoration: 'initial',
        display: 'initial',
        speak: 'initial',
      },
    },
  }),
)

export type TBorderProps = {
  border?: string
  borderTop?: string
  borderTopWidth?: string
  borderRight?: string
  borderRightWidth?: string
  borderBottom?: string
  borderBottomWidth?: string
  borderLeft?: string
  borderLeftWidth?: string
  borderColor?: string
  borderWidth?: string
  borderStyle?: string
  theme?: any
}

const defaultBorderProps = (theme: any) => ({
  borderColor: theme.color.ash || '#ccc',
  borderStyle: 'solid',
})

export const Border = createComponent(
  combineRules(
    (props?: TBorderProps) => ({
      ...Object.assign(
        {},
        defaultBorderProps(props.theme || {}),
        omit(props, ['theme']),
      ),
    }),
    FlexPassthroughRule,
  ),
)

