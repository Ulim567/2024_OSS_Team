import { create } from "zustand";
import axios from "axios";

var KEY = "06b2240508d148a6b6c6";

const useMenu = create((set, get) => ({
  menuNamesForSearch: [],
  menus: [],
  targetMenu: null,

  setMenus: (newData) => set({ menus: newData }),

  getMenusByIndex: async (from, to) => {
    try {
      if (from < 0) from = 0; // 최소 값 보정
      if (to > 1136) to = 1136; // 최대 값 보정

      const maxFetch = 1000;
      const firstTo = Math.min(from + maxFetch - 1, to);

      const response1 = await axios.get(
        `http://openapi.foodsafetykorea.go.kr/api/${KEY}/COOKRCP01/json/${from}/${firstTo}`
      );
      const firstBatch = response1.data.COOKRCP01.row;

      let secondBatch = [];
      if (firstTo < to) {
        const response2 = await axios.get(
          `http://openapi.foodsafetykorea.go.kr/api/${KEY}/COOKRCP01/json/${
            firstTo + 1
          }/${to}`
        );
        secondBatch = response2.data.COOKRCP01.row;
      }

      let combinedMenus = [...firstBatch, ...secondBatch];
      set({ menus: combinedMenus });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  getMenusByName: async (keyword) => {
    try {
      const response1 = await axios.get(
        `http://openapi.foodsafetykorea.go.kr/api/${KEY}/COOKRCP01/json/0/999/RCP_NM="${keyword}"`
      );

      let firstBatch = response1.data.COOKRCP01.row;
      if (firstBatch == null) firstBatch = [];

      const response2 = await axios.get(
        `http://openapi.foodsafetykorea.go.kr/api/${KEY}/COOKRCP01/json/1000/1136/RCP_NM="${keyword}"`
      );

      let secondBatch = response2.data.COOKRCP01.row;
      if (secondBatch == null) secondBatch = [];

      let combinedMenus = [...firstBatch, ...secondBatch];
      set({ menus: combinedMenus });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useMenu;
