import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { login } from '../../actions';
import { Form, Field, FormSpy } from 'react-final-form';
import { Button, Checkbox } from 'semantic-ui-react';

class Login extends React.Component {
  componentDidMount() {}

  onLogIn = (values) => {
    this.props.login(values);
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="header" style={{ color: '#9f3a38' }}>
          {error}
        </div>
      );
    }
  }

  validate = (formValues) => {
    const errors = {};
    const emailRE = /\S+@\S+\.\S+/;
    if (!emailRE.test(formValues.email)) {
      errors.email = 'Enter a vaild email';
    }
    if (!formValues.password) {
      errors.password = 'Password required';
    }
    return errors;
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ' '}`;
    return (
      <div className="row">
        <div className="column">
          <div className={`ui right aligned container ${className}`}>
            <label>{label}</label>
          </div>
        </div>
        <div className="column">
          <input
            {...input}
            autoComplete="off"
            type={label === 'Password' ? 'password' : null}
            id={label}
          />
          {this.renderError(meta)}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="ui segments">
          <div className="ui segment">
            <div className="ui one column centered grid">
              <div className="row">
                <h4 style={{ margin: '10px' }}>Login</h4>
              </div>
            </div>
          </div>
          <div className="ui segment">
            <div className="ui one column centered grid">
              <div className="column">
                <div className="ui segment">
                  <Form
                    onSubmit={this.onLogIn}
                    initialValues={this.props.initialValues}
                    validate={this.validate}
                    render={({ handleSubmit, values }) => (
                      <form className="ui form error" onSubmit={handleSubmit}>
                        <div className="ui two column grid container">
                          <Field
                            name="email"
                            component={this.renderInput}
                            label="Email"
                          />
                          <Field
                            name="password"
                            component={this.renderInput}
                            label="Password"
                          />
                          <div className="row">
                            <div className="column"></div>
                            <div className="column">
                              <Checkbox
                                label="Show Password"
                                onClick={(e, data) => {
                                  let passEl =
                                    document.getElementById('Password');
                                  if (data.checked) {
                                    passEl.type = 'text';
                                  } else {
                                    passEl.type = 'password';
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="column"></div>
                            <div className="column">
                              <Button type="submit" variant="contained">
                                Log In
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: {},
  };
};

export default connect(mapStateToProps, {
  login,
})(Login);
