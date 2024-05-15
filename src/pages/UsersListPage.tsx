import {
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import { useStoreUsers } from '../store/users-store';
import React from 'react';



export const UsersListPage = () => {
  
  const { getUsers, users, loading } = useStoreUsers((state) => ({
    getUsers: state.getUsers,
    users: state.users,
    loading: state.loading,
  }));

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <ListItem
                disableGutters
                secondaryAction={
                  <IconButton aria-label="comment">
                    <Link
                      to={`/users/${user.id}`}
                      style={{
                        color: 'inherit',
                        textDecoration: 'none',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <CommentIcon />
                    </Link>
                  </IconButton>
                }
              >
                <ListItemText primary={`User: ${user.name}`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};
