import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

// const handleSave = () => {
//   // Find the index of the item to be updated
//   const index = data.findIndex(item => item.id === editableId);

//   // If the index is found, update the data
//   if (index !== -1) {
//     setData(prevData => {
//       const newData = [...prevData];
//       newData[index] = {
//         ...newData[index],
//         name: editedValues.name,
//         email: editedValues.email,
//         role: editedValues.role,
//       };
//       return newData;
//     });

//     setEditableId(null); // Reset editableId after saving
//   }
// };



// const handleDelete = id => {
//   // Confirm deletion (you may want to implement a confirmation modal)
//   const confirmDelete = window.confirm('Are you sure you want to delete this item?');

//   if (confirmDelete) {
//     // Filter out the item to be deleted
//     const updatedData = data.filter(item => item.id !== id);

//     // Update the data state
//     setData(updatedData);

//     // Reset editableId if the item being edited is deleted
//     if (editableId === id) {
//       setEditableId(null);
//     }
//   }
// };
