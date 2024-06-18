<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../services/auth.service';

const nickname = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleLogin = async () => {
  authStore.login({ nickname: nickname.value, password: password.value });

  authStore.$watch('isLoading', (isLoading) => {
    if (!isLoading && !authStore.error) {
      // Redirect to the main game scene or perform other actions upon successful login
      console.log('Login successful');
      // Example: Redirect to main game scene
      // router.push('/main');
    }
  });
};

const error = authStore.error; // Reactive binding to display error message

</script>
<template>
  <div class="login-modal">
    <input type="text" v-model="nickname" placeholder="Nickname">
    <input type="password" v-model="password" placeholder="Password">
    <button @click="handleLogin">Login</button>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<style scoped>
.login-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.error-message {
  color: red;
}
</style>
