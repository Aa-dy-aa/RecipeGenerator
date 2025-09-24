import { useEffect, useState } from "react";

export default function useUserDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}
