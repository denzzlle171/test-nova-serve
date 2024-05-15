
import {
  Typography,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { useStoreUsers } from '../store/users-store';


export const UserInfoPage = () => {

  const { users } = useStoreUsers((state) => ({
    users: state.users,
  }));


  const { userId } = useParams();

  const user = users.find((user) => user.id === parseInt(userId));

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        flexDirection: 'column',
      }}
    >
      <Container>
        <Link
          to="/users"
          style={{
            display: 'block',
            color: 'inherit',
            textDecoration: 'none',
            marginBottom: '20px',
          }}
        >
          {' '}
          {'< Back to List'}
        </Link>
        <Card>
          <Typography
            style={{
              textAlign: 'center',
            }}
          >
            User: {user?.id}
          </Typography>
          <CardContent>
            <Typography>name: {user?.name}</Typography>
            <Typography>username: {user?.username}</Typography>
            <Typography>email: {user?.email}</Typography>
            <Typography>phone: {user?.phone}</Typography>
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
};
