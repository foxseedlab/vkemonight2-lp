import { createExports as createAstroExports } from '@astrojs/cloudflare/entrypoints/server.js';

const BASIC_AUTH_REALM = 'Secure Area';
const UNAUTHORIZED_STATUS = 401;
const AUTHORIZATION_HEADER_KEY = 'Authorization';
const BASIC_PREFIX = 'Basic ';
const UNAUTHORIZED_BODY = '401 Unauthorized';

const createExpectedAuthorizationHeader = (
  username: string,
  password: string,
) => {
  const rawCredential = `${username}:${password}`;
  const base64Credential = btoa(rawCredential);
  return `${BASIC_PREFIX}${base64Credential}`;
};

const validateAuthorization = (
  authorizationHeader: string | null,
  expectedAuthorizationHeader: string,
) => authorizationHeader === expectedAuthorizationHeader;

const createUnauthorizedResponse = () =>
  new Response(UNAUTHORIZED_BODY, {
    status: UNAUTHORIZED_STATUS,
    headers: {
      // RFC 7235 に従い、ブラウザに再認証を促すチャレンジヘッダーを返却
      'WWW-Authenticate': `Basic realm="${BASIC_AUTH_REALM}"`,
      'Content-Type': 'text/plain; charset=utf-8',
      // 応答キャッシュを無効化して認証情報の漏洩を防止
      'Cache-Control': 'no-store',
    },
  });

const createExports = (manifest: Parameters<typeof createAstroExports>[0]) => {
  const astroExports = createAstroExports(manifest);
  const originalFetch = astroExports.default.fetch.bind(astroExports.default);

  // Astro のfetchハンドラにBasic認証を追加
  const fetch = async (
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ) => {
    const expectedAuthorizationHeader = createExpectedAuthorizationHeader(
      env.BASIC_AUTH_USER,
      env.BASIC_AUTH_PASSWORD,
    );
    const authorizationHeader = request.headers.get(AUTHORIZATION_HEADER_KEY);

    if (
      !validateAuthorization(authorizationHeader, expectedAuthorizationHeader)
    ) {
      return createUnauthorizedResponse();
    }

    // 認証成功時のみ Astro のSSRハンドラへ委譲
    // @ts-expect-error: Cloudflare Workers とAstro のRequest型に互換性がないため型キャストが必要
    return originalFetch(request, env, ctx);
  };

  // @ts-expect-error: Cloudflare Workers と Astro のfetch型定義に差異があるため型キャストが必要
  astroExports.default.fetch = fetch;

  return astroExports;
};

export { createExports };
