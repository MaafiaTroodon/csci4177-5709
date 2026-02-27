import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthentication } from "../utils/auth";
import { createInitialsAvatar, extractUsers, getNextPage, normalizeUser } from "../utils/users";

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const mergedUsers = new Map();
        let nextUrl = "https://express-t4.onrender.com/api/users";
        let page = 1;

        while (nextUrl && page <= 20) {
          const response = await fetch(nextUrl);
          if (!response.ok) {
            throw new Error("Failed to load users.");
          }

          const payload = await response.json();
          const rawUsers = extractUsers(payload);
          rawUsers.forEach((entry, index) => {
            const normalized = normalizeUser(entry, `${page}-${index + 1}`);
            if (normalized.id) {
              mergedUsers.set(normalized.id, normalized);
            }
          });

          nextUrl = getNextPage(payload, page);
          page += 1;
        }

        setUsers(Array.from(mergedUsers.values()));
      } catch (err) {
        setError(err.message || "Could not fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter((user) => {
      const firstName = (user.firstName || "").toLowerCase();
      const lastName = (user.lastName || "").toLowerCase();
      const fullName = (user.fullName || "").toLowerCase();
      return firstName.includes(term) || lastName.includes(term) || fullName.includes(term);
    });
  }, [users, search]);

  const handleLogout = () => {
    clearAuthentication();
    navigate("/login");
  };

  return (
    <div className="page-wrap">
      <div className="content">
        <div className="top-bar">
          <h1>Users</h1>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search by first or last name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? <p>Loading users...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}

        {!loading && !error ? (
          <div className="grid">
            {filteredUsers.map((user) => (
              <Link key={user.id} to={`/users/${user.id}`} className="user-card">
                <img
                  src={user.avatar}
                  alt={user.fullName || user.email || "User"}
                  onError={(e) => {
                    e.currentTarget.src = createInitialsAvatar(user.fullName || "User");
                  }}
                />
                <h2>{user.fullName || "Unnamed User"}</h2>
              </Link>
            ))}
          </div>
        ) : null}

        {!loading && !error && filteredUsers.length === 0 ? (
          <p>No users match your search.</p>
        ) : null}
      </div>
    </div>
  );
}
