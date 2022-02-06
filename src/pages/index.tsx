import React from "react";
import BaseLayout from "../components/BaseLayout";
import Judge from "../judge/Judge";

export default function Index() {
  return (
    <BaseLayout title="Majoritäts- und Skatingrechner">
      <Judge />
    </BaseLayout>
  );
}
