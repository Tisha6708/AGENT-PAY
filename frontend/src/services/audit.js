const API = "http://127.0.0.1:8000";

export async function getAuditLogs(uid) {
  const res = await fetch(`${API}/audit/${uid}`);
  return await res.json();
}