import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './pages/SignUp';
import OTPVerification from './pages/OTPVerification';
import Dashboard from './pages/Dashboard';
import CreateJob from './pages/CreateJob';
import Header from './components/Header';

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('token') ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
            }
        />
    );
}

function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={SignUp} />
                <Route path="/verify" component={OTPVerification} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/create-job" component={CreateJob} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;