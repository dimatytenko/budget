interface ProfileProps {
  title?: string;
}

const ProfilePage: React.FC<ProfileProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default ProfilePage;
