import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "../../../utils/axios";
import { InvalidChar } from "./InvalidChar";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

interface Values {
  name: string;
  venue: string;
  status: string;
  type: string;
  duration: any;
  price: any;
  number_of_slots: any;
  start_time: any;
  file: any;
  description: string;
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
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("duration", values.duration);
      formData.append("number_of_slots", values.number_of_slots);
      formData.append("price", values.price);
      formData.append("start_time", values.start_time);
      formData.append("status", values.status);
      formData.append("type", values.type);
      formData.append("venue", values.venue);
      formData.append("description", values.description);
      values.file && formData.append("banner", values.file);
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" to="/dashboard/events">
            Events
          </Link>
          <Typography color="textPrimary">Add Event</Typography>
        </Breadcrumbs>
      </div>

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
          description: "",
          file: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Card>
              <CardContent>
                <p>Fields marked * are required</p>
                <Grid container spacing={2}>
                  <Grid item xs={4} sm={4}>
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
                        <small className="text-danger">
                          {props.errors.name}
                        </small>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <FormControl margin="normal" fullWidth>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="price"
                        type="number"
                        label="Price GH₵ *"
                        name="price"
                        inputProps={{ min: "0", step: "0.01" }}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.price}
                        onKeyDown={InvalidChar}
                      />
                      {props.touched.price && (
                        <small className="text-danger">
                          {props.errors.price}
                        </small>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sm={4}>
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
                        onKeyDown={InvalidChar}
                      />
                      {props.touched.number_of_slots && (
                        <small className="text-danger">
                          {props.errors.number_of_slots}
                        </small>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sm={4}>
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
                  <Grid item xs={4} sm={4}>
                    <FormControl margin="normal" fullWidth>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="duration"
                        type="number"
                        inputProps={{ min: "0" }}
                        label="Duration | Hours *"
                        name="duration"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.duration}
                        onKeyDown={InvalidChar}
                      />
                      {props.touched.duration && (
                        <small className="text-danger">
                          {props.errors.duration}
                        </small>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <FormControl margin="normal" fullWidth>
                      <TextField
                        id="start_time"
                        name="start_time"
                        label="Start Time *"
                        type="datetime-local"
                        variant="outlined"
                        margin="normal"
                        fullWidth
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
                  <Grid item xs={4} sm={4}>
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
                  <Grid item xs={4} sm={4}>
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
                  <Grid item xs={4} sm={4}>
                    <FormControl margin="normal" fullWidth>
                      <TextField
                        label="Event Description"
                        placeholder="Description"
                        multiline
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="description"
                        id="description"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.description}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <FormControl margin="normal" fullWidth>
                      <label>Event Image</label>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="file"
                        type="file"
                        inputProps={{ accept: "image/*" }}
                        name="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          props.setFieldValue("file", e.target.files![0])
                        }
                      />
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
              </CardContent>
            </Card>
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
