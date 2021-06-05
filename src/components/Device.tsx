import React, { useState, useEffect } from "react";
import { ModelType } from "../store/types";

function Device({ model }: { model: ModelType }) {
  return <div className="device-item">{model.Name}</div>;
}

export default Device;
