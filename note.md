docker build -t react-remix .
// Lưu ý là mình phải có network nestjs_mynetwork trước khi chạy lệnh
docker run -d --name react-remix --network nestjs_mynetwork -p 5173:5173 react-remix
