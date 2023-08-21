import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      // filter filters out any null items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // Send items if there aren't the requested amount per page but we're on the last page
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we don't have any items, must go to network to fetch them
        return false;
      }

      // if there items, return from cache
      if (items.length) {
        return items;
      }
      // if no items in cache, fallback to network request
      return false;
    },
    // Runs when the Apollo client comes back from the network with our products
    merge(existing, incoming, { args }) {
      const { skip } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // when returned from a merge, it will back to the read function and try it again
      return merged;
    },
  };
}
