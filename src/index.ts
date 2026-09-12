import { R2Explorer } from 'r2-explorer';

export interface Env {
  MY_BUCKET: R2Bucket;
  [key: string]: any;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Lấy danh sách tài khoản từ Variables trên Cloudflare Dashboard
    const userList: { username: string; password: string }[] = [];

    for (const [key, val] of Object.entries(env)) {
      // Bỏ qua R2 Bucket và các biến mặc định của hệ thống Cloudflare
      if (key === 'MY_BUCKET' || key.startsWith('CF_') || key.startsWith('WRANGLER_')) {
        continue;
      }
      
      const cleanUsername = String(key).trim();
      const cleanPassword = String(val).trim();

      if (cleanUsername && cleanPassword) {
        // Thêm tài khoản dạng chữ thường và giữ nguyên bản
        userList.push({ username: cleanUsername, password: cleanPassword });
        if (cleanUsername !== cleanUsername.toLowerCase()) {
          userList.push({ username: cleanUsername.toLowerCase(), password: cleanPassword });
        }
      }
    }

    // Nếu không tìm thấy biến nào trên Dashboard, dùng nick mặc định này
    const finalAuth = userList.length > 0 
      ? userList 
      : { username: 'admin', password: '123' };

    return R2Explorer({
      readonly: false,
      basicAuth: finalAuth,
    }).fetch(request, env, ctx);
  },
};
