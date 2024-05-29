// PhoneInput.js
import React, { useState, useEffect } from "react";

function PhoneInput({ phone, setPhone }) {
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (phone.replace(/-/g, "").length > 10) {
      setWarning("You've exceeded the allowed phone number length!");
    } else {
      setWarning("");
    }
  }, [phone]);

  return (
    <div className="form-group">
      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        id="phone"
        name="phone"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" // USA phone number format (XXX-XXX-XXXX)
        required
      />
      <small>Format: XXX-XXX-XXXX</small>
      {warning && (
        <div style={{ color: "red", marginTop: "5px" }}>{warning}</div>
      )}
    </div>
  );
}

export default PhoneInput;
