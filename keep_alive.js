const https = require("https");

// Replace with your backend URL
const backendUrl =
  "https://mariapsicologia-management-server-5xee.onrender.com/api/";

// Function to send a GET request to the backend
function keepAlive() {
  https
    .get(backendUrl, (res) => {
      console.log(`Keep-alive ping sent. Status Code: ${res.statusCode}`);
    })
    .on("error", (err) => {
      console.error("Error sending keep-alive ping:", err.message);
    });
}

// Call the function immediately
keepAlive();

// Set an interval to send the keep-alive ping every 10 minutes (600000 ms)
setInterval(keepAlive, 600000); // 600000 ms = 10 minutes
