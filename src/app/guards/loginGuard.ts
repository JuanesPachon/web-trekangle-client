export const loginGuard = () => {
    if (localStorage.getItem("user_token")) {
        return true;
    } else {
        return false;
    }
}