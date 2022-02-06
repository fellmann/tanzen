import React from "react";
import BaseLayout from "../components/BaseLayout";
import Crosses from "../crosses/Crosses";

export default function Index() {
  return (
    <BaseLayout title="Vorrundenwahrscheinlichkeiten">
      <Crosses />
    </BaseLayout>
  );
}
