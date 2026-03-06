// API utility: base URL and fetch helpers

const BASE_URL = 'https://dashboardbe-4row.onrender.com';

export const apiPost = async (endpoint, body) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return { ok: response.ok, data };
};

export const apiGet = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return { ok: response.ok, data };
};
