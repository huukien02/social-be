# Sử dụng Node.js phiên bản chính thức
FROM node:14

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép package.json và cài đặt các gói cần thiết
COPY package*.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Biên dịch TypeScript sang JavaScript
RUN npx tsc

# Mở cổng ứng dụng
EXPOSE 4000

# Chạy ứng dụng từ file đã biên dịch
CMD ["node", "dist/app.js"]  # Đảm bảo sử dụng file JavaScript đã biên dịch
