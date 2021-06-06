import React from "react";
import Modal from "./Utility/Modal";
import { ModelType, OverviewType } from "../store/types";

function Device({
  model,
  overview,
  closeModal,
}: //fetchModelOverview,
{
  model: ModelType;
  overview: OverviewType[];
  closeModal: (data: Boolean) => void;
}) {
  // const typesMap: DeviceTypeMap = useSelector((state: Store) => state.typesMap);

  return (
    <Modal
      closeModal={closeModal}
      title={`Overview of ${model.BrandId} ${model.Name}`}
    >
      {overview.length} data
    </Modal>
  );
}

export default Device;
