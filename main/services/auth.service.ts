import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import configService from '../config/config.service';
import { AuthResponse, LoginRequest, RefreshTokenRequest } from '../types/interfaces/auth.interface';


export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'));
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'));
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const apiUrl = configService.get('API_URL'); // Fetch API URL from ConfigService

  const login = async (credentials: LoginRequest) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.post<AuthResponse>(`${apiUrl}/auth/login`, credentials);

      if (!response.data.success) {
        throw new Error('Login failed');
      }

      accessToken.value = response.data.accessToken;
      refreshToken.value = response.data.refreshToken;

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

    } catch (error_) {
      error.value = error_ instanceof Error ? error_.message : 'Login failed';
    } finally {
      isLoading.value = false;
    }
  };

  const refreshAuthToken = async () => {
    if (!refreshToken.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.post<AuthResponse>(`${apiUrl}/auth/refresh-token`, { refreshToken: refreshToken.value } as RefreshTokenRequest);

      if (!response.data.success) {
        throw new Error('Token refresh failed');
      }

      accessToken.value = response.data.accessToken;
      refreshToken.value = response.data.refreshToken;

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

    } catch (error_) {
      error.value = error_ instanceof Error ? error_.message : 'Token refresh failed';
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return {
    accessToken,
    refreshToken,
    isLoading,
    error,
    login,
    refreshAuthToken,
    logout,
  };
});
