export const replaceStateWithQuery = (
  values: Record<string, string | undefined | null>
) => {
  const url = new URL(window.location.toString());
  for (const [k, v] of Object.entries(values)) {
    if (v) {
      url.searchParams.set(k, v);
    } else {
      url.searchParams.delete(k);
    }
  }
  history.replaceState(history.state, '', url);
};

interface SearchParams {
  [key: string]: string;
}

export const getUrlSearchParams = (): SearchParams => {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {} as SearchParams;

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
};
