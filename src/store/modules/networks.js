import { chains } from "@/helpers/chains";

export default {
  state: {
    networks: chains,
    chainId: null,
  },
  mutations: {
    setChainId(state, payload) {
      state.chainId = payload;
    },
  },
  getters: {
    getAvailableNetworks: (state) => state.networks,
    getChainId: (state) => state.chainId,
    getChainById: (state) => (chainId) => {
      return state.networks.find((chain) => chain.chainId === chainId);
    },
    getNotifiCardId: (state) => {
      switch (state.chainId) {
        case 1:
          return "eb0d573373194bbcbda52bda19221c71";
        case 43114:
          return "f2e2cf212b204257b056fa9fb550c354";
        case 56:
          return "4316dbeb5917458f98b7a4adca95f6a0";
        case 42161:
          return "b0049e6173a04727adb0e8ed13396fcf";
        default:
          return null;
      }
    },
    getNotifiWalletBlockchain: (state) => {
      switch (state.chainId) {
        case 1:
          return "ETHEREUM";
        case 43114:
          return "AVALANCHE";
        case 56:
          return "BINANCE";
        case 42161:
          return "ARBITRUM";
        default:
          return null;
      }
    },
  },
};
