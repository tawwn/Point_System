<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Welcome</h1>

      <div class="form-group">
        <label for="email">Email</label>
        <input 
          v-model="email"
          type="email" 
          class="form-control" 
          id="email" 
          placeholder="name@example.com"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          v-model="password"
          type="password" 
          class="form-control" 
          id="password" 
          placeholder="Password"
          required
        />
      </div>

      <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">Sign In</button>

      <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
    </form>
  </main>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref(null);

    const submit = async e => {
        if (!email.value || !password.value) {
            errorMessage.value = 'Email ans Password are require';
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/login', {
                email: email.value,
                password: password.value
            });

            localStorage.setItem('authToken', response.data.token);

            router.push('/home');

        } catch (error) {
            errorMessage.value = 'Email or password is invalid'
            console.log(email.value, password.value, error || 'Unknown error');
        }

    };

    return {
        email,
        password,
        submit,
        errorMessage
    }
  }
}
</script>

<style src="../assets/login.css"/>