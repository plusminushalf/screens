import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRouteIsInitialized } from './protected-route'
import Home from './pages/home'
import Onboarding from './pages/onboarding'
import Initialize from './pages/initialize'
import AddGuardianTx from './pages/add-guardian-tx'
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { infuraProvider } from 'wagmi/providers/infura'
import '@rainbow-me/rainbowkit/styles.css'
import GuardianInitialized from './pages/guardian-initialized'
import { SafeAppRoute } from './safe-route'
import ChromeExtensionPath from './pages/chrome-extension-path'

const { chains, provider } = configureChains([goerli], [infuraProvider({ apiKey: 'bdabe9d2f9244005af0f566398e648da' })])

const { connectors } = getDefaultWallets({
  appName: 'guardian',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const SafeApp = (): React.ReactElement => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Routes>
          <Route
            path="/"
            element={
              <SafeAppRoute>
                <ProtectedRouteIsInitialized>
                  <Home />
                </ProtectedRouteIsInitialized>
              </SafeAppRoute>
            }
          />
          <Route
            path="/guardians/initialized/"
            element={
              <SafeAppRoute>
                {/* <ProtectedRouteIsInitialized> */}
                <GuardianInitialized />
                {/* </ProtectedRouteIsInitialized> */}
              </SafeAppRoute>
            }
          />
          <Route
            path="/guardians/initTx"
            element={
              <SafeAppRoute>
                <AddGuardianTx />
              </SafeAppRoute>
            }
          />
          <Route
            path="/guardians/initialize"
            element={
              <SafeAppRoute>
                <Initialize />
              </SafeAppRoute>
            }
          />
          <Route
            path="/onboarding/intro"
            element={
              <SafeAppRoute>
                <Onboarding />
              </SafeAppRoute>
            }
          />
          <Route path="/extension/sign-transaction/:chromeId" element={<ChromeExtensionPath />} />
        </Routes>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default SafeApp
