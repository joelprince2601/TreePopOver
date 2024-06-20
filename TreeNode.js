import React, { useState } from 'react';
import { Button } from '@mui/material'; // Import Button from Material-UI
import PropTypes from 'prop-types'; // Import PropTypes for type checking

const TreeNode = ({ node, openPopover }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    if (node.items) {
      setExpanded(!expanded);
    }
  };

  const handleButtonClick = (event) => { // Add event parameter here
    event.stopPropagation(); // Stop event propagation to prevent bubbling
    openPopover(event); // Invoke the openPopover function passed from parent (App.js)
  };

  return (
    <div style={{ position: 'relative', border: '1px solid #ccc', padding: '5px' }}>
      {node.items ? (
        <div
          onClick={toggleExpanded}
          style={{ cursor: 'pointer' }}
          title={node.text}
        >
          {expanded ? '▼' : '►'} {node.text}
        </div>
      ) : (
        <Button
          onClick={handleButtonClick} // Pass event to handleButtonClick function
          variant="contained" // Use contained variant for leaf node buttons
          color="primary" // Example: You can adjust the color as needed
          style={{ margin: '5px' }}
        >
          {node.text}
        </Button>
      )}

      {expanded && node.items && (
        <div style={{ marginLeft: '20px' }}>
          {node.items.map((childNode, index) => (
            <TreeNode
              key={index}
              node={childNode}
              openPopover={openPopover} // Pass openPopover function down recursively
            />
          ))}
        </div>
      )}
    </div>
  );
};

TreeNode.propTypes = {
  node: PropTypes.object.isRequired, // Define PropTypes for node object
  openPopover: PropTypes.func.isRequired, // Define PropTypes for openPopover function
};

export default TreeNode;
