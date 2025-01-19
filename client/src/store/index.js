import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    user: {
      username: 'John',
      points: 120,
    },
    rewards: [],
  },
  mutations: {
    setRewards(state, rewards) {
      state.rewards = rewards;
    },

    redeemReward(state, rewardId) {
      const reward = state.rewards.find((r) => r.id === rewardId);
      if (reward && !reward.redeemed && state.user.points >= reward.cost) {
        state.user.points -= reward.cost;
        reward.redeemed = true;
      }
    },
  },

  actions: {
    async fetchRewards({commit}) {
      try {
        const { data } = await axios.get('http://localhost:3000/rewards');
        commit('setRewards',data);
      } catch (error) {
        console.error('Error fetching rewards:', error);
      }
    },
    async redeemReward({commit}, rewardId) {
      try {

      } catch (error) {
        alert(error.response?.data?.message || 'Failed to redeem reward.');
      }
    }
  },

  getters: {
    getRewardById: (state) => (id) => state.rewards.find((r) => r.id === id),
    remainingPoints: (state) => state.user.points,
  },
});

export default store;
