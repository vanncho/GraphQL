import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }: any) => {

  const isLoggedIn: boolean = localStorage.getItem('token') !== null || false;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={
                        { pathname: '/login', state: { from: props.location } }
                       }
          />
        )
      }
    />
  )
}

export default PrivateRoute;