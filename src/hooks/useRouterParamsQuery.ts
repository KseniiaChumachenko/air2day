import { useLocation } from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
export function useRouterParamsQuery(params: string[]): { [p: string]: any } {
  const searchQuery = useLocation().search;
  const query = searchQuery ? new URLSearchParams(searchQuery) : undefined;

  return params && query
    ? params.reduce(
        (o, key) => ({ ...o, [key]: JSON.parse(query.get(key).slice(1, -1)) }),
        {}
      )
    : undefined;
}
