// Utility: auth helpers for managing user session in localStorage

export const setUser = (user) => {
    localStorage.setItem('dashboardUser', JSON.stringify(user));
};

export const getUser = () => {
    const data = localStorage.getItem('dashboardUser');
    return data ? JSON.parse(data) : null;
};

export const removeUser = () => {
    localStorage.removeItem('dashboardUser');
};

export const isLoggedIn = () => {
    return getUser() !== null;
};

export const getUserRole = () => {
    const user = getUser();
    return user ? user.role : null;
};
