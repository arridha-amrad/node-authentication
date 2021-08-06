import React from "react";
import { LoaderOverlay, LoadersIcon } from "../../elements/loaders.el";
import LoadingIcon from "../../icons/35.svg";

const Loaders = () => {
  return (
    <>
      <LoaderOverlay>
        <LoadersIcon src={LoadingIcon} />
      </LoaderOverlay>
    </>
  );
};

export default Loaders;
