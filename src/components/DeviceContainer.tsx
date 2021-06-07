import axios from "../base_http_config";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Device from "./Device";
import Overview from "./Overview";
import AddDeviceModel from "./AddDeviceModel";
import ProgressIndicator from "./Utility/ProgressIndicator";
import TextInputElement from "./Utility/TextInputElement";
import { fetchDeviceTypes, setNetworkRequest } from "../store/actions";
import { ModelType, DeviceTypeMap, Store, OverviewType } from "../store/types";
import { AxiosResponse } from "axios";
import { message } from "../utility";

function DeviceContainer() {
  const dispatch = useDispatch();
  const typesMap: DeviceTypeMap = useSelector((state: Store) => state.typesMap);
  const [fetchingDevices, setfetchingDevices] = useState<Boolean>(false);
  const [keyFilter, setFilterkey] = useState<string>("");
  const [typeFilter, setTypeFilterkey] = useState<string>("");
  const [models, setModels] = useState<ModelType[] | []>([]);
  const [overview, setOverview] = useState<OverviewType[] | []>([]);
  const [showOverviewModal, setOverviewModal] = useState<Boolean>(false);
  const [showAddDeviceModal, setAddDeviceModal] = useState<Boolean>(false);
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
    setOverviewModal(true);
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

  const attachModel = (model: ModelType) => {
    const currentModels = [...models];

    currentModels.push(model);

    setModels(currentModels);

    message("New Model Added");
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
            <select
              className="input"
              value={typeFilter}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setTypeFilterkey(event.target.value);
              }}
            >
              <option value="">All Device type</option>
              {Object.keys(typesMap).map((item: string) => (
                <option key={item} value={item}>
                  {typesMap[Number(item)]}
                </option>
              ))}
            </select>
            <TextInputElement
              className="rounded"
              value={keyFilter}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFilterkey(event.target.value);
              }}
              placeholder={"Search name,brand..."}
            />
          </div>
        </div>
        <div className="add-button-container">
          <button
            className="btn"
            onClick={() => {
              setAddDeviceModal(true);
            }}
          >
            Add Device Model
          </button>
        </div>
      </div>

      <div className="devices-container full-width">
        {models
          .filter((model: ModelType) => {
            let passInKey = true,
              passInType = true;
            if (keyFilter.trim().length > 0) {
              passInKey =
                model.BrandId?.toLowerCase().indexOf(
                  keyFilter.toLowerCase().trim()
                ) !== -1 ||
                model.Name?.toLowerCase().indexOf(
                  keyFilter.toLowerCase().trim()
                ) !== -1;
            }

            if (typeFilter !== "")
              passInType = Number(model.TypeId) === Number(typeFilter);
            return passInKey && passInType;
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
          closeModal={setOverviewModal}
        />
      ) : null}

      {showAddDeviceModal ? (
        <AddDeviceModel
          attachModel={attachModel}
          closeModal={setAddDeviceModal}
        />
      ) : null}
    </div>
  );
}

export default DeviceContainer;
