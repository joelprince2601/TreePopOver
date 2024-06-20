import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, TextField, Grid, Typography, Paper, Popover } from '@mui/material'; // Import Material-UI components
import { useForm, Controller } from 'react-hook-form'; // Import react-hook-form for form handling
import TreeNode from './TreeNode'; // Adjust path as needed

const App = () => {
  const { control, handleSubmit } = useForm(); // Initialize useForm hook
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle form submission
  const onSubmit = (data) => {
    console.log(data); // Log form data
    handleClosePopover();
  };

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const treeData = [
    {
      text: 'GICS Classification',
      items: [
        {
          text: '10 Energy',
          items: [
            {
              text: '1010 Energy',
              items: [
                { text: '101010 Energy Equipment & Services' },
                { text: '101020 Oil, Gas & Consumable Fuels' },
                { text: '101030 Classification 1' },
              ],
            },
          ],
        },
        { text: '15 Materials' },
        { text: '20 Industrials' },
        { text: '25 Consumer Discretionary' },
        { text: '30 Consumer Staples' },
        { text: '35 Health Care' },
        { text: '40 Financials' },
        { text: '45 Information Technology' },
        { text: '50 Communication Services' },
      ],
    },
  ];

  return (
    <div className="container">
      <Typography variant="h2" gutterBottom>
        GICS Classification
      </Typography>
      <div className="treeview-container">
        {treeData.map((node, index) => (
          <div key={index}>
            <TreeNode node={node} />
          </div>
        ))}
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Paper elevation={3} className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                      required
                      autoFocus
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      type="email"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Popover>
      <Button variant="contained" onClick={handleOpenPopover}>
        Contained
      </Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
