import React, { useState } from "react";
import TextInputElement from "./Utility/TextInputElement";
import TextareaElement from "./Utility/TextareaElement";
import Modal from "./Utility/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setNetworkRequest } from "../store/actions";
import { Store, DeviceTypeMap, ModelType } from "../store/types";
import axios from "../base_http_config";
import { AxiosResponse } from "axios";
import { message } from "../utility";

type FormError = {
  BrandId: boolean;
  Name: boolean;
  TypeId: boolean;
};

function Login({
  closeModal,
  attachModel,
}: {
  closeModal: (value: Boolean) => void;
  attachModel: (value: ModelType) => void;
}) {
  const dispatch = useDispatch();
  const loginError = useSelector((state: Store) => state.loginError);
  const makingNetworkRequest = useSelector(
    (state: Store) => state.makingNetworkRequest
  );
  const typesMap: DeviceTypeMap = useSelector((state: Store) => state.typesMap);
  const [BrandId, setBrandId] = useState("");
  const [Name, setName] = useState("");
  const [TypeId, setTypeId] = useState("");
  const [Comment, setComment] = useState("");

  const [formError, setFormError] = useState<FormError>({
    BrandId: false,
    Name: false,
    TypeId: false,
  });

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let allOk = true;
    if (BrandId === "") {
      setFormError((value) => {
        return {
          BrandId: true,
          Name: value.Name,
          TypeId: value.TypeId,
        };
      });

      allOk = false;
    }

    if (Name === "") {
      setFormError((value) => {
        return {
          BrandId: value.BrandId,
          Name: true,
          TypeId: value.TypeId,
        };
      });
      allOk = false;
    }

    if (TypeId === "") {
      setFormError((value) => {
        return {
          BrandId: value.BrandId,
          Name: value.Name,
          TypeId: true,
        };
      });
      allOk = false;
    }

    if (allOk) {
      dispatch(setNetworkRequest(true));

      setTimeout(() => {
        axios
          .post("devicemodel", {
            BrandId,
            Name,
            TypeId: Number(TypeId),
            Comment,
          })
          .then((response: AxiosResponse) => {
            dispatch(setNetworkRequest(false));
            const newData: ModelType = response.data as ModelType;
            attachModel(newData);
            message("New device model added");
            closeModal(false);
          })
          .catch((e) => {
            console.log(e);
          });
      }, 500);
    }
  };

  return (
    <Modal height={"450px"} title={"Add Device Model"} closeModal={closeModal}>
      <form onSubmit={handleLogin}>
        <TextInputElement
          className={formError.BrandId ? "error" : ""}
          value={BrandId}
          label="Brand ID"
          placeholder="BrandID"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setBrandId(event.target.value);
            setFormError({
              BrandId: false,
              Name: formError.Name,
              TypeId: formError.TypeId,
            });
          }}
        />
        <TextInputElement
          className={formError.Name ? "error" : ""}
          value={Name}
          label="Name"
          placeholder="Name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
            setFormError({
              BrandId: formError.BrandId,
              TypeId: formError.TypeId,
              Name: false,
            });
          }}
        />

        <div className="input-label">Device Type</div>
        <select
          className={formError.TypeId ? "input error" : "input"}
          value={TypeId}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setTypeId(event.target.value);
            setFormError({
              TypeId: false,
              BrandId: formError.BrandId,
              Name: formError.Name,
            });
          }}
        >
          <option value="">Select Device type</option>
          {Object.keys(typesMap).map((item: string) => (
            <option key={item} value={item}>
              {typesMap[Number(item)]}
            </option>
          ))}
        </select>

        <TextareaElement
          label="Comment"
          value={Comment}
          placeholder="Comment"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setComment(event.target.value);
          }}
        />

        <button
          disabled={makingNetworkRequest === true}
          type="submit"
          className="btn btn-full"
        >
          {makingNetworkRequest ? "Saving.." : "Save"}
        </button>
      </form>
    </Modal>
  );
}

export default Login;
