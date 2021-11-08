import React, { useState } from "react";

export function createFlight() {
  return (
    <>
      <label>
        Name:
        <input type="text" />
      </label>
      <input type="submit" value="Submit" />
    </>
  );
}