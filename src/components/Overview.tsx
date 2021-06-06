import React from "react";
import Modal from "./Utility/Modal";
import { ModelType, OverviewType } from "../store/types";

function Device({
  model,
  overview,

  closeModal,
}: {
  model: ModelType;
  overview: OverviewType[];
  closeModal: (data: Boolean) => void;
}) {
  return (
    <Modal
      closeModal={closeModal}
      title={`Overview of ${model.BrandId} ${model.Name}`}
    >
      {overview.length} data
      <hr />
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
    </Modal>
  );
}

export default Device;
