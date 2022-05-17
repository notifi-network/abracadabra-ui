import { ethers } from "ethers";
import Web3Modal from "web3modal";

import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Torus from "@toruslabs/torus-embed";
// import Authereum from "authereum";
// import ethProvider from "eth-provider";

import store from "../../store";

// WALLETCONNECT
const walletconnect = {
  package: WalletConnectProvider,
  options: {
    rpc: {
      1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      56: "https://bsc-dataseed.binance.org/",
      250: "https://rpc.ftm.tools/",
      42161: "https://arb1.arbitrum.io/rpc",
      43114: "https://api.avax.network/ext/bc/C/rpc",
    },
  },
};

const coinbasewallet = {
  package: CoinbaseWalletSDK, // Required
  options: {
    appName: "abracadabra.money", // Required
    rpc: {
      1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      56: "https://bsc-dataseed.binance.org/",
      250: "https://rpc.ftm.tools/",
      42161: "https://arb1.arbitrum.io/rpc",
      43114: "https://api.avax.network/ext/bc/C/rpc",
    },
  },
};

const binancechainwallet = {
  package: true,
};

const torus = {
  package: Torus,
};

// const authereum = {
//   package: Authereum,
// };

// const frame = {
//   package: ethProvider,
// };

const providerOptions = {
  walletconnect,
  coinbasewallet,
  binancechainwallet,
  // portis,
  torus,
  // authereum,
  // frame,
};

const web3Modal = new Web3Modal({
  providerOptions,
  cacheProvider: true,
  disableInjectedProvider: false,
  theme: "dark",
  // network: "mainnet",
});

/**
 * Check chached provider and try to connect.
 * If provider exist => store into vuex
 */

const subscribeProvider = async (provider, isCoinbase) => {
  if (!provider.on) {
    return;
  }

  provider.on("close", () => alert("close"));
  provider.on("accountsChanged", async (account) => {
    if (Array.isArray(account) && !account.length) await resetApp();
    window.location.reload();
  });

  if (!isCoinbase) {
    provider.on("chainChanged", () => window.location.reload());
    provider.on("networkChanged", () => window.location.reload());
  }

  provider.on("disconnect", async () => {
    await resetApp();
  });
};

const initWithoutConnect = async () => {
  const chainId = +(localStorage.getItem("MAGIC_MONEY_CHAIN_ID") || 1);
  const provider = new ethers.providers.JsonRpcProvider(
    walletconnect.options.rpc[chainId]
  );

  store.commit("setChainId", chainId);
  store.commit("setProvider", provider);
  store.commit("setAccount", null);

  store.commit("SET_WALLET_CHECK_IN_PROCCESS", false);
  store.commit("setWalletConnection", true);
};

const onConnect = async () => {
  try {
    const instance = await web3Modal.connect();

    await instance.enable();

    console.log("instance", instance);

    const isCoinbase = instance.isCoinbaseWallet;
    const isMetaMask = instance.isMetaMask;

    await subscribeProvider(instance, isCoinbase);

    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();

    const accounts = await signer.getAddress();

    const address = Array.isArray(accounts) ? accounts[0] : accounts;
    const chainId = await signer.getChainId();

    console.log("address", address);
    console.log("provider", provider);
    console.log("chainId", chainId);

    store.commit("setChainId", chainId);
    store.commit("setProvider", provider);
    store.commit("setSigner", signer);
    store.commit("setAccount", address);
    store.dispatch("checkENSName", address);
    store.commit("setWalletConnection", true);
    store.commit("setIsCoinbase", isCoinbase);
    store.commit("setMetamaskActive", isMetaMask);
  } catch (error) {
    console.log("Connection error: ", error);
  }
};

const resetApp = async () => {
  await web3Modal.clearCachedProvider();
  window.location.reload();
};

if (web3Modal.cachedProvider) {
  onConnect();
} else initWithoutConnect();

store.commit("SET_WALLET_CHECK_IN_PROCCESS", false);

export default {
  async install(Vue) {
    Vue.prototype.$connectWallet = async () => {
      await web3Modal.clearCachedProvider();
      await onConnect();
    };

    Vue.prototype.$disconnectWallet = async () => {
      await resetApp();
    };
  },
};
