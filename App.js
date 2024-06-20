// App.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Typography, Popover, Paper } from '@mui/material'; // Import necessary components from Material-UI
import TreeNode from './TreeNode'; // Import TreeNode component
import './App.css'; // Import CSS

const App = () => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const openPopover = (event) => {
    setShowPopover(true);
    setPopoverAnchor(event.currentTarget);
  };

  const closePopover = () => {
    setShowPopover(false);
  };

  const onFormSubmit = (event) => {
    console.log(event); // Handle form submission logic
    closePopover();
  };

  const onCancelClick = (event) => {
    event.preventDefault();
    closePopover();
  };

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
    <div>
      {showPopover && <div className="overlay"></div>} {/* Display overlay when popover is open */}
      <div className="container">
        <Typography variant="h2" gutterBottom className="header">
          GICS Classification
        </Typography>
        <div className="treeview-container">
          {treeData.map((node, index) => (
            <div key={index}>
              <TreeNode node={node} openPopover={openPopover} />
            </div>
          ))}
        </div>
        {showPopover && popoverAnchor && (
          <Popover
            open={showPopover}
            anchorEl={popoverAnchor}
            onClose={closePopover}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
            className="popover"
          >
            <Paper elevation={3} className="popover-content">
              <Typography variant="h4" gutterBottom className="popover-header">
                Popover Content
              </Typography>
              <Typography>
                Replace this text with your actual popover content.
              </Typography>
              <Button
                onClick={onFormSubmit}
                variant="contained"
                color="primary"
                style={{ marginTop: '10px' }}
                className="popover-button"
              >
                Submit
              </Button>
              <Button
                onClick={onCancelClick}
                variant="contained"
                style={{ marginLeft: '10px' }}
                className="popover-button"
              >
                Cancel
              </Button>
            </Paper>
          </Popover>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
