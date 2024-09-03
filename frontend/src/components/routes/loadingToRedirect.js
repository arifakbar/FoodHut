import React, { useState, useEffect } from "react";
import { Spin } from "antd";

import history from "../../history";

function LoadingToRedirect() {
  const [time, setTime] = useState(3);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime((currentTime) => --currentTime);
    }, 1000);
    if (time <= 0) {
      history.push("/login");
    }
    return () => clearTimeout(timer);
  }, [time]);
  return (
    <div className="container">
      <div className="center-spinner d-flex flex-column align-itmes-center">
        <p>Redirecting you in {time} seconds.</p>
        <Spin size="large" />
      </div>
    </div>
  );
}

export default LoadingToRedirect;
