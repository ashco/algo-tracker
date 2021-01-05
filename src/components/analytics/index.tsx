import React from "react";
import { DataStore } from "aws-amplify";

function Analytics() {
  async function clearDataStore() {
    try {
      await DataStore.clear();
      console.log("DataStore Cleared!");
    } catch (err) {
      console.log("Error clearing datastore", err);
    }
  }

  return (
    <div>
      <h1>Analytics</h1>
      <button onClick={clearDataStore}>Clear DataStore</button>
    </div>
  );
}

export default Analytics;
