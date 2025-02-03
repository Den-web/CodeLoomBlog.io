
export const useAuth = () => {

    const user = { name: "John Doe" };
  
    const isAuthenticated = true;
  
  
  
    const login = (token: string, user: { name: string }) => {
  
      console.log("Logged in with token:", token);
  
    };
  
  
  
    const logout = () => {
  
      console.log("Logged out");
  
    };
  
  
  
    return { user, isAuthenticated, login, logout };
  
  };
  
