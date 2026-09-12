import { R2Explorer } from 'r2-explorer';

export default R2Explorer({
  readonly: false, // Bật quyền chỉnh sửa / upload / xóa file
  basicAuth: {
    username: 'truong',      // Thay bằng Tên đăng nhập bạn muốn
    password: 'Linhsang97'  // Thay bằng Mật khẩu bạn muốn
  }
});
