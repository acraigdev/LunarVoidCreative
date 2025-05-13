import type { Nullable } from '../utils/typeHelpers';

type Response<T> = {
  success: boolean;
  data?: Nullable<T>;
  message?: Nullable<string>;
};
export class APIResponse<T> {
  success: boolean;
  data?: Nullable<T>;
  message?: Nullable<string>;

  constructor({ success, data, message }: Response<T>) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}

export function processResponse<T>(res: APIResponse<T>) {
  const data = new APIResponse(res);
  if (data.success && data.data) return data.data;
  throw new Error(
    data.message
      ? data.message
      : 'An unknown error occurred processing the request',
  );
}
