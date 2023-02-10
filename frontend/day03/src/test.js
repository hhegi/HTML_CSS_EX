import React, { useState, useEffect } from "react";

function test(props) {
  const [state, setState] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  return <>ReactJS Starter Template by Varun Bardwaj</>;
}

export default test;
