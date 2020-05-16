import React from "react";
import OwnPosting from "./OwnPosting";

function OwnPostings({ postings }: any) {
  return (
    <div>
      {postings.map((posting: any) => (
        <OwnPosting key={posting.id} posting={posting} />
      ))}
    </div>
  );
}

export default OwnPostings;
