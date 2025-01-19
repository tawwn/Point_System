<template>
  <div class="reward-detail">
    <button class="back-btn" @click="$router.push('/home')">Back</button>
    <div class="center-content">
      <img :src="reward.image" alt="Reward Image" width="200" class="image"/>
      <div class="detail">
        <h1>{{ reward.name }}</h1>
        <p>Cost: {{ reward.cost }} points</p>
        <p>Expires: {{ reward.expiresAt }}</p>
        <button
          :disabled="!canRedeemReward"
          @click="confirmRedeem"
          class="redeem-btn"
        >
          {{ isloading ? 'Processing...' : buttonText }}
        </button>
    </div>
    </div>

    <!-- Dialog สำหรับยืนยันการแลก -->
    <div v-if="showDialog" class="dialog">
      <p>Are you sure you want to redeem this reward?</p>
      <button @click="redeem">Yes</button>
      <button @click="showDialog = false">Cancel</button>
    </div>

    <!-- Success Dialog -->
    <div v-if="showSuccessDialog" class="dialog">
      <p>Redeem succeeded!</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      showDialog: false, // ใช้สำหรับ Dialog ยืนยันการแลก
      showSuccessDialog: false, // ใช้สำหรับแสดง Dialog สำเร็จ
      isloading: false, // ใช้สำหรับแสดง Loading
    };
  },
  computed: {
    reward() {
      const id = Number(this.$route.params.id); // รับ ID จาก URL
      return this.$store.getters.getRewardById(id); // ดึงข้อมูลรางวัลจาก Vuex
    },
    canRedeemReward() {
      const now = new Date();
      const expiryDate = moment(this.reward.expiresAt);
      return (
        !this.reward.redeemed &&
        this.$store.state.user.points >= this.reward.cost &&
        expiryDate.isSameOrAfter(now)
      );
    },
    buttonText() {
      if (this.reward.redeemed) return 'Already Redeemed';
      if (new Date(this.reward.expiresAt) < new Date()) return 'Expired';
      if (this.$store.state.user.points < this.reward.cost) return 'Not Enough Points';
      return 'Redeem';
    },
  },
  methods: {
    confirmRedeem() {
      this.showDialog = true; // เปิด Dialog ยืนยัน
    },
    async redeem() {
      this.isloading = true;
      try {
        const response = await fetch(`http://localhost:3000/redeem/${this.reward.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          this.$store.commit('redeemReward', this.reward.id); // เรียก Mutation เพื่อแลกรางวัล
          this.showSuccessDialog = true; // แสดง Dialog สำเร็จ
          setTimeout(() => {
            this.showSuccessDialog = false;
            this.$router.push('/home'); // กลับไปหน้าหลัก
          }, 500); 
        } else {
          alert(data.message); // แสดงข้อความผิดพลาด
        }
      } catch (error) {
        console.error('Error redeeming reward:', error);
      } finally {
        this.isloading = false;
        this.showDialog = false;
      }
    },
  },
};
</script>

<style>
.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
.reward-detail {
  text-align: center;
  margin: 20px;
}
.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.back-btn {
  display: block;
  margin-bottom: 20px;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
.redeem-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}
.detail {
  margin-top: 20px;
  border: 2px solid #000000;
  padding: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.image {
  border: 2px solid #000000;
  border-radius: 5px;
}
</style>