import React from "react";
import BaseLayout from "../components/BaseLayout";
import Rehearsals from "../rehearsals/Rehearsals";

export default function Index() {
  return (
    <BaseLayout title="Stellproben">
      <Rehearsals />
    </BaseLayout>
  );
}
