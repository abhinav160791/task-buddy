import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  Paper,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  CircularProgress,
  Fab,
  Badge,
} from '@mui/material';
import {
  DeleteForeverSharp,
  Add,
  Task as TaskIcon,
  ListAltTwoTone,
} from '@mui/icons-material';
import { green } from '@mui/material/colors';
import { NewTask } from './components';
import { useAsyncFn, useUpdateEffect } from 'react-use';
import { getTasks, deleteTask, createTask } from './api';
import { Snackbar } from '../../components';
import { TaskFormValue } from './types';

const style = {
  py: 0,
  maxWidth: '100%',
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

const fabStyle = {
  position: 'absolute',
  bottom: 60,
  right: 60,
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export const Tasks = () => {
  const [openNewTaskForm, setOpenNewTaskForm] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [deleteErrorSnackbar, setDeleteErrorSnackbar] = useState(false);
  const [createErrorSnackbar, setCreateErrorSnackbar] = useState(false);

  const [{ value, loading }, getTasksFn] = useAsyncFn(getTasks, []);
  const [{ value: deleteValue }, deleteTaskFn] = useAsyncFn(async (id) => {
    try {
      const response = await deleteTask(id);
      setDeleteSuccess(true);
      return response;
    } catch (e) {
      setDeleteErrorSnackbar(true);
    }
  }, []);
  const [{ value: createTaskValue, loading: createTaskLoading }, createTaskFn] =
    useAsyncFn(async (data: TaskFormValue) => {
      try {
        const response = await createTask(data);
        setCreateSuccess(true);
        return response;
      } catch (e) {
        setCreateErrorSnackbar(true);
      }
    }, []);

  useEffect(() => {
    getTasksFn();
  }, []);

  useUpdateEffect(() => {
    getTasksFn();
  }, [deleteValue, createTaskValue]);

  return (
    <Box
      sx={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '16px',
          display: 'grid',
          gap: '32px',
          width: '480px',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            Task Buddy
          </Typography>
          <Box>
            {value && (
              <Badge badgeContent={value.total_count || '0'} color="success">
                <TaskIcon color="action" />
              </Badge>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            minHeight: '520px',
            overflowY: 'scroll',
          }}
        >
          {value && value.tasks.length > 0 ? (
            <List sx={style}>
              {value.tasks.map((task, index) => (
                <>
                  <ListItem
                    key={task.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="comments"
                        color="warning"
                        onClick={() => deleteTaskFn(task.id)}
                      >
                        <DeleteForeverSharp />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={task.title}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'text.primary', display: 'inline' }}
                          >
                            {task.description}
                          </Typography>
                          {` — ${task.created_at.toLocaleString()}`}
                        </>
                      }
                    />
                  </ListItem>
                  {index !== value.tasks.length - 1 && (
                    <Divider component="li" />
                  )}
                </>
              ))}
            </List>
          ) : (
            <Box sx={{ mt: 15 }}>
              <ListAltTwoTone sx={{ fontSize: '100px' }} color="success" />
              <Typography variant="subtitle1">Add your first task</Typography>
            </Box>
          )}
          {loading && <CircularProgress />}
        </Box>
      </Paper>
      {openNewTaskForm && (
        <NewTask
          open={openNewTaskForm}
          handleClose={() => setOpenNewTaskForm(false)}
          createTask={createTaskFn}
          createTaskLoading={createTaskLoading}
        />
      )}
      <Fab
        color="primary"
        aria-label="add"
        sx={fabStyle}
        onClick={() => setOpenNewTaskForm(true)}
      >
        <Add />
      </Fab>
      <Snackbar
        variant="success"
        message="Task deleted successfully"
        open={deleteSuccess}
        handleClose={() => setDeleteSuccess(false)}
      />

      <Snackbar
        variant="success"
        message="Task created successfully"
        open={createSuccess}
        handleClose={() => setCreateSuccess(false)}
      />
      <Snackbar
        variant="error"
        message="Error deleting task"
        open={deleteErrorSnackbar}
        handleClose={() => setDeleteErrorSnackbar(false)}
      />
      <Snackbar
        variant="error"
        message="Error creating task"
        open={createErrorSnackbar}
        handleClose={() => setCreateErrorSnackbar(false)}
      />
    </Box>
  );
};
