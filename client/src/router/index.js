import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },

  {
    path: '/reward',
    name: 'reward',
    component: () => import('../views/Reward.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  
  { path: '/reward/:id', 
    component: () => import('../components/RewardDetail.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function isAuthenticated() {
  return !!localStorage.getItem('authToken');
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' });
  } else if (to.name === 'login' && isAuthenticated()) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router
