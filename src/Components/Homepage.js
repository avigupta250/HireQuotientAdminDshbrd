import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { CiSaveUp2 } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
// import { IoSearch } from "react-icons/io5";

const ApiDataList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editableId, setEditableId] = useState(null);
  const [editedValues, setEditedValues] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll,setSelectAll]=useState(false)
  const itemsPerPage = 10;

  useEffect(() => {
    
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);


  const handleSearch = () => {
    const filteredData = data.filter(
        item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredData)
   
  };


  const handlePageChange = newPage => {
    setCurrentPage(newPage);
    setEditableId(null);

  };

  const handleEdit = (id, name, email, role) => {
    setEditableId(id);
    setEditedValues({ name, email, role });
  };

  const handleSave = () => {
   
    const index = data.findIndex(item => item.id === editableId);
  
   
    if (index !== -1) {
      setData(prevData => {
        const newData = [...prevData];
        newData[index] = {
          ...newData[index],
          name: editedValues.name,
          email: editedValues.email,
          role: editedValues.role,
        };
        return newData;
      });
  
      setEditableId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditableId(null);
  };

  const handleInputChange = (field, value) => {
    setEditedValues(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleDelete = id => {
  
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
  
    if (confirmDelete) {
    
      const updatedData = data.filter(item => item.id !== id);
  
      
      setData(updatedData);
  
     
      if (editableId === id) {
        setEditableId(null);
      }
    }
  };
  const handleDeleteSelected = () => {
  
    setData(prevData => prevData.filter(item => !selectedIds.includes(item.id)));
  
    setSelectedIds([]);
    setSelectAll(false)
  };
  
  const handleCheckboxChange = id => {
    setSelectedIds(prevState => {
      if (prevState.includes(id)) {
        return prevState.filter(selectedId => selectedId !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedIds(selectAll ? [] : currentItems.map(item => item.id));
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100">
   
      <div className="flex justify-between mb-4">
        <div>
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={searchTerm}
          onChange={(e) =>{setSearchTerm(e.target.value) 
             handleSearch()}}
          className="p-2 border border-gray-300 mr-2"
        />
         {/* <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleSearch}
        >
         <IoSearch />
        </button> */}
        </div>
       
      <button
        className="bg-red-500 text-white py-2 px-4 rounded mb-4"
        onClick={handleDeleteSelected}
        disabled={selectedIds.length === 0}
      >
       <MdDeleteOutline />
      </button>
      </div>
      <table className="min-w-full bg-white border divide-y  border-gray-300 mb-4">
        <thead>
          <tr className='mr-6'>
         
            <td className="py-2 px-4  border-b">
                 <div className='flex text-[15px] font-bold'>
                 <input 
            type='checkbox'
            checked={selectAll}
            onChange={handleSelectAllChange}
            className='mr-4 '
            />
           <h1>Name</h1> 
                 </div>
            </td>
            <td className="py-2 px-4 mr-10 text-[15px] font-bold  border-b">Email</td>
            <td className="py-2  px-4 text-[15px] font-bold border-b">Role</td>
            <td className="py-2 px-4  text-[15px] font-bold border-b">Actions</td>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id} className='divide-y' >
              <td className="py-2 px-4 mr-6 border-b">
                <input
                  type="checkbox"
               
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="mr-4"
                />
                {editableId === item.id ? (
                  <input
                    type="text"
                    value={editedValues.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editableId === item.id ? (
                  <input
                    type="text"
                    value={editedValues.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                  />
                ) : (
                  item.email
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editableId === item.id ? (
                  <input
                    type="text"
                    value={editedValues.role}
                    onChange={e => handleInputChange('role', e.target.value)}
                  />
                ) : (
                  item.role
                )}
              </td>
              <td className="py-2 px-4 flex  gap-3 border-b">
                {editableId === item.id ? (
                  <>
                    <button
                      className="mr-2 bg-green-500 text-white py-1 px-2 rounded"
                      onClick={handleSave}
                    >
                      <CiSaveUp2 />
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded"
                      onClick={handleCancelEdit}
                    >
                      <MdOutlineCancel />
                    </button>
                  </>
                ) : (
                  <button
                    className="mr-2 border py-1 px-2 rounded"
                    onClick={() => handleEdit(item.id, item.name, item.email, item.role)}
                  >
                    <FiEdit />
                  </button>
                )}
                <button
                  className=" text-red-500 border py-1 px-2 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-between items-center'>
        <div>
          <div> {selectedIds.length} of{" "}{data.length} {" "}row(s) selected</div> 
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
     
    </div>
  );
};



export default ApiDataList;
