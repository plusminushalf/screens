import React, { ReactElement, useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const ProtectedRouteIsInitialized = ({ children }: { children: ReactElement }) => {
  const initialised = useMemo(() => {
    return localStorage.getItem('initialised')
  }, [])

  const location = useLocation()

  if (initialised !== 'initialised') {
    return <Navigate to="/guardians/initialized" state={{ from: location }} replace />
  }
  return children
}
