import type { Nullable } from '../utils/typeHelpers';

interface Input {
  body?: Record<string, unknown>;
  query?: Record<string, string | Array<string>>;
}

export class SDKClient {
  private base: string;

  constructor({ base }: { base: string }) {
    this.base = `https://proxy-nhvsjqhtua-uc.a.run.app/${base}`;
  }

  buildQueryString(queries?: Record<string, string | Array<string>>) {
    const params = new URLSearchParams();
    if (!queries) return '';
    Object.keys(queries).forEach(key => {
      const value = queries[key];
      if (typeof value === 'string') {
        params.append(key, value);
        return;
      }
      value?.forEach(v => params.append(key, v));
    });
    return new URLSearchParams(params).toString();
  }

  async send({
    api,
    input,
    pageParam,
    method,
  }: {
    api: string;
    input?: Input;
    pageParam?: Nullable<string>;
    method?: 'POST' | 'GET';
  }) {
    return await fetch(
      pageParam
        ? `${this.base}${pageParam}`
        : `${this.base}${api}?${this.buildQueryString(input?.query)}`,
      {
        ...(method && { method }),
        ...(input?.body && { body: JSON.stringify(input.body) }),
      },
    )
      .then((res: Response) => {
        if (res.status !== 200) {
          return res.text().then((text: string) => {
            throw new Error(text);
          });
        }
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return res.json();
        }
        if (contentType === 'image/jpeg') return res.blob();
        return res.text();
      })
      .catch(err => console.error({ err }));
  }
}
