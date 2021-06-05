import axios from "../base_http_config";
import React, { useState, useEffect } from "react";
import Device from "./Device";
import { ModelType } from "../store/types";

function DeviceContainer() {
  const [models, setModels] = useState<ModelType[] | []>([]);
  const fetchDevices = () => {
    axios.get("overview/modeltype").then((response) => {
      let data: Array<ModelType> = response.data;
      console.log(data);
      setModels(data);
    });
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div className="main-container">
      <div className="section-title full-width">Available Models</div>
      <div className="devices-container full-width">
        {models.map((model: ModelType) => (
          <Device model={model} key={`${model.Id}`} />
        ))}
      </div>
    </div>
  );
}

export default DeviceContainer;
