<template>
  <div class="profile-container">
    <!-- Header Section -->
    <div class="header">
      <div class="header-content">
        <img class="avatar" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" alt="User Avatar" />
        <h1>สวัสดี {{ user.username }}</h1>
        <p class="user-id">{{ user.userId }}</p>
        <a class="edit-link">ดูโปรไฟล์ของฉัน ></a>
        <p class="points">{{ user.points.toLocaleString() }} คะแนน</p>
        <p class="points-description">สะสมคะแนนที่ได้รับเพื่อแลกสิทธิพิเศษมากมาย</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="actions">
      <button class="action-button reward">
        <i class="fa fa-gift"></i> My Reward
      </button>
      <button class="action-button earn">
        <i class="fa fa-qrcode"></i> Earn Point
      </button>
    </div>

    <!-- Additional Links -->
    <div class="links">
      <div class="link-item">
        <i class="fa fa-history"></i> ประวัติการสะสมคะแนน
      </div>
      <div class="link-item">
        <i class="fa fa-lock"></i> นโยบายความเป็นส่วนตัว
      </div>
      <div class="link-item" @click="logout">
        <i class="fa fa-sign-out"></i> ออกจากระบบ
      </div>
    </div>

    <!-- Social Media -->
    <div class="social-media">
      <a href="#" class="icon"><i class="fa fa-facebook"></i></a>
      <a href="#" class="icon"><i class="fa fa-twitter"></i></a>
      <a href="#" class="icon"><i class="fa fa-whatsapp"></i></a>
      <a href="#" class="icon"><i class="fa fa-linkedin"></i></a>
      <a href="#" class="icon"><i class="fa fa-envelope"></i></a>
    </div>

    <!-- Bottom Navigation -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <div class="navbar" >
      <a href="home"><i class="fa fa-fw fa-home"></i> หน้าหลัก</a>
      <a href="reward"><i class="fa fa-fw fa-star"></i> สะสมพอยท์</a>
      <a href="profile" class="active"><i class="fa fa-fw fa-user"></i> บัญชี</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    logout() {
      localStorage.removeItem("authToken");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style src="../assets/navbar.css" />
<style src="../assets/profile.css" />
