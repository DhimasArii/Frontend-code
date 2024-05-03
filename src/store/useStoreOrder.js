import {create} from "zustand";

const useStoreOrder = create((set) => ({
  sortOrder: "asc",
  setSortOrder: (order) => set({ sortOrder: order }),
}));

export default useStoreOrder;
