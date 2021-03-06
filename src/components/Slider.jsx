import React, { Component } from "react";
import SliderInput, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

const SliderComponent = createSliderWithTooltip(SliderInput);

const tipFormatter = (value, type) => {
  switch (type) {
    case "amount":
      return `Investment: $${value} / ROI: $${Math.floor(
        Math.round(value * 0.05)
      )}`;
    case "term":
      return `${value} month${value > 1 ? "s" : ""}`;
    default:
      return "";
  }
};

class Slider extends Component {
  render() {
    const { onChange, min, max } = this.props;
    return (
      <div className="slider-container">
        <SliderComponent
          tipFormatter={value => tipFormatter(value, this.props.type)}
          tipProps={{ placement: "bottom", overlayClassName: "slider-tooltip" }}
          min={min}
          max={max}
          onChange={onChange}
          trackStyle={{ height: "5px", backgroundColor: "white" }}
          railStyle={{ height: "5px", backgroundColor: "white" }}
          handleStyle={{
            borderColor: "white",
            backgroundColor: "white",
            height: "17px",
            width: "17px",
          }}
        />
      </div>
    );
  }
}

export default Slider;
