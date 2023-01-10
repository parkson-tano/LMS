import React, {useState} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { useTab } from '@mui/base';
import Button from "@mui/material/Button";
function FileUpload() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [showMapper, setShowMapper] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [credentials, setCredentials] = useState('');
  const BaseURL = "https://lms-production-a3f7.up.railway.app/"
  const [fileHeaders, setFileHeaders] = useState()

  const DATA = [
    "id",
    "name",
    "mobile_number",
    "status",
    "address",
    "industry",
    "website",
    "contacts",
    "pipelines",
    "notes",]

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        setShowMapper(true);
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

 const handleChange = (event, key) => {
   array[key] = array[event.target.value]
   delete array[event.target.value];
 };


  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));
  for (let i=0; i<array.length; i++) {
    axios.post(BaseURL, {
      name: array[i]["Name"],
      mobile_number: array[i]["Mobile"],
      status: array[i]["Status"].toLowerCase(),
      address: array[i]["Address"],
      industry: array[i]["Industry"],
      website: array[i]["Website"],
      contacts: array[i]["Contact"],
      pipelines: array[i]["Pipelines"],
      notes: array[i]["Notes "],
    })
    .then((response) => {
      console.log(response.data)
    })
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>CSV IMPORT </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      <br />
      {showMapper && (
        <Box
          sx={{
            minWidth: 120,
            paddingLeft: 30,
            paddingRight: 30,
            marginBottom: 5,
          }}
        >
          <h3>Header Mapper</h3>

          {headerKeys.map((key) => (
            <>
              <FormControl fullWidth sx={{ marginBottom: 5, maxWidth: "auto" }}>
                <InputLabel id={key}>{key}</InputLabel>
                <Select
                  labelId="select-label"
                  label={key}
                  // value = ""
                  onChange={handleChange}
                >
                  {Object.values(DATA).map((val) => (
                    <MenuItem value={val}>{val}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ))}
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setShowTable(true);
            }}
          >
            Proceed
          </Button>
        </Box>
      )}
      {showTable && (
        <Box
          sx={{
            minWidth: 120,
            paddingLeft: 20,
            paddingRight: 20,
            marginBottom: 5,
          }}
        >
          <table>
            <thead>
              <tr key={"header"}>
                {headerKeys.map((key) => (
                  <th>{key}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {array.map((item) => (
                <tr key={item.id}>
                  {Object.values(item).map((val) => (
                    <td>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}
    </div>
  );
}

export default FileUpload