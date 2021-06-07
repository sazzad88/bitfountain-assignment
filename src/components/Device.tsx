import React from "react";

import { ModelType, DeviceTypeMap } from "../store/types";

function Device({
  model,
  typesMap,
  fetchModelOverview,
}: {
  model: ModelType;
  typesMap: DeviceTypeMap;
  fetchModelOverview: (device: ModelType) => void;
}) {
  return (
    <div className="device-item" onClick={() => fetchModelOverview(model)}>
      <p className="brand-name">{model.Name}</p>
      <p>Brand : {model.BrandId ?? <small>Not Available</small>}</p>
      <p>Type : {typesMap[model.TypeId] ?? <small>Not Available</small>}</p>
    </div>
  );
}

export default Device;
