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
      {overview.length} data
      {!makingNetworkRequest && overview.length === 0 ? (
        <Empty message={`No data found`} />
      ) : null}
      {makingNetworkRequest ? (
        <ProgressIndicator message={"Loading..."} />
      ) : (
        <div className="overview-container">
          {overview.map((item: OverviewType) => (
            <div className="overview-item" key={item.Id}>
              <p>
                <strong>Name</strong> {item.DisplayName}
              </p>
              <p>
                <strong>Description</strong>{" "}
                {item.Description ?? <small>Not Available</small>}
              </p>
              <p>
                <strong>Status</strong>{" "}
                {item.Status ?? <small>Not Available</small>}
              </p>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

export default Device;
