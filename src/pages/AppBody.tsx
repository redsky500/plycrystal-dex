import React from 'react'
import styled from 'styled-components'
import { Card } from '@crystals/uikit'

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 436px;
  width: 100%;
  background-color: rgba(0,0,0,0);
  z-index: 5;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, idName }: { children: React.ReactNode, idName?: string }) {
  return <BodyWrapper id={idName}>{children}</BodyWrapper>
}
