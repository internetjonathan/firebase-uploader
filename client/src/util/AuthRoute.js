import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function AuthRoute(props) {
    if (props.authenticated === true) {
        return <Redirect to="/" />
    } else if (props.authenticated === false) {
        return <Redirect to="/login" />
    } else {
        return <Route component={props.component} {...props} />
    }
    // <Route
    //     {...rest}
    //     render={(props) => authenticated === true ? <Redirect to='/' /> : <Component {...props} />}
    // />
}



export default AuthRoute;