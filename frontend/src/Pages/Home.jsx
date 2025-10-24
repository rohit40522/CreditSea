import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import ProfileCard from '../components/ProfileCard';
import { getProfiles } from '../API/Api';

const Home = () => {
  const [currentProfile, setCurrentProfile] = useState(null);

  const handleUploadSuccess = async () => {
    // Fetch all profiles, but display only the most recent one
    const data = await getProfiles();
    if (data && data.length > 0) {
      // Assuming profiles are returned in chronological order
      setCurrentProfile(data[data.length - 1]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <FileUpload onUploadSuccess={handleUploadSuccess} />

      <div className="mt-6">
        {currentProfile ? (
          <ProfileCard key={currentProfile._id} profile={currentProfile} />
        ) : (
          <p className="text-center text-gray-500">
            Upload a file to view its report.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
