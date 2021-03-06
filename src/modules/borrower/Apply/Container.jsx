import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { createLoan } from "../actions";
import { changeTopBarCopy } from "../../layout/actions";
import { TextField } from "../../../components/TextField";
import { Button } from "../../../components/Button";
import Slider from "../../../components/Slider";

const SliderInput = ({ onChange, min, max, type, currentValue }) => (
  <div className="slider-container">
    <h2>Term: {`${currentValue} month${currentValue > 1 ? "s" : ""}`}</h2>
    <div className="slider-input">
      <Slider onChange={onChange} min={min} max={max} type={type} />
    </div>
  </div>
);

export class ApplyContainer extends React.PureComponent {
  state = {
    name1: "",
    lastName: "Smith",
    purpose: "",
    amount: 0,
    term: 1,
  };

  componentDidMount() {
    this.props.changeTopBarCopy("Apply for a loan");
  }

  onTextFieldChange = (field, value) => {
    this.setState({ [field]: value });
  };

  onSliderChange = value => {
    this.setState({ term: value });
  };

  async getCredit() {
    const json = await axios.get("http://localhost:8080/credit");
    return json;
  }

  onSubmit = () => {
    const { name1, purpose, amount, term } = this.state;

    this.getCredit().then(data => {
      console.log(JSON.parse(data.data).syfCreditScore);
      if (Number(JSON.parse(data.data).syfCreditScore) > Number(500)) {
        this.props.createLoan({
          userId: this.props.userId,
          title: name1,
          purpose,
          amount,
          termLength: term,
          termRate: "20",
        });
        this.props.history.push("/user/borrower/approved");
      }

      this.props.history.push("/user/borrower/approved");
    });
  };

  render() {
    const { name1, purpose, amount } = this.state;
    const isButtonDisabled = purpose === "" || amount === 0;

    return (
      <div className="apply-container">
        <div className="apply-form">
          <TextField
            field="name1"
            value={name1}
            placeholder="name"
            onChange={this.onTextFieldChange}
          />

          <TextField
            field="purpose"
            value={purpose}
            placeholder="your pitch"
            onChange={this.onTextFieldChange}
          />
          <TextField
            field="amount"
            value={amount > 0 ? amount : null}
            placeholder="amount"
            onChange={this.onTextFieldChange}
          />
          <SliderInput
            onChange={this.onSliderChange}
            min={1}
            max={12}
            currentValue={this.state.term}
            type="term"
          />
        </div>
        <div className="apply-button">
          <Button
            text="Submit"
            disabled={isButtonDisabled}
            onClick={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
});

export const ApplyContainerWrapped = withRouter(
  connect(
    mapStateToProps,
    { changeTopBarCopy, createLoan }
  )(ApplyContainer)
);
