import axios from "../base_http_config";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Device from "./Device";
import Overview from "./Overview";
import { fetchDeviceTypes } from "../store/actions";
import { ModelType, DeviceTypeMap, Store, OverviewType } from "../store/types";
import { AxiosResponse } from "axios";

function DeviceContainer() {
  const dispatch = useDispatch();
  const typesMap: DeviceTypeMap = useSelector((state: Store) => state.typesMap);
  const [models, setModels] = useState<ModelType[] | []>([]);
  const [overview, setOverview] = useState<OverviewType[] | []>([]);
  const [showOverviewModal, setShowModal] = useState<Boolean>(false);
  const [selectedModel, setSelectedModel] = useState<ModelType>({
    Id: 1,
    BrandId: "",
    Name: "",
    TypeId: 1,
    Comment: null,
    Description: null,
  });

  const fetchModelOverview = (device: ModelType) => {
    setShowModal(true);
    setSelectedModel(device);
    axios
      .get(`overview/modeldata/${device.BrandId}/${device.Name}`)
      .then((response: AxiosResponse) => {
        console.log(response.data);

        let data: Array<OverviewType> = response.data;
        setOverview(data);
      });
  };

  const fetchTypes = () => {
    dispatch(fetchDeviceTypes(axios));
  };
  const fetchDevices = () => {
    axios.get("overview/modeltype").then((response: AxiosResponse) => {
      let data: Array<ModelType> = response.data;
      setModels(data);
    });
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    console.log("fetch me");
    fetchDevices();
  }, []);

  return (
    <div className="main-container">
      <div className="section-title full-width">Available Models</div>

      <div className="devices-container full-width">
        {models.map((model: ModelType) => (
          <Device
            model={model}
            fetchModelOverview={fetchModelOverview}
            typesMap={typesMap}
            key={`${model.Id}`}
          />
        ))}
      </div>

      {showOverviewModal ? (
        <Overview
          model={selectedModel}
          overview={overview}
          closeModal={setShowModal}
        />
      ) : null}
    </div>
  );
}

export default DeviceContainer;
