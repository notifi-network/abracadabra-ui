<template>
  <router-link
    :class="['pools-table-link', poolLabel, { open: isOpenPosition }]"
    :to="goToPage"
    exact
  >
    <div class="label">{{ poolLabel }}</div>
    <div class="column">
      <TokenPair :pool="pool" chainIcon isLabal />
    </div>

    <div class="column">${{ tvl }}</div>

    <div class="column">{{ feeTier }}</div>

    <div class="column pool-type">{{ poolType }}</div>

    <div class="column apr">
      <ElixirRewardTag
        :icon="true"
        :multiplier="true"
        v-if="multiplierLabel === RewardPointsTypes.Elixir"
      />
      <div class="token-icons" v-else>
        <BaseTokenIcon
          v-for="(token, index) in rewardTokens"
          :icon="token.icon"
          :name="token.name"
          :size="index === 0 ? '20px' : '24px'"
          :key="index"
        />
      </div>
      <span class="apr-value" v-if="!multiplierLabel"> {{ poolApr }}</span>
    </div>
  </router-link>
</template>

<script lang="ts">
import { formatUnits } from "viem";
import { formatLargeSum, formatPercent } from "@/helpers/filters";
import { BERA_BARTIO_CHAIN_ID } from "@/constants/global";
import type { MagicLPInfo } from "@/helpers/pools/swap/types";
import { defineAsyncComponent, type PropType } from "vue";
import {
  FEE_TIER_DECIMALS,
  PoolTypes,
  STANDARD_K_VALUE,
} from "@/constants/pools/poolCreation";
import { RewardPointsTypes } from "@/configs/pools/types";

export default {
  props: {
    pool: {
      type: Object as PropType<MagicLPInfo>,
      required: true,
    },
  },

  data() {
    return {
      RewardPointsTypes,
    };
  },

  computed: {
    rewardTokens() {
      return this.pool.config.rewardTokens;
    },

    tvl() {
      const formattedTotalSupply = Number(
        formatUnits(this.pool.totalSupply, this.decimals)
      );
      const tvlInUsd = formattedTotalSupply * (this.pool.price || 1);
      return formatLargeSum(tvlInUsd);
    },

    feeTier() {
      return formatPercent(
        formatUnits(this.pool.initialParameters.lpFeeRate, FEE_TIER_DECIMALS)
      );
    },

    poolType() {
      return this.pool.initialParameters.K === STANDARD_K_VALUE
        ? PoolTypes.Standard
        : PoolTypes.Pegged;
    },

    poolApr() {
      if (!this.pool.poolAPR) return "";
      return formatPercent(this.pool.poolAPR?.totalApr || 0);
    },

    decimals() {
      return this.pool.decimals;
    },

    isOpenPosition() {
      return this.pool.userInfo.balance > 0n;
    },

    poolLabel() {
      if (this.pool.chainId === BERA_BARTIO_CHAIN_ID) return "testnet";
      if (this.pool.settings?.isNew) return "new";
      if (this.pool.settings?.isDeprecated) return "deprecated";
      return "";
    },

    multiplierLabel() {
      return this.pool.config.settings.rewardPointsType;
    },

    goToPage() {
      return {
        name: "Pool",
        params: {
          poolChainId: this.pool.chainId,
          id: this.pool.id,
        },
      };
    },
  },

  components: {
    BaseTokenIcon: defineAsyncComponent(
      () => import("@/components/base/BaseTokenIcon.vue")
    ),
    TokenPair: defineAsyncComponent(
      () => import("@/components/pools/pool/TokenPair.vue")
    ),
    ElixirRewardTag: defineAsyncComponent(
      () => import("@/components/pools/rewardPoints/elixir/ElixirRewardTag.vue")
    ),
  },
};
</script>

<style lang="scss" scoped>
.pools-table-link {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 1155px;
  border-radius: 16px;
  border: 1px solid rgba(180, 180, 180, 0.08);
  background: rgba(8, 14, 31, 0.6);
  color: #fff;
  padding: 20px 32px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.01);
    border-radius: 16px;
    box-shadow: 0px 4px 32px 0px rgba(103, 103, 103, 0.16);
    border-radius: 16px;
  }
}

.new {
  border: 1px solid #304d99;

  .label {
    display: block;
    background: linear-gradient(0deg, #2d4a96 0%, #5b7cd1 100%);
  }
}

.testnet {
  border: 1px solid #af6900;

  .label {
    display: block;
    background: linear-gradient(0deg, #af6900 100%, #e9984d 100%);
  }
}

.deprecated {
  border: 1px solid #4a2130;

  .label {
    display: block;
    background: linear-gradient(180deg, #8c4040 0%, #6b2424 100%);
  }
}

.open {
  background: url("@/assets/images/cauldrons/table-item-background.png");
}

.label {
  display: none;
  position: absolute;
  text-align: center;
  top: 50%;
  left: -43px;
  width: 100px;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  transform: translateY(-50%) rotate(-90deg);
  background: linear-gradient(180deg, #67a069 0%, #446a46 100%);

  &::first-letter {
    text-transform: uppercase;
  }
}

.column {
  max-width: 180px;
  width: 100%;
  text-align: center;
}

.token-pair {
  gap: 4px;
}

.token-pair::v-deep(.name) {
  font-size: 16px !important;
  font-weight: 400 !important;
}

.pool-type {
  text-transform: capitalize;
}

.token-icons {
  display: flex;
  align-items: center;
}

.token-icon:not(:first-child) {
  margin-left: -6px;
  border: 2px solid #0a1021;
  border-radius: 8px;
}

.token-icon {
  margin-right: 0 !important;
}

.apr {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.apr-value {
  text-shadow: 0px 0px 16px #ab5de8;
  font-weight: 600;
  line-height: 150%;
}

@media screen and (max-width: 1024px) {
  .pools-table-link {
    width: 930px;
  }
}
</style>
