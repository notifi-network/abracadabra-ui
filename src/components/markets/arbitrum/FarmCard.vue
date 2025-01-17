<template>
  <router-link :to="goToPage" class="farm-card">
    <div class="card-header">
      <div class="farm-icon-name">
        <BaseTokenIcon :name="farm.name" :icon="farm.icon" />
        <span class="farm-card-name">{{ farm.name }}</span>
      </div>
      <img
        class="chain-icon"
        src="@/assets/images/networks/arbitrum-chain.svg"
      />
    </div>
    <div class="card-stats">
      <div class="boosted-yield">
        <p class="title">
          <AprTooltip v-if="showAprTooltip" :farm="farm" />
          {{ aprTitle }}
        </p>
        <p class="value">{{ apr }}</p>
      </div>

      <p class="tvl">
        <span class="title">tvl</span> <span class="value">{{ tvl }}</span>
      </p>
    </div>
  </router-link>
</template>
<script>
import BaseTokenIcon from "@/components/base/BaseTokenIcon.vue";
import AprTooltip from "@/components/markets/arbitrum/AprTooltip.vue";
import filters from "@/filters/index";

export default {
  props: {
    farm: {
      type: Object,
    },
  },

  computed: {
    showAprTooltip() {
      return this.farm.isMultiReward;
    },
    aprTitle() {
      return this.farm.isMultiReward ? "Boosted Yield" : "APR";
    },
    tvl() {
      return filters.formatUSD(this.farm.farmTvl);
    },

    apr() {
      return filters.formatPercent(this.farm.farmRoi);
    },

    goToPage() {
      return { name: "Farm", params: { id: this.farm.id } };
    },
  },

  components: {
    BaseTokenIcon,
    AprTooltip,
  },
};
</script>
<style lang="scss" scoped>
.farm-card {
  height: 201px;
  width: 302px;
  border-radius: 16px;
  border: 1px solid #4666b9;
  background: linear-gradient(
    146deg,
    rgba(0, 10, 35, 0.07) 0%,
    rgba(0, 80, 156, 0.07) 101.49%
  );

  box-shadow: 0px 0px 43.7px 0px rgba(113, 91, 208, 0.78),
    0px 4px 17.9px 0px #4651ab inset;
  backdrop-filter: blur(12.5px);
  color: white;
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid #5c7ed6;
    box-shadow: 0px 0px 43.7px 0px rgba(113, 91, 208, 0.82),
      0px 4px 17.9px 0px #4651ab inset;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  border-radius: 16px 16px 0px 0px;
  background: linear-gradient(90deg, #2d4a96 0%, #745cd2 100%);
}

.farm-icon-name {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.chain-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 6.5px;
}

.card-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100%;
  gap: 12px;
  padding: 18px 31px 0px 31px;
}

.boosted-yield .title {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  gap: 3px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

.tooltip {
  width: 16px;
}

.boosted-yield .value {
  color: #67a069;
  text-align: center;
  font-size: 39px;
  font-weight: 600;
}

.tvl {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 8px;
  padding: 16px 11px 0 11px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
}
</style>
