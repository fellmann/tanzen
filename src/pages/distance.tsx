import React from "react";
import BaseLayout from "../components/BaseLayout";
import Distance from "../distance/Distance";

export default function Index() {
  return (
    <BaseLayout title="Corona Abstandsrechner">
      <Distance />
    </BaseLayout>
  );
}
