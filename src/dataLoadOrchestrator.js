import React, { useState, useEffect, useImperativeHandle } from "react";

export default React.forwardRef(function Orchestrator(
  { handler, components },
  ref
) {
  const [state, setState] = useState("loading");
  const [response, setResponse] = useState(null);

  const load = async (args = {}) => {
    setState("loading");
    let response = await handler(args);
    setResponse(response);
    setState(response.state);
  };

  useEffect(() => {
    load();
  }, []);

  const StateComponent = components[state];

  useImperativeHandle(ref, () => {
    return {
      reload: (args = {}) => {
        load(args);
      },
    };
  });

  return <StateComponent response={response} reload={(args) => load(args)} />;
});
