import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const loggedIn = localStorage.getItem("loggedIn");

      if (loggedIn !== "true") {
        router.push("/login"); // Redirect to login page if not authenticated
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
