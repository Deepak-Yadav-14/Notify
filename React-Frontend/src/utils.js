// utils.js
export const getInitials = (username) => {
  if (!username) return "NA";
  const parts = username.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
};
