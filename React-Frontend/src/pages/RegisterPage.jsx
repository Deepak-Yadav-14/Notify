import { useState } from "react";

const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMsg(data.msg || data.detail);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          className="p-2 border"
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="p-2 border"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
      {msg && <p className="mt-4 text-center text-sm text-gray-700">{msg}</p>}
    </div>
  );
};

export default RegisterPage;
