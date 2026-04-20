import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export async function captureLead(email, source = "hero") {
  const { data } = await api.post("/leads", { email, source });
  return data;
}

export async function createCheckout({ packageId, email }) {
  const { data } = await api.post("/checkout/session", {
    package_id: packageId,
    origin_url: window.location.origin,
    email: email || null,
  });
  return data;
}

export async function getCheckoutStatus(sessionId) {
  const { data } = await api.get(`/checkout/status/${sessionId}`);
  return data;
}

export async function sendContact({ email, message }) {
  const { data } = await api.post("/contact", { email, message });
  return data;
}
