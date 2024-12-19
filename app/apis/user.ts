export const getAll = async () => {
  const res = await fetch(`${process.env.URL}/user`);

  if (!res.ok) {
    // Nếu có lỗi trong việc gọi API, ném lỗi hoặc trả về giá trị mặc định
    throw new Error("Failed to fetch users");
  }

  const data = await res.json();
  return data; // Trả về dữ liệu người dùng
};
