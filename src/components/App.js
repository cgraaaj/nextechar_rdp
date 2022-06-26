import React from 'react';
import { connect } from 'react-redux';
import { Router, Redirect } from 'react-router-dom';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import history from '../history';
import Login from './Login';
import Dashboard from './Dashboard';
import Users from './Dashboard/Users/Users';
import Photos from './Dashboard/Photos/Photos';

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
        <Router history={history}>
          {this.props.isSignedIn ? (
            <div>
              <Header />
              <Dashboard />
            </div>
          ) : (
            <Login />
          )}
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

export default connect(mapStatetoProps)(App);
