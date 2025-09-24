import { useEffect, useState } from "react";

export default function useUserDetails() {
  const [user, setUser] = useState(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/secret", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not Logged In.");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => {
        console.log(err.message);
        setUser(null);
      })
      .finally(() => setLoaded(true));
  }, []);

  return { user, isLoaded };
}
