// Minimal API helper using fetch to mimic axios-like `.post` returning { data }
const defaultHeaders = {
  "Content-Type": "application/json",
};

async function request(method, url, body) {
  const opts = {
    method,
    headers: { ...defaultHeaders },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = text;
  }

  if (!res.ok) {
    const err = new Error(data?.message || res.statusText || "API error");
    err.response = { status: res.status, data };
    throw err;
  }

  return { data };
}

export default {
  post: (url, body) => request("POST", url, body),
  get: (url) => request("GET", url),
};
