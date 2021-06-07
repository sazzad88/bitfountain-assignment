import axios from "../base_http_config";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Device from "./Device";
import Overview from "./Overview";
import ProgressIndicator from "./Utility/ProgressIndicator";
import TextInputElement from "./Utility/TextInputElement";
import { fetchDeviceTypes, setNetworkRequest } from "../store/actions";
import { ModelType, DeviceTypeMap, Store, OverviewType } from "../store/types";
import { AxiosResponse } from "axios";

function DeviceContainer() {
  const dispatch = useDispatch();
  const typesMap: DeviceTypeMap = useSelector((state: Store) => state.typesMap);
  const [fetchingDevices, setfetchingDevices] = useState<Boolean>(false);
  const [keyFilter, setFilterkey] = useState<string>("");
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
    dispatch(setNetworkRequest(true));
    setShowModal(true);
    setSelectedModel(device);
    axios
      .get(`overview/modeldata/${device.BrandId}/${device.Name}`)
      .then((response: AxiosResponse) => {
        dispatch(setNetworkRequest(false));
        let data: Array<OverviewType> = response.data;
        setOverview(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchTypes = () => {
    dispatch(fetchDeviceTypes(axios));
  };
  const fetchDevices = () => {
    axios
      .get("overview/modeltype")
      .then((response: AxiosResponse) => {
        let data: Array<ModelType> = response.data;
        setfetchingDevices(false);
        setModels(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    setfetchingDevices(true);
    fetchTypes();
    fetchDevices();
  }, []);

  return (
    <div className="main-container">
      <div className="section-title full-width">
        <div className="title">
          <div>Available Models</div>
          <div className="filter-container">
            <TextInputElement
              value={keyFilter}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFilterkey(event.target.value);
              }}
              placeholder={"Search name,brand..."}
            />
          </div>
        </div>
        <div className="add-button-container">
          <button className="btn">Add Device Model</button>
        </div>
      </div>

      <div className="devices-container full-width">
        {models
          .filter((model: ModelType) => {
            if (keyFilter.trim().length > 0) {
              return (
                model.BrandId?.toLowerCase().indexOf(
                  keyFilter.toLowerCase().trim()
                ) !== -1 ||
                model.Name?.toLowerCase().indexOf(
                  keyFilter.toLowerCase().trim()
                ) !== -1
              );
            }
            return true;
          })
          .map((model: ModelType) => (
            <Device
              model={model}
              fetchModelOverview={fetchModelOverview}
              typesMap={typesMap}
              key={`${model.Id}`}
            />
          ))}
        {fetchingDevices ? (
          <div style={{ minHeight: "500px", width: "100%" }}>
            <ProgressIndicator message={"Fetching Devices....."} />
          </div>
        ) : null}
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
