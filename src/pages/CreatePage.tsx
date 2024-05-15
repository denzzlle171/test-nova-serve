import { TextField, Typography, Button, Container } from '@mui/material';
import {
  useForm,
  SubmitHandler,
  Controller,
} from 'react-hook-form';
import { useStoreUsers } from '../store/users-store';
import { v4 as uuidv4 } from 'uuid'; // if need💨


interface IForm {
  Name: string;
  Username: string;
  Phone: string;
  Email: string;
  id?: string; // if need💨
}

export const CreatePage = () => {
  const uniqueId = uuidv4(); // if need💨

    const { createUser } = useStoreUsers((state) => ({
      createUser: state.createUser,
    }));

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IForm>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IForm> = (data) => {
    data.id = uniqueId; // if need💨
    createUser(data);
    reset();
  };

  const handleClear = () => {
    reset();
  };

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <form style={{ width: '400px' }} onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="h5"
          align="center"
          style={{ marginBottom: '1rem', textTransform: 'uppercase' }}
        >
          create user
        </Typography>

        <Container style={{ marginBottom: '1rem', minHeight: '1.5rem' }}>
          <Controller
            name="Name"
            control={control}
            defaultValue=""
            rules={{ required: true, minLength: 2 }}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.Name}
                />
                <Typography
                  m="3px 14px 0"
                  fontSize={12}
                  variant="body2"
                  color="error"
                  style={{ height: '1rem' }}
                >
                  {errors.Name ? 'Name must be at least 3 characters' : ''}
                </Typography>
              </>
            )}
          />
        </Container>

        <Container style={{ marginBottom: '1rem', minHeight: '1.5rem' }}>
          <Controller
            name="Username"
            control={control}
            defaultValue=""
            rules={{ required: true, minLength: 3 }}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  error={!!errors.Username}
                />
                <Typography
                  m="3px 14px 0"
                  fontSize={12}
                  variant="body2"
                  color="error"
                  style={{ height: '1rem' }}
                >
                  {errors.Username
                    ? 'Username must be at least 3 characters'
                    : ''}
                </Typography>
              </>
            )}
          />
        </Container>

        <Container style={{ marginBottom: '1rem', minHeight: '1.5rem' }}>
          <Controller
            name="Phone"
            control={control}
            defaultValue={''}
            rules={{
              required: { value: true, message: 'Field is required' }, // Добавляем правило обязательного заполнения
              pattern: {
                value: /^[\d+]{1,15}$/,
                message: 'Invalid phone number',
              },
            }}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  type="tel"
                  error={!!errors.Phone}
                />
                <Typography
                  m="3px 14px 0"
                  fontSize={12}
                  variant="body2"
                  color="error"
                  style={{ height: '1rem' }}
                >
                  {errors.Phone ? errors.Phone.message : ''}
                </Typography>
              </>
            )}
          />
        </Container>

        <Container style={{ marginBottom: '1rem', minHeight: '1.5rem' }}>
          <Controller
            name="Email"
            control={control}
            defaultValue=""
            rules={{
              required: { value: true, message: 'Field is required' },
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => (
              <>
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  error={!!errors.Email}
                />
                <Typography
                  m="3px 14px 0"
                  fontSize={12}
                  variant="body2"
                  color="error"
                  style={{ height: '1rem' }}
                >
                  {errors.Email ? errors.Email.message : ''}
                </Typography>
              </>
            )}
          />
        </Container>

        <Container
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Button size="large" variant="contained" onClick={handleClear}>
            Clear
          </Button>
          <Button
            size="large"
            variant="contained"
            type="submit"
            disabled={Object.keys(errors).length > 0}
          >
            Submit
          </Button>
        </Container>
      </form>
    </Container>
  );
};
