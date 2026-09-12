import { R2Explorer } from 'r2-explorer';

export default R2Explorer({
  readonly: false,
  basicAuth: {
    username: 'truong',
    password: 'Linhsang97'
  },
  emailRouting: {
    targetBucket: 'bucket' // Tên binding tương ứng với file wrangler.json
  }
});
