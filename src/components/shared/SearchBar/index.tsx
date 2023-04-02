import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import { useSearchUsersQuery } from '@/services/authService';
import SearchResult from '../SearchResult';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '10px',
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#120428',
    },
    marginRight: '20px',
    marginBottom: '20px',
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    color: 'white',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'white',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  
interface SearchBarProps {
    searchType: 'group' | 'direct' | 'game';
    setActive: Function
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchType,
    setActive
}) => {
    const [searchValue, setSearchValue] = useState('')
    const {data: users, isLoading, error } = useSearchUsersQuery(searchValue)

    useEffect(() => {
        setActive(searchValue.length > 0)
    }, [searchValue])

  return (
    <>
    <Search>
        <SearchIconWrapper>
        <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        />
    </Search>
    {users && searchValue && <SearchResult data={users} />}
    </>
  )
}

export default SearchBar