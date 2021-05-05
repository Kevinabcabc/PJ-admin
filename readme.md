
### 前端（Frontend）
- 前端工程化环境（webpack）
- CSS 预处理工具（sass）
- JS模块化：ES Module, CommonJS Module
- JS库：jQuery
- SPA：single page application，路由：SME-Router
- UI 组件库：Bootstrap(AdminLTE)
- RMVC: Art-template

### 后端（Backend）
- Node.js
- Express(static, Router, randomstring, bcrypt, cookie-session)
- MongoDB (Mongoose)
- EJS
- jwt(json web token)
- RMVP

### 开发架构
- 前后端分离的开发架构

### 秘钥生成

> openssl

生成私钥
openssl > genrsa -out rsa_private_key.pem 2048

根据私钥生成公钥
openssl > rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem

<!-- 非对称加密 rs256 -->