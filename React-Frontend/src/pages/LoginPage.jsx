import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.username, // Use email field here, since your backend expects it
        password: form.password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } else {
      setError(data.detail);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <div className="flex ">
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>

        <input
          name="email"
          type="email"
          placeholder="example@gmail.com"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
