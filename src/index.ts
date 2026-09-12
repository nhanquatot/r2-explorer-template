import { R2Explorer } from 'r2-explorer';

export interface Env {
  MY_BUCKET: R2Bucket;
  [key: string]: any; // Cho phép đọc mọi Variable Name bất kỳ từ Dashboard
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // 1. Tự động lấy tất cả các Variable Name và Value trên Cloudflare Dashboard
    // Lọc bỏ biến MY_BUCKET (và các biến hệ thống nếu có)
    const users = Object.entries(env)
      .filter(([key]) => key !== 'MY_BUCKET' && !key.startsWith('CF_'))
      .map(([username, password]) => ({
        username: username,          // Lấy TÊN BIẾN (Variable Name) làm Username (ví dụ: truong)
        password: String(password),  // Lấy GIÁ TRỊ (Value) làm Password (ví dụ: 123456)
      }));

    // 2. Nếu không có biến nào được tạo trên Dashboard thì dùng tài khoản mặc định
    const basicAuth = users.length > 0 ? users : { username: 'admin', password: 'defaultpassword' };

    return R2Explorer({
      readonly: false,
      basicAuth: basicAuth,
    }).fetch(request, env, ctx);
  },
};
