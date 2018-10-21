import React from "react";
import { connect } from "react-redux";
import { register } from "../actions";
import { Button } from "../../../components";
import { TopBar } from "./TopBar";
import { UserTypeOption } from "./UserTypeOption";

export class Register extends React.PureComponent {
  state = {
    selectedUserType: "",
  };

  onContinue = () => {
    this.props.register(this.state.selectedUserType);
  };

  selectSaver = () => {
    this.setState({ selectedUserType: "saver" });
  };

  selectLoaner = () => {
    this.setState({ selectedUserType: "loaner" });
  };

  selectBorrower = () => {
    this.setState({ selectedUserType: "borrower" });
  };

  render() {
    const { selectedUserType } = this.state;

    return (
      <div className="register-container">
        <TopBar />
        <div className="user-type-options">
          <div className="welcome-text">Welcome to Equalitee</div>
          <div className="user-type-list">
            <UserTypeOption
              description="Apply for a low interest loan based on your ability to pay and backed by people who believe in your business."
              title="Apply for a loan"
              userType="borrower"
              selectedUserType={selectedUserType}
              onClick={this.selectBorrower}
            />
            <UserTypeOption
              description="Support a local, trusted business by purchasing a zero-risk savings certificate."
              title="Purchase a savings certificate"
              userType="saver"
              selectedUserType={selectedUserType}
              onClick={this.selectSaver}
            />
            <UserTypeOption
              description="Invest in a trusted, community-backed business with minimal capital."
              title="Invest in an entrepreneur"
              userType="loaner"
              selectedUserType={selectedUserType}
              onClick={this.selectLoaner}
            />
          </div>
          {selectedUserType !== "" && (
            <div className="continue-button">
              <Button text="Continue" onClick={this.onContinue} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export const RegisterWrapped = connect(
  () => ({}),
  { register }
)(Register);
