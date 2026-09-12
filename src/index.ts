import { R2Explorer } from 'r2-explorer';

export default R2Explorer({
  readonly: false, // Bật quyền chỉnh sửa, upload, xóa file
  basicAuth: {
    username: 'truong',
    password: 'Linhsang97'
  },
  emailRouting: {
    targetBucket: 'MY_EMAIL_BUCKET' // Tên Binding R2 Bucket dùng để chứa email
  }
});
