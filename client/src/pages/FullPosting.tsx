import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTING_BY_ID } from "../graphql/queries";

export default function FullPosting({ id }: any) {
  const { data, loading, error } = useQuery(GET_POSTING_BY_ID, {
    variables: { id },
  });

  if (loading) return null;
  if (error) return <div>This posting doesn&apos;t exist</div>;

  const { postingById: posting } = data;

  return <div>posting {posting.title}</div>;
}
