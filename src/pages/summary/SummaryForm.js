import React from "react";

function SummaryForm() {
  return (
    <div>
      <input
        id="terms-and-conditions-checkbox"
        type="checkbox"
        defaultChecked={false}
        aria-checked={false}
      />
      <label htmlFor="terms-and-conditions-checkbox">
        I agree to <a href="#">Terms and Conditions</a>
      </label>
      <button>Confirm order</button>
    </div>
  );
}

export default SummaryForm;
