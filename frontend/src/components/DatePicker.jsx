import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

 function DatePickerFunc(prop) {
  const [value, setValue] = useState(dayjs());

//   console.log("default val:");
// console.log(value);


  function dateSetter(event) {
    setValue(event)
    prop.dateAtAllAcc((prev) => ({
      ...prev,
      month: event.month() + 1,
      year: event.year()
    }));
    // console.log(event.month()+1);
  }

  
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
     
      views={['year', 'month']}
      value={value}
      onChange={dateSetter}
      minDate={dayjs('2020-01-01')}
      maxDate={dayjs('2030-12-31')}
      slotProps={{
        textField: {
          helperText: null,
          size: "small",
          variant: "outlined", 
          sx: {
            backgroundColor: "#ffffff", // light yellow
            borderRadius: "8px",
            input: {
              color: "#ffffff", // text color
              fontWeight: "bold",
            },
           
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#183B4E",
              },
              "&:hover fieldset": {
                borderColor: "#DDA853",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#DDA853",
              },
            },
          },
        },
      }}
        
    />
  </LocalizationProvider>
  );
}

export default DatePickerFunc;
