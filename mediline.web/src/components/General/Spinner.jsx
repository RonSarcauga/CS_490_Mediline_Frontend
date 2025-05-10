import React from "react";
import "../../assets/scss/components/_spinner.scss";

export default function SpinnerLoader({ size = 48 }) {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" style={{ width: size, height: size }}></div>
    </div>
  );
}