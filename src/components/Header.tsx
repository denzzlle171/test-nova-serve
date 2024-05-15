import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Header = () => {

  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string | null>(null);


  useEffect(() => {
      if (currentPath && currentPath !== location.pathname) {
        setPreviousPath(currentPath);
        setCurrentPath(location.pathname);
      } else {
        setCurrentPath(location.pathname);
      }
  }, [location, currentPath]);
  
    const replaceSlashes = (path: string) => {
      return path.replace(/\//g, ' ');
    };

  return (
    <AppBar>
      <Toolbar>
        <Container style={{ display: 'flex', gap: '20px' }}>
          <Button color="inherit" component={NavLink} to="/create" size="small">
            Create
          </Button>

          <Button color="inherit" component={NavLink} to="/users" size="small">
            Users
          </Button>
        </Container>
        <Container
          style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
        >
          <Typography>
            Current Page: {currentPath && replaceSlashes(currentPath)}
          </Typography>
          <Typography>
            Previous Page: {previousPath ? replaceSlashes(previousPath): ' -- '}
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
