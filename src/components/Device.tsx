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
      <p>
        <strong>Name</strong> {model.Name}
      </p>
      <p>
        <strong>Brand</strong> {model.BrandId ?? <small>Not Available</small>}
      </p>
      <p>
        <strong>Type</strong>{" "}
        {typesMap[model.TypeId] ?? <small>Not Available</small>}
      </p>
    </div>
  );
}

export default Device;
