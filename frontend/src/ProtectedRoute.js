import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min'

export default function ProtectedRoute({ children, isAuthorized }) {
  return <Route>{isAuthorized ? children : <Redirect to="/" />} </Route>
}
