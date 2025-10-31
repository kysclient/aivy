import crypto from 'crypto';

export interface CoupangAuthConfig {
  accessKey: string;
  secretKey: string;
}

/**
 * 쿠팡 파트너스 API HMAC 인증 헤더 생성
 */
export function generateCoupangAuthHeader(
  method: string,
  url: string,
  secretKey: string,
  accessKey: string
): string {
  const urlObj = new URL(url);
  const path = urlObj.pathname;
  const query = urlObj.search.slice(1); // Remove '?'

  // GMT+0 타임스탬프 생성
  const now = new Date();
  const timestamp = formatTimestamp(now);

  // HMAC 서명 생성을 위한 메시지
  const message = `${timestamp}${method}${path}${query}`;

  // HMAC-SHA256 서명 생성
  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(message)
    .digest('hex');

  // Authorization 헤더 반환
  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${timestamp}, signature=${signature}`;
}

/**
 * GMT+0 타임스탬프 포맷 (YYMMDD'T'HHMMSS'Z')
 */
function formatTimestamp(date: Date): string {
  const year = date.getUTCFullYear().toString().slice(-2);
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}
