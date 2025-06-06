import { mainnet } from "@wagmi/core/chains";
import { MAINNET_CHAIN_ID } from "@/constants/global";
import { chainsConfigs } from "@/helpers/chains/configs";
import { initStaticJsonRpcProvider } from "@/helpers/connect/initStaticJsonRpcProvider";

export const getPublicClient = (chainId: number): any => {
  return chainsConfigs.find((chain) => chain.viemConfig.id === Number(chainId))
    ?.publicClient;
};

export const getChainConfig = (chainId: number) => {
  return chainsConfigs.find((chain) => chain.viemConfig.id === Number(chainId));
};

export const getEthersProvider = (chainId = MAINNET_CHAIN_ID): any => {
  return initStaticJsonRpcProvider(chainId);
};

export const getViemConfigById = (chainId: number) => {
  const chain = chainsConfigs.find(
    (chain) => chain.chainId === Number(chainId)
  );
  if (chain) return chain.viemConfig;
  return mainnet;
};
