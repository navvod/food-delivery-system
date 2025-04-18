
import useAuth from '../../hooks/useAuth';


const Profile = () => {
  const { user } = useAuth();
 

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <p>Current Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>  
    </div>
  );
};

export default Profile;