import { RootState } from "@/redux/store";
import { TypedUseSelectorHook, useSelector as useDefaultSelector  } from "react-redux";

const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;

export default useSelector;