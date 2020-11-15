import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "../../../utils/axios";

interface Values {
  name: string;
  venue: string;
  status: string;
  type: string;
  duration: number;
  price: number;
  number_of_slots: number;
  start_time: any;
}
interface PropsData {
  message: string;
  type: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface History {
  history: string[];
}

const Add: React.FC<History> = ({ history }) => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [type, setType] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    start_time: Yup.string().required("Required"),
    duration: Yup.number().required("Required"),
    price: Yup.number().required("Required"),
    number_of_slots: Yup.number().required("Required"),
  });

  const handleSubmit = async (values: Values) => {
    try {
      setLoading(true);
      const formData = {
        name: values.name,
        duration: values.duration,
        number_of_slots: values.number_of_slots,
        price: values.price,
        start_time: values.start_time,
        status: values.status,
        type: values.type,
        venue: values.venue,
      };
      const response = await axios.post("/event", formData);
      setLoading(false);
      const res = response.data;
      if (res.status.toLowerCase() === "success") {
        setOpen(true);
        setType("success");
        setMessage(res.message);
        setTimeout(() => {
          history.push("/dashboard/events");
        }, 5000);
      }
    } catch (error) {
      setOpen(true);
      setType("error");
      setLoading(false);
      console.log(error);
      const res = error.response.data;
      if (res.status === "validation error") {
        res.errors.map((error: any) => {
          return setMessage(error);
        });
      } else {
        setMessage(res.message);
      }
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div>
      <h4>Add Event</h4>
      <p>Fields marked * are required</p>
      <Notfication
        message={message}
        open={open}
        setOpen={setOpen}
        type={type}
      />
      <Formik
        initialValues={{
          name: "",
          price: 0,
          number_of_slots: 0,
          venue: "",
          duration: 0,
          start_time: "",
          type: "",
          status: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={4}>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="name"
                    type="text"
                    label="Name of Event *"
                    name="name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                  />
                  {props.touched.name && (
                    <small className="text-danger">{props.errors.name}</small>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="price"
                    type="number"
                    label="Price *"
                    name="price"
                    inputProps={{ min: "0", step: "0.01" }}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.price}
                  />
                  {props.touched.price && (
                    <small className="text-danger">{props.errors.price}</small>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="number_of_slots"
                    type="number"
                    label="Number of Slots *"
                    name="number_of_slots"
                    inputProps={{ min: "0" }}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.number_of_slots}
                  />
                  {props.touched.number_of_slots && (
                    <small className="text-danger">
                      {props.errors.number_of_slots}
                    </small>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="venue"
                    type="text"
                    label="Venue"
                    name="venue"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.venue}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="duration"
                    type="number"
                    inputProps={{ min: "0" }}
                    label="Duration *"
                    name="duration"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.duration}
                  />
                  {props.touched.duration && (
                    <small className="text-danger">
                      {props.errors.duration}
                    </small>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    id="start_time"
                    name="start_time"
                    label="Start Time *"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={props.values.start_time}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  {props.touched.start_time && (
                    <small className="text-danger">
                      {props.errors.start_time}
                    </small>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="type"
                    type="text"
                    label="Type"
                    name="type"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.type}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={4}>
                <FormControl margin="normal" fullWidth>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    select
                    id="status"
                    label="Status"
                    name="status"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.status}
                  >
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                Save Form
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

const Notfication: React.FC<PropsData> = (props) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    props.setOpen(false);
  };

  return (
    <Snackbar open={props.open} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={props.type === "success" ? "success" : "error"}
        variant="filled"
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Add;