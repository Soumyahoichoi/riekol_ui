import React from "react";
import { useParams } from "react-router-dom";

const EoDetails = () => {
  const params = useParams();

  console.log(params);
  return <div>EoDetails</div>;
};

export default EoDetails;
