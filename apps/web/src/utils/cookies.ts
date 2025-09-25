// 쿠키 관리 유틸리티 함수들

export const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  // HTTPS 환경에서만 secure 플래그 적용 (localhost에서는 제외)
  const isSecure =
    typeof window !== 'undefined' && window.location.protocol === 'https:';
  const secureFlag = isSecure ? 'secure;' : '';

  // 개발 환경에서는 SameSite를 lax로 설정하여 크로스 사이트 요청 허용
  const sameSite =
    typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? 'lax'
      : 'strict';

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;${secureFlag}samesite=${sameSite}`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    const c = ca[i];
    if (c) {
      let trimmedC = c;
      while (trimmedC.charAt(0) === ' ')
        trimmedC = trimmedC.substring(1, trimmedC.length);
      if (trimmedC.indexOf(nameEQ) === 0)
        return trimmedC.substring(nameEQ.length, trimmedC.length);
    }
  }
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const clearAllCookies = () => {
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    deleteCookie(name.trim());
  }
};

// 사용자 정보 관련 유틸리티 함수들
export const getUserFromCookie = () => {
  const userCookie = getCookie('user');
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch (error) {
      console.error('사용자 정보 파싱 오류:', error);
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  // 토큰은 HttpOnly 쿠키로 서버에서 관리되므로
  // 사용자 정보 쿠키의 존재 여부로 인증 상태 확인
  return getUserFromCookie() !== null;
};
