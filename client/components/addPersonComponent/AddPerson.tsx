import React, { useState } from "react";
import { Modal, Input, Select } from "antd";
import axios from "axios";
type Props = {
  isAdding: boolean;
  setIsAdding: (dat: boolean) => void;
  setDataSource: (data: []) => void;
};

const AddPerson = ({ isAdding, setIsAdding, setDataSource }: Props) => {
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
  const [nameError, setNameError] = useState(0);
  const [emailError, setEmailError] = useState(0);
  const [genderError, setGenderError] = useState(0);
  const [streetError, setStreetError] = useState(0);
  const [cityError, setCityError] = useState(0);
  const [phoneError, setPhoneError] = useState(0);

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

  const validateName = () => {
    if (addingPerson.name.length < 2) {
      setNameError(-1);
    } else {
      setNameError(1);
    }
  };
  const validateEmail = () => {
    if (!addingPerson.email) {
      setEmailError(-1);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addingPerson.email)) {
      setEmailError(-1);
    } else {
      setEmailError(1);
    }
  };
  const validateGender = () => {
    if (!addingPerson.gender) {
      setGenderError(-1);
    } else {
      setGenderError(1);
    }
  };
  const validateStreet = () => {
    if (!addingPerson.address.street) {
      setStreetError(-1);
    } else {
      setStreetError(1);
    }
  };
  const validateCity = () => {
    if (!addingPerson.address.city) {
      setCityError(-1);
    } else {
      setCityError(1);
    }
  };

  const phoneValidation = (e) => {
    const regex = /^\+1\s*\(\d{3}\)\s*\d{3}-\d{4}$/;
    const isValidPhone = regex.test(e.target.value);

    if (!isValidPhone) {
      setPhoneError(-1);
    } else {
      setPhoneError(1);
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
        postReq();
        resetEditing();
      }}
    >
      <Input
        onChange={(e) => {
          setAddingPerson((prevValue) => {
            validateName();
            return { ...prevValue, name: e.target.value };
          });
        }}
        value={addingPerson?.name}
        placeholder='name'
      />
      {(nameError === 0 && "") ||
        (nameError === 1 && "") ||
        (nameError === -1 && (
          <p style={{ color: "red", margin: 0, padding: 0 }}>
            Name must be longer than 2 alphabets
          </p>
        ))}
      <div className='marginer'></div>
      <Input
        onChange={(e) => {
          validateEmail();
          setAddingPerson((prevValue) => {
            return { ...prevValue, email: e.target.value };
          });
        }}
        value={addingPerson?.email}
        placeholder='email'
      />
      {(emailError === 0 && "") ||
        (emailError === 1 && "") ||
        (emailError === -1 && (
          <p style={{ color: "red", margin: 0, padding: 0 }}>
            Email must be type of email
          </p>
        ))}
      <div className='marginer'></div>

      <Select
        onChange={(value) => {
          validateGender();
          setGenderError(1);

          return setAddingPerson({ ...addingPerson, gender: value });
        }}
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
      {(genderError === 0 && "") ||
        (genderError === 1 && "") ||
        (genderError === -1 && (
          <p style={{ color: "red", margin: 0, padding: 0 }}>
            Gender must be selected
          </p>
        ))}
      <div className='marginer'></div>

      <Input
        onChange={(e) => {
          validateStreet();
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
      {(streetError === 0 && "") ||
        (streetError === 1 && "") ||
        (streetError === -1 && (
          <p style={{ color: "red", margin: 0, padding: 0 }}>
            Please specify your street
          </p>
        ))}
      <div className='marginer'></div>

      <Input
        onChange={(e) => {
          validateCity();
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
      {(cityError === 0 && "") ||
        (cityError === 1 && "") ||
        (cityError === -1 && (
          <p style={{ color: "red", margin: 0, padding: 0 }}>
            Please specify your city
          </p>
        ))}
      <div className='marginer'></div>

      <Input
        onChange={(e) => {
          phoneValidation(e);
          setAddingPerson((prevValue) => {
            return { ...prevValue, phone: e.target.value };
          });
        }}
        value={addingPerson?.phone}
        placeholder='phone'
      />
      {(phoneError === 0 && "") ||
        (phoneError === 1 && "") ||
        (phoneError === -1 && (
          <p style={{ color: "red", margin: 0, padding: 0 }}>
            Number must be exactly as shown in the table
          </p>
        ))}
    </Modal>
  );
};

export default AddPerson;
