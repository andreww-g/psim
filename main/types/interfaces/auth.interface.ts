export interface AuthResponse {
  success: boolean,
  data: {
    accessToken: string,
    refreshToken: string,
  },
}

export interface LoginRequest {
  nickName: string,
  password: string,
}

export interface RefreshTokenRequest {
  refreshToken: string,
}
