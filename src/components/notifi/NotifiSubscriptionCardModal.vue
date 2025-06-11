<template>
  <div
    class="notifi-card-overlay"
    v-if="isOpenNotifiModal && !!account"
    @click="toggleNotifiModal"
  ></div>
  <div class="notifi-modal-container">
    <div class="notifi-card">
      <Context
        tenantId="4zfoga0vjqh90ahg8apd"
        env="Production"
        :walletPublicKey="account ?? '0x'"
        :walletBlockchain="notifiWalletBlockchain ?? 'ETHEREUM'"
        :signMessage="signMessage"
        cardId="90f9ac3f674a4a79955204afc1142a39"
        :toggleTargetAvailability="{ wallet: isCoinBase ? true : false }"
        :inputs="{ userWallet: [{ label: '', value: walletPublicKey }] }"
      >
        <div @click="getWalletConnection">
          
        </div>
        <Card v-if="isOpenNotifiModal && !!account" :darkMode="true" />
      </Context>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  NotifiContextProvider,
  NotifiCardModal,
} from "@notifi-network/notifi-react";
import { applyReactInVue, applyPureReactInVue } from "veaury";

export default {
  props: {
    isOpenNotifiModal: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["toggleNotifiModal"],
  mounted() {
    console.log("NotifiSubscriptionCardModal mounted");
  },
  computed: {
    ...mapGetters({
      account: "getAccount",
      notifiCardId: "getNotifiCardId",
      notifiWalletBlockchain: "getNotifiWalletBlockchain",
      signMessage: "getNotifiSignMessage",
      walletConnection: "getWalletIsConnected",
      wagmiConfig: "getWagmiConfig",
    }),
  },
  methods: {
    toggleNotifiModal() {
      this.$emit("toggleNotifiModal");
    },
  },
  components: {
    Card: applyPureReactInVue(NotifiCardModal),
    Context: applyReactInVue(NotifiContextProvider),
  },
};
</script>
<style lang="scss" scoped>
.notifi-modal-container {
  position: relative;
  margin-left: -4px;
}
.notifi-card {
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-63%) translateY(18%);
  position: absolute;
  z-index: 10;
}
.notifi-card-overlay {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
}
@media screen and (max-width: 1024px) {
  .notifi-card {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
