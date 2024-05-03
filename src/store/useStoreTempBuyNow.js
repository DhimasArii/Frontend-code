import {create} from "zustand";

const useStoreTempBuyNow = create((set) => ({
    buyNowData: {
        user_id: null,
        schedule_id: null,
        id_payment_method: null,
      },
      setBuyNowData: (data) => set({ buyNowData: data }),
}));

export default useStoreTempBuyNow;
