# uda_stackoverflow_backend

## 1. Các API khả dụng
Root path: http://localhost:5000/api/v1
### Authentication
- /auth/login -> `POST` -> Đăng nhập, trả về thông tin người dùng và JWT Token
- /auth/logup -> `POST` -> Đăng ký và gửi email xác nhận
- /auth/confirmation/:emailToken -> `GET` -> Xác thực mã được gửi đến email
- /auth/refresh-token -> `POST` -> Làm mới JWT Token `(Yêu cầu xác thực)`
- /auth/forgot-password -> `POST` -> Gửi mật khẩu mới đến email để người dùng xác nhận có đổi hay không
- /auth/reset-password/:emailToken -> `GET` -> Xác nhận đổi mật khẩu

### User
- /user/:userId -> `PATCH` -> Cập nhật thông tin người dùng `(Yêu cầu xác thực)`
- /user/password/:userId -> `PATCH` -> Đổi mật khẩu `(Yêu cầu xác thực)`

### Image
- /upload-image (file) -> `POST` -> Tải lên 1 ảnh
- /upload-image/multiple (files) -> `POST` -> Tải lên 1 hoặc nhiều ảnh
