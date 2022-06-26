import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { connect } from 'react-redux';
import {} from '../../actions';
import Photos from './Photos/Photos';
import Users from './Users/Users';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  state = {
    activeItem: 'users',
  };
  onClickTab = (e) => {
    this.setState({
      ...this.state,
      activeItem: e.target.name,
    });
  };
  render() {
    return (
      <div
        className="ui segment pushable"
        style={{
          height: '800px',
        }}
      >
        <div
          className={`ui inverted vertical labeled icon ui push left thin ${
            this.props.isHamburgerActive ? 'visible' : ''
          } sidebar menu`}
        >
          <Link
            to="/"
            className={`${
              this.state.activeItem === 'users' ? 'active' : ''
            } item`}
            name="users"
            onClick={this.onClickTab}
          >
            <i aria-hidden="true" className="address book icon"></i>Users
          </Link>
          <Link
            to="/photos"
            className={`${
              this.state.activeItem === 'photos' ? 'active' : ''
            } item`}
            name="photos"
            onClick={this.onClickTab}
          >
            <i aria-hidden="true" className="camera retro icon"></i>Photos
          </Link>
        </div>
        <div
          className="pusher"
          style={{
            width: this.props.isHamburgerActive ? 'calc(100% - 150px)' : '100%',
          }}
        >
          <div
            className="ui basic segment"
            style={{ overflow: 'auto', height: '800px' }}
          >
            {this.state.activeItem === 'users' ? <Users /> : <Photos />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isHamburgerActive: state.header.isHamburgerActive,
  };
};

export default connect(mapStateToProps, {})(Dashboard);
