import app from "./src/app.js";
import connectDB from "./src/config/db.js";

// Gọi hàm kết nối DB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
