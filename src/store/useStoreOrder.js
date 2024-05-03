import {create} from "zustand";

const useStoreOrder = create((set) => ({
  sortOrder: "cart",
  setSortOrder: (order) => set({ sortOrder: order }),
}));

export default useStoreOrder;
