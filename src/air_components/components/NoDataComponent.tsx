import React from "react";

interface NoDataProps {
  loading?: any;
  error?: any;
}

export const NoDataComponent: React.FC<NoDataProps> = ({ loading, error }) => (
  <>
    {loading && <div> Loading ...</div>}
    {error && <div> ERROR </div>}
  </>
);
