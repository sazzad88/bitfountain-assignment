import React from "react";
import Modal from "./Utility/Modal";
import ProgressIndicator from "./Utility/ProgressIndicator";
import Empty from "./Utility/Empty";
import { ModelType, OverviewType, Store } from "../store/types";
import { useSelector } from "react-redux";

function Device({
  model,
  overview,
  closeModal,
}: {
  model: ModelType;
  overview: OverviewType[];
  closeModal: (data: Boolean) => void;
}) {
  const makingNetworkRequest = useSelector(
    (state: Store) => state.makingNetworkRequest
  );

  return (
    <Modal
      closeModal={closeModal}
      title={`Overview of ${model.BrandId} ${model.Name}`}
    >
      {!makingNetworkRequest && overview.length === 0 ? (
        <Empty message={`No data found`} />
      ) : null}
      {makingNetworkRequest ? (
        <ProgressIndicator message={"Loading..."} />
      ) : (
        <div className="overview-container">
          {overview.map((item: OverviewType) => (
            <div className="overview-item" key={item.Id}>
              <p className="target">{item.DisplayName}</p>

              <p>Status : {item.Status ?? <small>Not Available</small>}</p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

export default Device;
