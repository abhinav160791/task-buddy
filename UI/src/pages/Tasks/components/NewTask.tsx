import {
  Backdrop,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Box,
  CardHeader,
  CircularProgress,
} from '@mui/material';
import { useCallback, useReducer } from 'react';
import { TaskFormValue } from '../types';

interface Props {
  open: boolean;
  handleClose: () => void;
  createTask: (data: TaskFormValue) => Promise<void>;
  createTaskLoading: boolean;
}

type Action =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_DESCRIPTION'; payload: string };

export const NewTask = ({
  open,
  handleClose,
  createTask,
  createTaskLoading,
}: Props) => {
  const taskReducer = (state: TaskFormValue, action: Action) => {
    switch (action.type) {
      case 'SET_TITLE':
        return {
          ...state,
          title: action.payload,
        };
      case 'SET_DESCRIPTION':
        return {
          ...state,
          description: action.payload,
        };
      default:
        return state;
    }
  };

  const [task, setTask] = useReducer(taskReducer, {
    title: '',
    description: '',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ type: 'SET_TITLE', payload: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ type: 'SET_DESCRIPTION', payload: e.target.value });
  };

  const handleCreateTask = useCallback(async () => {
    await createTask(task);
    handleClose();
  }, [task]);

  const disableButton =
    task.title.length < 10 || task.description.length < 10 || createTaskLoading;
  const titleError = !!task.title && task.title.length < 10;
  const descriptionError = !!task.description && task.description.length < 10;

  return (
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <Card sx={{ minWidth: 480, minHeight: 380 }}>
        <CardHeader title="New task" />
        <CardContent>
          <Box sx={{ display: 'grid', gap: 2 }}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={task.title}
              onChange={handleTitleChange}
              autoFocus={true}
              required
              error={titleError}
              helperText={
                titleError ? 'Title must be at least 10 characters' : ''
              }
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={task.description}
              onChange={handleDescriptionChange}
              required
              error={descriptionError}
              helperText={
                descriptionError
                  ? 'Description must be at least 10 characters'
                  : ''
              }
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              margin: '0 8px',
            }}
          >
            <Button
              variant="outlined"
              sx={{ width: '47%' }}
              onClick={handleClose}
              color="error"
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              sx={{ width: '47%' }}
              disabled={disableButton}
              onClick={handleCreateTask}
            >
              {createTaskLoading ? <CircularProgress /> : 'Add task'}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Backdrop>
  );
};
