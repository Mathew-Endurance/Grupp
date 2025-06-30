import React from "react";
import { useRouteMetadata } from "../utils/util";
import PageHeader from "../components/common/PageHeader";
import ComingSoon from "../components/common/ComingSoon";

const DashboardPage: React.FC = () => {
  const { title, description } = useRouteMetadata();
  return (
    <>
      <PageHeader title={title} description={description} />
      <ComingSoon
        title={`${title} Coming Soon`}
        description={`The ${title.toLowerCase()} page is under development and will be available soon.`}
      />
    </>
  );
};

export default DashboardPage;
