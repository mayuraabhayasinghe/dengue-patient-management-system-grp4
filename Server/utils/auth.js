export const getUser = () => {
    try {
        const userId = localStorage.getItem("userId");
        const name = localStorage.getItem("name");
        const role = localStorage.getItem("role");

        if (!userId || !name || !role) return null;

        return { userId, name, role };
    } catch (error) {
        console.error("Error building user object from localStorage", error);
        return null;
    }
};


export const getToken = () => localStorage.getItem("token");
export const isLoggedIn = () => !!getToken();
export const logout = () => {
    localStorage.clear();
    window.location.reload();
};
