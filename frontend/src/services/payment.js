const BASE_URL = "http://127.0.0.1:8000";

export async function createPayment(amount, productName, user) {
  const res = await fetch(`${BASE_URL}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      product_name: productName,
      user: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      },
    }),
  });

  return await res.json();
}