import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [postCount, setPostCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [usersRes, postsRes] = await Promise.all([
          fetch("/api/test"),
          fetch("/api/posts"),
        ]);
        const usersData = await usersRes.json();
        const postsData = await postsRes.json();

        setUserCount(usersData.users.length);
        setPostCount(postsData.length);
      } catch {
        setUserCount(0);
        setPostCount(0);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: 900,
        margin: "3rem auto",
        padding: "0 1rem",
        color: "#333",
      }}
    >
      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
       <h1
  style={{
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#0070f3",
    marginBottom: "0.5rem",
  }}
>
  Login, Register, and Manage Users & Posts
</h1>
<p style={{ fontSize: "1.25rem", color: "#555" }}>
  Secure user authentication and easy content management with Next.js and Prisma.
</p>

      </header>

      <section
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "3rem",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <StatCard label="Users" count={userCount} loading={loading} />
        <StatCard label="Posts" count={postCount} loading={loading} />
      </section>

      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <NavButton href="/users" text="View Users" />
        <NavButton href="/add-user" text="Add User" />
        <NavButton href="/login" text="Login" />
        <NavButton href="/register" text="Register" />
      </nav>
    </div>
  );
}

function StatCard({
  label,
  count,
  loading,
}: {
  label: string;
  count: number | null;
  loading: boolean;
}) {
  return (
    <div
      style={{
        flex: "1 1 150px",
        backgroundColor: "#f0f4ff",
        padding: "1.5rem",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        minWidth: 150,
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          margin: 0,
          color: "#0070f3",
          fontWeight: "bold",
        }}
      >
        {loading ? "…" : count}
      </h2>
      <p style={{ fontSize: "1.1rem", color: "#555", marginTop: 8 }}>{label}</p>
    </div>
  );
}

function NavButton({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      style={{
        backgroundColor: "#0070f3",
        color: "white",
        padding: "0.75rem 1.5rem",
        borderRadius: 8,
        textDecoration: "none",
        fontWeight: "600",
        fontSize: "1rem",
        boxShadow: "0 4px 6px rgba(0, 112, 243, 0.5)",
        transition: "background-color 0.3s ease",
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#005bb5";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0070f3";
      }}
    >
      {text}
    </Link>
  );
}
