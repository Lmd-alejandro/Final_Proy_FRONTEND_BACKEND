import { MenuItem, FormControl, Select, FormHelperText } from "@mui/material";

const SelectField = ({
  label,
  nameFiled,
  options,
  eventOnChange,
  valueState,
  helper,
  err,
}) => {
  return (
    <FormControl
      fullWidth
      variant="standard"
      sx={{ marginTop: 2, marginBottom: -2 }}
    >
      <Select
        id="demo-simple-select"
        name={nameFiled}
        labelId="demo-simple-select-label"
        value={valueState}
        onChange={eventOnChange}
        error={err}
        displayEmpty
        renderValue={(selected) => {
          console.log(selected);
          if (selected?.length === 0) {
            return <span>{label}</span>;
          }

          return selected;
        }}
      >
        {options.map(({ id, text }) => {
          return (
            <MenuItem key={id} value={text}>
              {text}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{helper}</FormHelperText>
    </FormControl>
  );
};

export default SelectField;
