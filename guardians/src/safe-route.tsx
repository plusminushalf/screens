import { Loader, Title } from '@gnosis.pm/safe-react-components'
import SafeProvider from '@safe-global/safe-apps-react-sdk'
import React, { ReactElement } from 'react'

export const SafeAppRoute = ({ children }: { children: ReactElement }) => {
  return (
    <SafeProvider
      loader={
        <>
          <Title size="md">Waiting for Safe...</Title>
          <Loader size="md" />
        </>
      }
    >
      {children}
    </SafeProvider>
  )
}
