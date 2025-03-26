import "./styles.css";
import { useDebugValue, useEffect, useRef, useState } from "react";

export default function App() {
  const OTP_NO_COUNT = 5;
  let [otpValues, setOtpValues] = useState(new Array(OTP_NO_COUNT).fill(""));

  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleChange = (val, index) => {
    if (isNaN(val)) return;
    let newArr = [...otpValues];
    const newValue = val.trim();
    newArr[index] = newValue.slice(-1);

    setOtpValues(newArr);
    newValue && refArr.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  return (
    <div className="App">
      <h1>Enter your OTP</h1>
      {otpValues.map((value, index) => {
        return (
          <input
            className="otp-box"
            index={index}
            type="text"
            value={otpValues[index]}
            ref={(value) => (refArr.current[index] = value)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
}
