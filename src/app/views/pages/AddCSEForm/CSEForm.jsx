import React from 'react';
import {
  styled,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { useCSEForm } from './useCSEForm';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const CSEForm = () => {
  const {
    state,
    handleChange,
    handleSubmit,
    loading,
    topics,
    grades,
  } = useCSEForm();
  return (
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
      <Divider />
        <h4 style={{marginTop: '16px'}}>CSE Information</h4>
       <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={state.name || ''}
            onChange={handleChange}
            name="name"
            InputProps={{
              startAdornment: <InputAdornment position="start" style={{fontWeight: 900}}>CSE</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="cse-topics-select">CSE Topics</InputLabel>
            <Select
              multiple
              value={state.topics || []}
              onChange={handleChange}
              label="CSE Topics"
              inputProps={{
                name: 'topics',
                id: 'cse-topics-select',
              }}
            >
              {topics.map((topic) => (
                <MenuItem key={topic.id} value={topic.id}>
                  {topic.attributes.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={state.description || ''}
            onChange={handleChange}
            name="description"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="grades-select">Grades</InputLabel>
            <Select
              multiple
              value={state.grades || []}
              onChange={handleChange}
              label="Grades"
              inputProps={{
                name: 'grades',
                id: 'grades-select',
              }}
            >
              {grades.map((grade) => (
                <MenuItem key={grade.id} value={grade.id}>
                  {grade.attributes.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={loading}
        style={{ marginTop: '16px' }}
      >
        {loading ? (
          <CircularProgress
            style={{ margin: 'auto', height: 15, width: 15, color: 'white' }}
          />
        ) : (
          'Submit'
        )}
      </Button>
    </ValidatorForm>

  );
};

export default CSEForm;
