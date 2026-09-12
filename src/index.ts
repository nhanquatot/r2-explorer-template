import { R2Explorer } from 'r2-explorer';

const explorer = R2Explorer({
  readonly: false,
  basicAuth: {
    username: 'truong',
    password: 'Linhsang97'
  },
  emailRouting: {
    targetBucket: 'bucket'
  }
});

export default {
  // Xử lý truy cập giao diện Explorer trên Web
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    return explorer.fetch(request, env, ctx);
  },

  // Xử lý sự kiện nhận Email gửi tới
  async email(message: ForwardableEmailMessage, env: any, ctx: ExecutionContext) {
    if (typeof explorer.email === 'function') {
      return explorer.email(message, env, ctx);
    }
  }
};
