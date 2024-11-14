const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/submit-user", (req, res) => {
  const { name, email, password, reenterPassword } = req.body;

  // Handle case where 'reenterPassword' might have different casings
  const confirmPassword = req.body.reenterPassword || req.body.Reenterpassword;

  // Validate name
  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Invalid or missing name" });
  }

  // Validate email
  if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.status(400).json({ error: "Invalid or missing email" });
  }

  // Validate password
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({
        error:
          "Invalid or missing password. Password must be at least 6 characters long.",
      });
  }

  // Validate reenterPassword
  if (confirmPassword !== password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Success response
  res.status(200).json({
    message: "User data received successfully",
    data: { name, email },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});