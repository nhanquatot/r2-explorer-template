import { R2Explorer } from 'r2-explorer';

export interface Env {
  MY_BUCKET: R2Bucket;
  USERNAME?: string;
  PASSWORD?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return R2Explorer({
      readonly: false,
      basicAuth: {
        username: env.USERNAME || 'truong',
        password: env.PASSWORD || 'change_me_in_dashboard',
      },
    }).fetch(request, env, ctx);
  },
};
