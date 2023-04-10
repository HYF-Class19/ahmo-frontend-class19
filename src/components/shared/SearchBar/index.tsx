import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'
import { useSearchUsersQuery } from '@/services/authService';
import SearchResult from '../SearchResult';
import { useAppSelector } from '@/hooks/useAppHooks';
import { selectUserData } from '@/store/slices/userSlice';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '30px',
    padding: theme.spacing(1.5, 1),
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#120428',
    },
    marginBottom: '20px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1.2),
    color: 'white',
    position: 'absolute',
    pointerEvents: 'none',
    top: '50%',
    left: '10px',
    transform: 'translateY(-45%)'
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
    searchType: 'group' | 'direct' | 'game' | 'all';
    isActive: boolean
    setActive: Function
    placeholder: string
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchType,
    setActive,
    isActive,
    placeholder
}) => {
    const [searchValue, setSearchValue] = useState('')
    const {data, isLoading, error } = useSearchUsersQuery({query: searchValue, type: searchType === 'all' ? 'direct' : searchType})
    const {data: chatsResult} = useSearchUsersQuery({query: searchValue, type: searchType})
    const userData = useAppSelector(selectUserData)


    useEffect(() => {
      setSearchValue('')
    }, [searchType])

    useEffect(() => {
        setActive(searchValue.length > 0)
    }, [searchValue])

    useEffect(() => {
      if(!isActive) {
        setSearchValue('')
      }
    }, [isActive])


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
        inputProps={{ 'aria-label': 'search' }}
        />
    </Search>
    {searchValue ? 
    searchType === 'group' || searchType === 'game'
    ? <SearchResult setActive={setActive} isLoading={isLoading} chats={data} /> 
    : searchType === 'all' 
    ? <SearchResult setActive={setActive} isLoading={isLoading} chats={chatsResult} users={data?.filter(user => user.id !== userData?.id)} /> 
    : <SearchResult setActive={setActive} isLoading={isLoading} users={data?.filter(user => user.id !== userData?.id)} />
    : null}
    </div>
  )
}

export default SearchBar