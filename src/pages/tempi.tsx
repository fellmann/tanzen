import React from "react";
import BaseLayout from "../components/BaseLayout";
import Tempi from "../tempi/tempi";

export default function Index() {
  return (
    <BaseLayout title="Turniermusik & Tempi">
      <Tempi />
    </BaseLayout>
  );
}
