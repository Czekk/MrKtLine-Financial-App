import React, {useContext} from "react";
import ControlContext from "./ControlContext";

const useControl = () => {
    return useContext(ControlContext);
};

export default useControl;