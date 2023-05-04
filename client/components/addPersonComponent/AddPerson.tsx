import React, { useState } from "react";
import { Modal, Input, Select } from "antd";
import axios from "axios";

const AddPerson = ({ isAdding, setIsAdding, setDataSource }) => {
  const { Option } = Select;
  const selectOptions = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
  ];
  const [addingPerson, setAddingPerson] = useState({
    name: "",
    email: "",
    gender: "",
    address: { street: "", city: "" },
    phone: "",
  });
  console.log(addingPerson);

  const resetEditing = () => {
    setIsAdding(false);
    setAddingPerson({
      name: "",
      email: "",
      gender: "",
      address: { street: "", city: "" },
      phone: "",
    });
  };

  const postReq = async () => {
    try {
      await axios.post(`http://localhost:3000/data`, addingPerson);

      const response = await axios.get("http://localhost:3000/data");
      const data = response.data;

      setDataSource(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title='Edit Person'
      open={isAdding}
      okText='Save'
      onCancel={() => {
        resetEditing();
      }}
      onOk={() => {
        // function to post data
        postReq();
        resetEditing();
      }}
    >
      <Input
        onChange={(e) => {
          setAddingPerson((prevValue) => {
            return { ...prevValue, name: e.target.value };
          });
        }}
        value={addingPerson?.name}
        placeholder='name'
      />
      <div className='marginer'></div>
      <Input
        onChange={(e) => {
          setAddingPerson((prevValue) => {
            return { ...prevValue, email: e.target.value };
          });
        }}
        value={addingPerson?.email}
        placeholder='email'
      />
      <div className='marginer'></div>

      <Select
        onChange={(value) =>
          setAddingPerson({ ...addingPerson, gender: value })
        }
        value={addingPerson?.gender}
        placeholder='select gender'
        style={{ width: "100%" }}
      >
        {selectOptions.map((option: any) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
      <div className='marginer'></div>

      <Input
        onChange={(e) => {
          setAddingPerson((prevValue) => {
            return {
              ...prevValue,
              address: {
                ...prevValue?.address,
                street: e.target.value,
              },
            };
          });
        }}
        value={addingPerson?.address?.street}
        placeholder='street address'
      />
      <div className='marginer'></div>

      <Input
        onChange={(e) => {
          setAddingPerson((prevValue) => {
            return {
              ...prevValue,
              address: {
                ...prevValue?.address,
                city: e.target.value,
              },
            };
          });
        }}
        value={addingPerson?.address?.city}
        placeholder='city'
      />
      <div className='marginer'></div>

      <Input
        onChange={(e) => {
          setAddingPerson((prevValue) => {
            return { ...prevValue, phone: e.target.value };
          });
        }}
        value={addingPerson?.phone}
        placeholder='phone'
      />
    </Modal>
  );
};

export default AddPerson;
