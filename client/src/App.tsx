import { useEffect, useState } from "react";
import { Table } from "antd";
import "./App.css";
import axios from "axios";
import { Modal, Input, Select } from "antd";
import ButtonComponent from "../components/ButtonComponent/ButtonComponent";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { create } from "zustand";

const useStore = create((set) => ({
  dataSource: [],
  setDataSource: (data: any) => set({ dataSource: data }),
}));

function App() {
  const { Option } = Select;
  const selectOptions = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
  ];
  const [columns, setColumns] = useState([
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (address: { street: string; city: string }) => (
        <div>
          <div>{address?.street},</div>
          <div>{address?.city}</div>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Row-controller",
      render: (record: any) => {
        return (
          <>
            <DeleteOutlined
              onClick={() => deleteRow(record)}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ]);

  const [isEdit, setIsEdit] = useState(false);
  const [editingPerson, setEditingPerson] = useState({
    name: "",
    email: "",
    gender: "",
    address: { street: "", city: "" },
    phone: "",
  });
  const { dataSource, setDataSource } = useStore();

  console.log(setDataSource);
  const deleteRow = (record: any) => {
    console.log(record.id);
    Modal.confirm({
      title: "Are you sure, you want to delete this person record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteReq(record.id);
      },
    });
  };

  const deleteReq = async (id: any) => {
    try {
      await axios.delete(`http://localhost:3000/data/${id}`);

      // make a new request to get the updated data after deleting the item
      const response = await axios.get("http://localhost:3000/data");
      const data = response.data;

      useStore.setState({ dataSource: data });
    } catch (error) {
      console.log(error);
    }
  };

  const updateReq = (record: any) => {
    axios
      .put(`http://localhost:3000/data/${record.id}`, editingPerson)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetEditing = () => {
    setIsEdit(false);
    setEditingPerson({
      name: "",
      email: "",
      gender: "",
      address: { street: "", city: "" },
      phone: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/data");
        const data = response.data;
        useStore.setState({ dataSource: data });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [editingPerson, setDataSource]);

  return (
    <>
      <Link style={{ marginBottom: "30px" }} to='/chart'>
        Click to see Chart
      </Link>
      <div style={{ borderColor: "white" }}></div>

      <br />
      <ButtonComponent setDataSource={setDataSource} />
      <div className='divider'></div>
      <Table
        columns={columns}
        dataSource={dataSource}
        onRow={(record: any) => ({
          onDoubleClick: () => {
            setEditingPerson(record);
            setIsEdit(true);
          },
        })}
      />
      <Modal
        title='Edit Person'
        open={isEdit}
        okText='Save'
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          updateReq(editingPerson);
          // setIsEdit(false);
          resetEditing();
        }}
      >
        <Input
          onChange={(e) => {
            setEditingPerson((prevValue) => {
              return { ...prevValue, name: e.target.value };
            });
          }}
          value={editingPerson?.name}
          placeholder='name'
        />
        <div className='marginer'></div>
        <Input
          onChange={(e) => {
            setEditingPerson((prevValue) => {
              return { ...prevValue, email: e.target.value };
            });
          }}
          value={editingPerson?.email}
          placeholder='email'
        />
        <div className='marginer'></div>

        <Select
          onChange={(value) =>
            setEditingPerson({ ...editingPerson, gender: value })
          }
          value={editingPerson?.gender}
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
            setEditingPerson((prevValue) => {
              return {
                ...prevValue,
                address: {
                  ...prevValue?.address,
                  street: e.target.value,
                },
              };
            });
          }}
          value={editingPerson?.address?.street}
          placeholder='street address'
        />
        <div className='marginer'></div>

        <Input
          onChange={(e) => {
            setEditingPerson((prevValue) => {
              return {
                ...prevValue,
                address: {
                  ...prevValue?.address,
                  city: e.target.value,
                },
              };
            });
          }}
          value={editingPerson?.address?.city}
          placeholder='city'
        />
        <div className='marginer'></div>

        <Input
          onChange={(e) => {
            setEditingPerson((prevValue) => {
              return { ...prevValue, phone: e.target.value };
            });
          }}
          value={editingPerson?.phone}
          placeholder='phone'
        />
      </Modal>
      <ButtonComponent setDataSource={setDataSource} />
    </>
  );
}

export default App;
