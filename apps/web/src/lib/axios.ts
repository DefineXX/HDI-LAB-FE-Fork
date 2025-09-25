import axios from 'axios';

import { deleteCookie } from '@/utils/cookies';

// 프록시를 통한 안정적인 API 호출
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // 클라이언트 사이드에서는 프록시 사용 (같은 도메인으로 요청)
    return '/api';
  }
  // 서버 사이드에서는 직접 API 호출
  return 'https://api.hdi.ai.kr';
};

export const apiClient = axios.create({
  baseURL: getBaseURL(),
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
    console.log(`🌐 API 요청: ${config.method?.toUpperCase()} ${config.url}`);
    console.log('🌐 요청 시 쿠키:', document.cookie);
    console.log('🌐 요청 헤더:', config.headers);
    console.log('🌐 withCredentials:', config.withCredentials);
    console.log('🌐 baseURL:', config.baseURL);
    console.log('🌐 전체 URL:', `${config.baseURL}${config.url}`);
    console.log(
      '🌐 프록시 사용:',
      config.baseURL === '/api' ? '✅ 클라이언트 프록시' : '🔗 서버 직접 호출'
    );
    return config;
  },
  (error) => {
    console.error('🌐 요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `🌐 API 응답 성공: ${response.config.method?.toUpperCase()} ${response.config.url}`,
      {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        cookies: document.cookie,
        data: response.data,
      }
    );
    return response;
  },
  (error) => {
    console.error(
      `🌐 API 에러: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
      {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.message,
        responseData: error.response?.data,
        responseHeaders: error.response?.headers,
        cookies: document.cookie,
        requestHeaders: error.config?.headers,
      }
    );

    // 401 에러 시 쿠키 제거 및 로그인 페이지로 리다이렉트
    // 단, 로그인 직후 일부 API에서는 새로고침하지 않음
    if (error.response?.status === 401) {
      const isLoginEndpoint = error.config?.url?.includes('/auth/login');

      console.log('🔒 401 에러 상세 분석:', {
        isLoginEndpoint,
        url: error.config?.url,
        cookies: document.cookie,
        responseHeaders: error.response?.headers,
      });

      if (!isLoginEndpoint) {
        // 로그인 API, 사용자 정보 API, 설문 제품 API가 아닌 경우에만 쿠키 제거 및 리다이렉트
        // 토큰은 서버에서 HttpOnly 쿠키로 관리되므로 클라이언트에서 직접 삭제할 수 없음
        console.log('🔒 인증 실패 - 쿠키 삭제 및 리다이렉트');
        deleteCookie('user'); // 사용자 정보 쿠키만 삭제
        window.location.href = '/auth';
      } else {
        console.log(
          '🔒 401 에러이지만 특정 엔드포인트이므로 리다이렉트하지 않음'
        );
      }
    }
    return Promise.reject(error);
  }
);
