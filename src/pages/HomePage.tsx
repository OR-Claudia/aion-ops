import React from "react";
import { Layout, Sidebar } from "../components/layout";

const HomePage: React.FC = () => {
  return (
    <Layout showTools={true}>
      <Sidebar />
    </Layout>
  );
};

export default HomePage;
