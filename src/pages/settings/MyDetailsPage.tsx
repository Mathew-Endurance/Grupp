import React from "react";
import ComingSoonPage from "../ComingSoonPage";

const MyDetailsPage: React.FC = () => {
  return (
    <ComingSoonPage
      title="Settings"
      description="Manage your team and preferences here."
      activeTab="My details"
    />
  );
};

export default MyDetailsPage;
