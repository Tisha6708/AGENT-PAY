const BASE_URL = "http://127.0.0.1:8000";

export async function getOrders(uid) {
  const res = await fetch(`${BASE_URL}/orders/${uid}`);
  return await res.json();
}