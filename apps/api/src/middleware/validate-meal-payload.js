// Meal schemas accept scalar fields only. Never forward MongoDB operators.
function validateMealPayload(req, res, next) {
  const body = req.body;
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Invalid meal payload" });
  }

  for (const [key, value] of Object.entries(body)) {
    if (key.startsWith("$") || key.includes(".") ||
        key === "__proto__" || key === "constructor" || key === "prototype" ||
        typeof value !== "string") {
      return res.status(400).json({ error: "Invalid meal payload" });
    }
  }

  next();
}

module.exports = validateMealPayload;
