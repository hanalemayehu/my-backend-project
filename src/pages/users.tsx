import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main
      style={{
        maxWidth: 700,
        margin: "3rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "0 1rem",
        color: "#333",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          textAlign: "center",
          marginBottom: "2rem",
          color: "#0070f3",
        }}
      >
        Registered Users
      </h1>

      {loading ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            color: "#666",
          }}
        >
          Loading users...
        </p>
      ) : users.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            color: "#999",
            fontStyle: "italic",
          }}
        >
          No users found. Please register new users.
        </p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
            gap: "1.5rem",
          }}
        >
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                backgroundColor: "#f0f4ff",
                borderRadius: 12,
                padding: "1rem 1.5rem",
                boxShadow: "0 3px 8px rgba(0, 112, 243, 0.2)",
                transition: "transform 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#0070f3",
                  wordBreak: "break-word",
                }}
              >
                {user.email}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
