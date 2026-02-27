import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createInitialsAvatar, normalizeUser } from "../utils/users";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`https://express-t4.onrender.com/api/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to load user details.");
        }

        const payload = await response.json();
        const userData = payload.user || payload.data || payload.result || payload;
        setUser(normalizeUser(userData, id));
      } catch (err) {
        setError(err.message || "Could not fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="page-wrap">
      <div className="content">
        <p>
          <Link to="/users">Back to users</Link>
        </p>

        {loading ? <p>Loading profile...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}

        {!loading && !error && user ? (
          <div className="card detail-card">
            <img
              src={user.avatar}
              alt={user.fullName || user.email || "User"}
              onError={(e) => {
                e.currentTarget.src = createInitialsAvatar(user.fullName || "User");
              }}
            />
            <h1>{user.fullName || "Unnamed User"}</h1>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
