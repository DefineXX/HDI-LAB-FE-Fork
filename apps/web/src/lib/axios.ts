import axios from 'axios';

import { deleteCookie } from '@/utils/cookies';

export const apiClient = axios.create({
  baseURL: 'https://api.hdi.ai.kr',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함하여 요청 전송
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 쿠키는 자동으로 전송되므로 별도 처리 불필요
    // 필요시 추가 헤더 설정 가능
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401 에러 시 쿠키 제거 및 로그인 페이지로 리다이렉트
    // 단, 로그인 API(/auth/login)에서는 새로고침하지 않음
    if (error.response?.status === 401) {
      const isLoginEndpoint = error.config?.url?.includes('/auth/login');

      if (!isLoginEndpoint) {
        // 로그인 API가 아닌 경우에만 쿠키 제거 및 리다이렉트
        deleteCookie('token');
        deleteCookie('user');
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);
