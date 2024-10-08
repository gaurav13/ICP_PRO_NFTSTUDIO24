import React from "react";

const JSONLD = ({ data }:any) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default React.memo(JSONLD);