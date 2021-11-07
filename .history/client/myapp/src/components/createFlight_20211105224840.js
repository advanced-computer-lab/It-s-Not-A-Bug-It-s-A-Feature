import React, { useState } from "react";

export function createFlight() {
  return (
    <>
    <h1>create Flight</h1>
      <label>
        Name:
        <input type="text" />
      </label>
      <input type="submit" value="Submit" />
    </>
  );
}