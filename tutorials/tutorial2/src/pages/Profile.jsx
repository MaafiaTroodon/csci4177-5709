import { useLocation } from 'react-router-dom'

function Profile() {
  const location = useLocation()
  const profile = location.state || {
    firstName: 'Jon',
    lastName: 'Snow',
    email: 'jon_snow@westeros.com',
  }

  return (
    <main className="profile-page">
      <h2>Profile</h2>
      <p>
        <strong>First Name:</strong> {profile.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {profile.lastName}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
    </main>
  )
}

export default Profile
