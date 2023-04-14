// import { useCallback } from "react";
// import { useDebounce } from "./useDebounce";
// import { useSearchUsersQuery } from "@/services/authService";

// export const useDebouncedSearchUsersQuery = (searchValue: string, searchType: 'group' | 'direct' | 'game' | 'all', delay: number) => {
//   const debouncedSearchValue = useDebounce(searchValue, delay);

//   const searchUsers = useCallback(() => {
//     return useSearchUsersQuery({
//       query: debouncedSearchValue,
//       type: searchType === "all" ? "direct" : searchType,
//     });
//   }, [debouncedSearchValue, searchType]);

//   return searchUsers();
// };
