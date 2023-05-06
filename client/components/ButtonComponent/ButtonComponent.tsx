import React, { useState } from "react";
import { Button } from "antd";
import AddPerson from "../addPersonComponent/AddPerson";

type Props = {
  setDataSource: (data: []) => void;
};

const ButtonComponent = ({ setDataSource }: Props) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <Button onClick={() => setIsAdding(true)}>Add person</Button>
      <AddPerson
        setDataSource={setDataSource}
        isAdding={isAdding}
        setIsAdding={setIsAdding}
      />
    </>
  );
};

export default ButtonComponent;
