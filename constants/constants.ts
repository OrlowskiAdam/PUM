export const LAN_IP = "10.100.125.37";
export const UR_LAN_IP = "192.168.43.81";

export const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://tournabay.com/api' : `http://${LAN_IP}:8080/api`;
export const OAUTH_ACCESS_TOKEN = 'accessToken';
