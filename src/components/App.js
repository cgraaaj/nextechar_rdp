import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Sentry from "@sentry/react"


import Login from './Login';
import Dashboard from './Dashboard';
import Users from './Dashboard/Users/Users';
import Photos from './Dashboard/Photos/Photos';
import ProctedRoute from './ProctedRoute';

class App extends React.Component {
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const tost = this.props.toast;
    if (prevProps.toast !== tost) {
      switch (tost.type) {
        case 'warn':
          toast.warn(tost.message, tost.options);
          break;
        case 'info':
          toast.info(tost.message, tost.options);
          break;
        case 'success':
          toast.success(tost.message, tost.options);
          break;
        default:
          toast(tost.message, tost.options);
      }
    }
  }
  render() {
    return (
      <div className="ui container" style={{ width: '98%' }}>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/login" index element={<Login />} />
            <Route element={<ProctedRoute isAuth={this.props.isSignedIn} />}>
              <Route path="/" element={<Dashboard />}>
                <Route index element={<Users />} />
                <Route path="/users" element={<Users />} />
                <Route path="/photos" element={<Photos />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    initialValues: {},
    isSignedIn: state.auth.isSignedIn,
    toast: state.toast,
  };
};

export default connect(mapStatetoProps)( Sentry.withProfiler(App));
