export interface AuthResponse {
  accessToken: string;  // Add the access token
  refreshToken: string; // Add the refresh token
  user: any;            // Or define a more specific type for the user, depending on your needs
}
