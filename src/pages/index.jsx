import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const Index = () => {
  const [data, setData] = useState({
    inputan: "",
  });
  const [show, setShow] = useState({});
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log("data : ", data.inputan);
    // Tampilkan data.inputan setelah tombol diklik
    setData({
      ...data,
      inputan: data.inputan, // Tidak perlu mengubah nilai data.inputan setelah tombol diklik
    });
    setShow({
      inputan: data.inputan,
    });
  };
  return (
    <>
      <TextField
        name="inputan"
        onChange={(e) => setData({ ...data, inputan: e.target.value })}
      />
      <Button onClick={handleSubmit}>Submit</Button>

      {data.inputan && <h1>{data.inputan}</h1>}
    </>
  );
};

export default Index;
