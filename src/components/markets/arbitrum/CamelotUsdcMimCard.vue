<template>
  <div class="camelot-card-background">
    <a
      class="camelot-card"
      href="https://app.camelot.exchange/liquidity/?type=v3&token1=0xaf88d065e77c8cc2239327c5edb3a432268e5831&token2=0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a"
      target="_blank"
      rel="noreferrer noopener"
    >
      <p class="primary paragraph">
        <span class="card-title">Stable V3 Pool</span>
        <span class="on-camelot">ON CAMELOT</span>
        <span class="token-pair">USDC / MIM</span>
      </p>
      <ul class="secondary paragraph" v-if="tvl && aprRange">
        <li>
          <span class="title">TVL:</span>
          <span class="value">${{ formattedTvl }}</span>
        </li>
        <li>
          <span class="title">APR:</span>
          <span class="value">{{ aprRange }}</span>
        </li>
      </ul>
    </a>
  </div>
</template>
<script>
import axios from "axios";
import filters from "@/filters/index";

export default {
  data() {
    return {
      tvl: null,
      aprRange: null,
    };
  },

  computed: {
    formattedTvl() {
      return filters.formatLargeSum(this.tvl);
    },
  },

  methods: {
    async fetchData() {
      const camelotPool = "0x0e7AC13617Cc1A289B222E4602BdAaA53ea4dc61";
      const arbChainId = 42161;

      const poolsInfo = await axios.get(
        "https://api.angle.money/v2/merkl?chainIds[]=42161"
      );
      const liquidityV3Data = await axios.get(
        "https://api.camelot.exchange/v2/liquidity-v3-data"
      );

      const { tvl, meanAPR } = poolsInfo.data[arbChainId].pools[camelotPool];

      const { activeTvlAverageAPR } =
        liquidityV3Data.data.data.pools[camelotPool];

      this.tvl = tvl;
      this.aprRange = filters.formatPercent(meanAPR + activeTvlAverageAPR);
    },
  },

  created() {
    this.fetchData();
  },
};
</script>
<style lang="scss" scoped>
.camelot-card-background {
  background: linear-gradient(146deg, #1a0604 0%, #000 101.49%);
  border-radius: 16px;
}

.camelot-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 20px 11px 20px;
  height: 201px;
  width: 302px;
  background-image: url("@/assets/images/camelot/background-usdc-mim.png");
  border-radius: 16px;
  border: 1px solid #2d4a96;
  box-shadow: 0px 4px 32px 0px rgba(103, 103, 103, 0.06);
  background-position: 50% 50%;
  background-size: 100%;
  background-repeat: no-repeat;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  transition: 0.3s;
}

.camelot-card:hover {
  border: 1px solid #526fbc;
  box-shadow: 0px 4px 32px 0px rgba(103, 103, 103, 0.06),
    0px 4px 32px 0px rgba(103, 103, 103, 0.21);
}

.primary {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.card-title {
  font-size: 24px;
}

.on-camelot {
  color: #ffbc01;
  font-size: 20px;
}

.token-pair {
  font-size: 13px;
  line-height: normal;
}

.secondary {
  display: flex;
  flex-direction: column;
  gap: 6px;
  list-style: none;
}

.title {
  font-size: 16px;
  font-weight: 500;
}

.value {
  margin-left: 5px;
  color: #ffbc01;
  font-size: 16px;
}
</style>
