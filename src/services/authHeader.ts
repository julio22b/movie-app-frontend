export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('filmlyCurrentUser')!);
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
}
