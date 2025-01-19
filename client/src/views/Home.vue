<template>
  <div class="home">
    <h1 class="username">Welcome, {{ user.username }}</h1>
    <div class="userpoint-container">
      <div class="points-section">คะแนนของคุณ: {{ user.points }} คะแนน</div>
    </div>
    <div class="rewards-container" @scroll="onScroll" ref="rewardsContainer">
      <div v-for="(reward, index) in displayedRewards" :key="index" class="reward-card">
        <img
          :src="reward.image"
          alt="Reward Image"
          width="100"
          class="reward-image"
        />
        <h2>{{ reward.name }}</h2>
        <p>Cost: {{ reward.cost }} points</p>
        <p>Expires: {{ reward.expiresAt }}</p>
        <router-link :to="'/reward/' + reward.id">View Details</router-link>
      </div>
    </div>
  </div>

  <!-- Bottom Navigation -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

  <div class="navbar">
    <a href="home" class="active"><i class="fa fa-fw fa-home"></i> หน้าหลัก</a>
    <a href="reward"><i class="fa fa-fw fa-star"></i> สะสมพอยท์</a>
    <a href="profile"><i class="fa fa-fw fa-user"></i> บัญชี</a>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      displayedRewards: [],
    };
  },
  created() {
    this.$store.dispatch("fetchRewards");
  },
  computed: {
    ...mapState(["user", "rewards"]),
  },
  watch: {
    rewards(newRewards) {
      this.initializeDisplayedRewards();
    },
  },
  methods: {
    initializeDisplayedRewards() {
      this.displayedRewards = [...this.rewards];
    },
    onScroll() {
      const container = this.$refs.rewardsContainer;

      if (
        container.scrollLeft + container.offsetWidth >=
        container.scrollWidth - 10
      ) {
        this.displayedRewards = [...this.displayedRewards, ...this.rewards];
      }

      if (container.scrollLeft <= 10) {
        this.displayedRewards = [...this.rewards, ...this.displayedRewards];
        container.scrollLeft = this.rewards.length * 200; 
      }
    },
  },
};
</script>


<style src="../assets/navbar.css" />
<style src="../assets/home.css" />