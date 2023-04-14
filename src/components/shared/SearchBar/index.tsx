import { useAppSelector } from "@/hooks/useAppHooks";
import useDebounce from "@/hooks/useDebounce";
import { useSearchUsersQuery } from "@/services/authService";
import { selectUserData } from "@/store/slices/userSlice";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import SearchResult from "../SearchResult";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "30px",
  padding: theme.spacing(1.5, 1),
  backgroundColor: "#000",
  "&:hover": {
    backgroundColor: "#120428",
  },
  marginBottom: "20px",
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.2),
  color: "white",
  position: "absolute",
  pointerEvents: "none",
  top: "50%",
  left: "10px",
  transform: "translateY(-45%)",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    width: "100%",
  },
}));

interface SearchBarProps {
  searchType: "group" | "direct" | "game" | "all";
  isActive: boolean;
  setActive: Function;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchType,
  setActive,
  isActive,
  placeholder,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data, isLoading, error, isFetching } = useSearchUsersQuery({
    query: debouncedValue,
    type: searchType === "all" ? "direct" : searchType,
  });
  const { data: chatsResult } = useSearchUsersQuery({
    query: searchValue,
    type: searchType,
  });
  const userData = useAppSelector(selectUserData);

  useEffect(() => {
    setSearchValue("");
  }, [searchType]);

  useEffect(() => {
    setActive(searchValue.length > 0);
  }, [searchValue]);

  useEffect(() => {
    if (!isActive) {
      setSearchValue("");
    }
  }, [isActive]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      {(isFetching || isLoading) && <h3>Fetching...</h3>}
      {searchValue && !isFetching ? (
        searchType === "group" || searchType === "game" ? (
          <SearchResult
            setActive={setActive}
            isLoading={isLoading}
            chats={data}
          />
        ) : searchType === "all" ? (
          <SearchResult
            setActive={setActive}
            isLoading={isLoading}
            chats={chatsResult}
            users={data?.filter((user) => user.id !== userData?.id)}
          />
        ) : (
          <SearchResult
            setActive={setActive}
            isLoading={isLoading}
            users={data?.filter((user) => user.id !== userData?.id)}
          />
        )
      ) : null}
    </div>
  );
};

export default SearchBar;
