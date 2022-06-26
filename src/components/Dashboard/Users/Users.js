import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../../actions';
import _ from 'lodash';

class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  renderRows = () => {
    return this.props.users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user['id']}</td>
          <td>{user['name']}</td>
          <td>{user['username']}</td>
          <td>{user['email']}</td>
          <td>{user['address']['street']}</td>
          <td>{user['address']['suite']}</td>
          <td>{user['address']['city']}</td>
          <td>{user['address']['zipcode']}</td>
          <td>{user['phone']}</td>
          <td>{user['website']}</td>
          <td>{user['company']['name']}</td>
        </tr>
      );
    });
  };

  render() {
    return _.isEmpty(this.props.users) ? null : (
      <div>
        <table
          className="ui striped table"
          style={{ display: 'table', overflow: 'auto', whiteSpace: 'nowrap' }}
        >
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Street</th>
              <th>Suite</th>
              <th>City</th>
              <th>Zip</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { users: state.dashboard.users };
};

export default connect(mapStateToProps, { getUsers })(Users);
