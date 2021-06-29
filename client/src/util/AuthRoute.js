import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function AuthRoute(props) {
    // console.log(props)

    if (props.auth && props.authenticated === false) {
        return <Redirect to="/login" />
    } else if (props.guest && props.authenticated === true) {
        return <Redirect to="/" />
    }
    else {
        return <Route component={props.component} {...props} />
    }
    // <Route
    //     {...rest}
    //     render={(props) => authenticated === true ? <Redirect to='/' /> : <Component {...props} />}
    // />
}



export default AuthRoute;