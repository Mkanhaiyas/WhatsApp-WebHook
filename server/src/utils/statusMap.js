export const normalizeStatus = (raw) => {
  if (!raw) return "none";
  const v = raw.toLowerCase();
  if (v === "sent" || v === "delivered" || v === "read") return v;
  return "none";
};
