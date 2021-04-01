export default function handler(req, res) {
  if (req.method === "POST") {
    res.status(200).json({ name: "Succesfull post of data" });
    console.log(req.body);
  } else {
    // Handle any other HTTP method
  }
}

// curl -d "hello" http://localhost:3000/api/hello
