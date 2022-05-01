import poolsAbi from "@/utils/abi/borrowPoolsAbi/index";
import tokensAbi from "@/utils/abi/tokensAbi/index";
import swapAbi from "@/utils/abi/swap";
import reverseSwapAbi from "@/utils/abi/reverseSwap";
import joeInfoAbi from "@/utils/abi/joeInfo";

export default [
  {
    name: "AVAX",
    icon: require(`@/assets/images/tokens/AVAX.png`),
    contractChain: "0xa86a",
    id: 1,
    isDepreciated: false,
    isSwappersActive: true,
    acceptUseDefaultBalance: true,
    contract: {
      name: "CauldronV2Flat",
      address: "0x3cfed0439ab822530b1ffbd19536d897ef30d2a2",
      abi: poolsAbi.CauldronV2Flat,
    },
    token: {
      name: "WAVAX",
      decimals: 18,
      address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",

      abi: tokensAbi.WAVAX,
    },
    pairToken: {
      name: "MIM",
      decimals: 18,
      address: "0x130966628846BFd36ff31a822705796e8cb8C18D",
      abi: tokensAbi.MIM,
    },
    stabilityFee: 12.5,
    interest: 1,
    borrowFee: 0.5,
    ltv: 75,
    initialMax: 15,
    swapContractInfo: {
      address: "0x69BfEa0307A071C3e6CD217486B16d20bD58c7B1",
      abi: swapAbi,
    },
    reverseSwapContractInfo: {
      address: "0x2B727505fDF3650028C8dE0f5d73337Ba78f36A8",
      abi: reverseSwapAbi,
    },
  },
  {
    name: "wMEMO",
    icon: require(`@/assets/images/tokens/MEMO.png`),
    contractChain: "0xa86a",
    id: 2,
    isDepreciated: true,
    isSwappersActive: true,
    acceptUseDefaultBalance: false,
    contract: {
      name: "CauldronV2Multichain",
      address: "0x56984F04d2d04B2F63403f0EbeDD3487716bA49d",
      abi: poolsAbi.CauldronV2Multichain,
    },
    oracleAddress: "0xB099cC8Cd672646317c2da0414aEa7D3838eD258",
    token: {
      name: "wMEMO",
      decimals: 18,
      address: "0x0da67235dD5787D67955420C84ca1cEcd4E5Bb3b",
      abi: tokensAbi.wMEMO,
    },
    pairToken: {
      name: "MIM",
      decimals: 18,
      address: "0x130966628846BFd36ff31a822705796e8cb8C18D",
      abi: tokensAbi.MIM,
    },
    stabilityFee: 12.5,
    interest: 5.5,
    borrowFee: 1,
    ltv: 30,
    initialMax: 15,
    swapContractInfo: {
      address: "0x2Be431EE7E74b1CB7CfA16Fc90578EF42eF361B0",
      abi: swapAbi,
    },
    reverseSwapContractInfo: {
      address: "0xe788aBab092c165fAb7Ded7b7D2962abc808eE6C",
      abi: reverseSwapAbi,
    },
  },
  {
    name: "xJOE",
    icon: require(`@/assets/images/tokens/xJOE.png`),
    contractChain: "0xa86a",
    id: 3,
    isDepreciated: false,
    isSwappersActive: true,
    acceptUseDefaultBalance: false,
    strategyLink:
      "https://abracadabramoney.medium.com/our-xjoe-degenbox-strategy-79c4bf807b4a",

    isDegenBox: true,
    contract: {
      name: "CauldronV2Multichain",
      address: "0x3b63f81Ad1fc724E44330b4cf5b5B6e355AD964B",
      abi: poolsAbi.CauldronV2Multichain,
    },
    token: {
      name: "xJOE",
      decimals: 18,
      address: "0x57319d41F71E81F3c65F2a47CA4e001EbAFd4F33",

      abi: tokensAbi.xJOE,
    },
    pairToken: {
      name: "MIM",
      decimals: 18,
      address: "0x130966628846BFd36ff31a822705796e8cb8C18D",
      abi: tokensAbi.MIM,
    },
    stabilityFee: 5,
    interest: 3,
    borrowFee: 0.5,
    ltv: 75,
    initialMax: 15,
    swapContractInfo: {
      address: "0xc022abBa577E991edD6515E28f779Ed4D732B888",
      abi: swapAbi,
    },
    reverseSwapContractInfo: {
      address: "0x303A59A1020807B6FD78D3BB0e3c8B6a26Bbc0B9",
      abi: reverseSwapAbi,
    },
    joeInfo: {
      pid: 24,
      address: "0xd6a4F121CA35509aF06A0Be99093d08462f53052",
      abi: joeInfoAbi,
    },
  },
  {
    name: "AVAX/USDC.e JLP",
    icon: require(`@/assets/images/tokens/AVAX-USDC.png`),
    contractChain: "0xa86a",
    id: 4,
    isDepreciated: false,
    isSwappersActive: true,
    acceptUseDefaultBalance: false,
    strategyLink:
      "https://medium.com/@abracadabramoney/our-jlps-degenbox-strategy-f367fb951fe1",

    isDegenBox: true,
    contract: {
      name: "CauldronV2Multichain",
      address: "0x95cCe62C3eCD9A33090bBf8a9eAC50b699B54210",
      abi: poolsAbi.CauldronV2Multichain,
    },
    token: {
      name: "AVAX/USDC.e JLP",
      decimals: 18,
      address: "0xA389f9430876455C36478DeEa9769B7Ca4E3DDB1",

      abi: tokensAbi.JLP,
    },
    pairToken: {
      name: "MIM",
      decimals: 18,
      address: "0x130966628846BFd36ff31a822705796e8cb8C18D",
      abi: tokensAbi.MIM,
    },
    stabilityFee: 8,
    interest: 3,
    borrowFee: 0.5,
    ltv: 85,
    initialMax: 15,
    swapContractInfo: {
      address: "0x38a67c0F839e5F8939B12f9181A1924E4e4375eD",
      abi: swapAbi,
    },
    reverseSwapContractInfo: {
      address: "0x20CB52832F35C61CCdBe5c336e405FE979de9430",
      abi: reverseSwapAbi,
    },
    joeInfo: {
      pid: 39,
      address: "0xd6a4F121CA35509aF06A0Be99093d08462f53052",
      abi: joeInfoAbi,
    },
  },
  {
    name: "wMEMO",
    icon: require(`@/assets/images/tokens/MEMO.png`),
    contractChain: "0xa86a",
    id: 5,
    isDepreciated: true,
    isSwappersActive: true,
    acceptUseDefaultBalance: false,
    isDegenBox: false,
    contract: {
      name: "CauldronV2Multichain",
      address: "0x35fA7A723B3B39f15623Ff1Eb26D8701E7D6bB21",
      abi: poolsAbi.CauldronV2Multichain,
    },
    oracleAddress: "0xB099cC8Cd672646317c2da0414aEa7D3838eD258",
    token: {
      name: "wMEMO",
      decimals: 18,
      address: "0x0da67235dD5787D67955420C84ca1cEcd4E5Bb3b",
      abi: tokensAbi.wMEMO,
    },
    pairToken: {
      name: "MIM",
      decimals: 18,
      address: "0x130966628846BFd36ff31a822705796e8cb8C18D",
      abi: tokensAbi.MIM,
    },
    stabilityFee: 10,
    interest: 5,
    borrowFee: 1,
    ltv: 75,
    initialMax: 15,
    swapContractInfo: {
      address: "0x2Be431EE7E74b1CB7CfA16Fc90578EF42eF361B0",
      abi: swapAbi,
    },
    reverseSwapContractInfo: {
      address: "0xe788aBab092c165fAb7Ded7b7D2962abc808eE6C",
      abi: reverseSwapAbi,
    },
  },
  {
    name: "AVAX/USDT.e JLP",
    icon: require(`@/assets/images/tokens/AVAX-USDT.png`),
    contractChain: "0xa86a",
    id: 6,
    isDepreciated: false,
    isSwappersActive: true,
    acceptUseDefaultBalance: false,
    strategyLink:
      "https://medium.com/@abracadabramoney/our-jlps-degenbox-strategy-f367fb951fe1",

    isDegenBox: true,
    contract: {
      name: "CauldronV2Multichain",
      address: "0x0a1e6a80E93e62Bd0D3D3BFcF4c362C40FB1cF3D",
      abi: poolsAbi.CauldronV2Multichain,
    },
    token: {
      name: "AVAX/USDT.e JLP",
      decimals: 18,
      address: "0xeD8CBD9F0cE3C6986b22002F03c6475CEb7a6256",

      abi: tokensAbi.JLP,
    },
    pairToken: {
      name: "MIM",
      decimals: 18,
      address: "0x130966628846BFd36ff31a822705796e8cb8C18D",
      abi: tokensAbi.MIM,
    },
    stabilityFee: 8,
    interest: 3,
    borrowFee: 0.5,
    ltv: 85,
    initialMax: 15,
    swapContractInfo: {
      address: "0x8CEe5B335f450933b4720B5b84e6125d4225FB62",
      abi: swapAbi,
    },
    reverseSwapContractInfo: {
      address: "0x9Ca03FeBDE38c2C8A2E8F3d74E23a58192Ca921d",
      abi: reverseSwapAbi,
    },
    joeInfo: {
      pid: 28,
      address: "0xd6a4F121CA35509aF06A0Be99093d08462f53052",
      abi: joeInfoAbi,
    },
  },
  {
    name: "AVAX/MIM JLP",
    icon: require(`@/assets/images/tokens/MIM-AVAX.png`),
    contractChain: "0xa86a",
    id: 7,
    isDepreciated: false,
    isSwappersActive: true,
    acceptUseDefaultBalance: false,
    strategyLink:
      "https://medium.com/@abracadabramoney/our-jlps-degenbox-strategy-f367fb951fe1",

    isDegenBox: true,
    contract: {
      name: "CauldronV2Multichain",
      address: "0x2450Bf8e625e98e14884355205af6F97E3E68d07",
      abi: poolsAbi.CauldronV2Multichain,
    },
    token: {
      name: "AVAX/MIM JLP",
      decimals: 18,
      address: "0x781655d802670bbA3c89aeBaaEa59D3182fD755D",

      abi: tokensAbi.JLP,
    },
    pairToken: {
      name: "MIM",
      decimals: 18,
      address: "0x130966628846BFd36ff31a822705796e8cb8C18D",
      abi: tokensAbi.MIM,
    },
    stabilityFee: 8,
    interest: 1,
    borrowFee: 0.5,
    ltv: 85,
    initialMax: 15,
    swapContractInfo: {
      address: "0xBA7fd957ad9b7C0238E6E4413dbA69E83224a582",
      abi: swapAbi,
    },
    reverseSwapContractInfo: {
      address: "0xBc00ca0d71231c5E23Ba90A90D8C5D9039C39614",
      abi: reverseSwapAbi,
    },
    joeInfo: {
      pid: 43,
      address: "0xd6a4F121CA35509aF06A0Be99093d08462f53052",
      abi: joeInfoAbi,
    },
  },
  {
    name: "AVAX/MIM SLP",
    icon: require(`@/assets/images/tokens/MIM-AVAX.png`),
    contractChain: "0xa86a",
    id: 8,
    isDepreciated: false,
    isSwappersActive: false,
    acceptUseDefaultBalance: false,
    isDegenBox: true,
    contract: {
      name: "CauldronV2Multichain",
      address: "0xAcc6821d0F368b02d223158F8aDA4824dA9f28E3",
      abi: poolsAbi.CauldronV2Multichain,
    },
    token: {
      name: "AVAX/MIM SLP",
      decimals: 18,
      address: "0xcbb424fd93cdec0ef330d8a8c985e8b147f62339",
      abi: tokensAbi.SLP,
    },
    pairToken: {
      name: "MIM",
      decimals: 18,
      address: "0x130966628846BFd36ff31a822705796e8cb8C18D",
      abi: tokensAbi.MIM,
    },
    stabilityFee: 8,
    interest: 1,
    borrowFee: 0.5,
    ltv: 85,
    swapContractInfo: {
      address: "0xFDF2C2689c130B0686331C9ADa0E40Ec1A1A58d7",
      abi: swapAbi,
    },
    reverseSwapContractInfo: {
      address: "0xD7477321A84F3d39B8D742580F3740016658135D",
      abi: reverseSwapAbi,
    },
  },
];