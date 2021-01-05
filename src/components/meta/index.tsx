import React from "react";
import { Helmet } from "react-helmet-async";

export const Meta = () => {
  return (
    <Helmet>
      <title>Algo Tracker</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Helmet>
  );
};
