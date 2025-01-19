<template>
  <div class="Reward" v-if="reward">
    <p>Your Points: {{ user.points }}</p>
    <img :src="reward.image" alt="Reward Image" width="200" />
    <h1>{{ reward.name }}</h1>
    <p>Cost: {{ reward.cost }} points</p>
    <p>Expires: {{ reward.expiresAt }}</p>
    <p>Status: {{ rewardStatus }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>

  <!-- Bottom Navigation -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <div class="navbar" id="navbar">
    <a href="home"><i class="fa fa-fw fa-home"></i> หน้าหลัก</a>
    <a href="reward" class="active"><i class="fa fa-fw fa-star"></i> สะสมพอยท์</a>
    <a href="profile"><i class="fa fa-fw fa-user"></i> บัญชี</a>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  created() {
    this.$store.dispatch('fetchRewards');
  },
  computed: {
    ...mapState(['user', 'rewards']),
    reward() {
      return this.$store.getters.getRewardById(1); 
    },
    rewardStatus() {
      if (!this.reward) return '';
      if (this.reward.redeemed) return 'Already Redeemed';
      if (new Date(this.reward.expiresAt) < new Date()) return 'Expired';
      if (this.$store.state.user.points < this.reward.cost) return 'Not Enough Points';
      return 'Available';
    },
  },
};
</script>

<style src="../assets/navbar.css"/>
<style scoped>
.Reward {
  text-align: center;
}
</style>
