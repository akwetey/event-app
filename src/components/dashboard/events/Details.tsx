import React from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import axios from "../../../utils/axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Workbook from "react-excel-workbook";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";

interface Events {
  name: string;
  venue: string;
  type: string;
  start_time: any;
  duration: number;
  price: number;
  number_of_slots: number;
  registered_slots: number;
  remaining_slots: number;
  attendants: [];
}

interface Attendants {
  first_name: string;
  last_name: string;
  phone_number: string;
  amount_paid: string;
  slot_number: number;
  email: string;
}

interface Location {
  location: any;
}

const Details: React.FC<Location> = (props) => {
  const initialState: Events = {
    name: "",
    venue: "",
    type: "",
    start_time: "",
    duration: 0,
    price: 0,
    number_of_slots: 0,
    registered_slots: 0,
    remaining_slots: 0,
    attendants: [],
  };
  const [rows, setRows] = React.useState(initialState);
  const [attendants, setAttendants] = React.useState<Attendants[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const mask = props.location.state.mask;

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get<Events>(`/event/${mask}`);
        if (response.status === 200) {
          const res = response.data;
          if (isMounted) {
            setLoading(false);
            setRows(res);
            setAttendants(res.attendants);
          }
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
        }
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [mask]);

  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: {
    target: { value: React.ReactText };
  }) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
          <Typography color="textPrimary">Event Details</Typography>
        </Breadcrumbs>
      </div>
      <Card>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={6} sm={4} md={4}>
              <div className="table">
                <TableRow>
                  <TableHead>Event Name:</TableHead>
                  <TableCell>{rows.name}</TableCell>
                </TableRow>
              </div>
              <div className="table">
                <TableRow>
                  <TableHead>Event Venue:</TableHead>
                  <TableCell>{rows.venue}</TableCell>
                </TableRow>
              </div>
              <div className="table">
                <TableRow>
                  <TableHead>Event Type:</TableHead>
                  <TableCell>{rows.type}</TableCell>
                </TableRow>
              </div>
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <div className="table">
                <TableRow>
                  <TableHead>Event Start Time:</TableHead>
                  <TableCell>{rows.start_time}</TableCell>
                </TableRow>
              </div>
              <div className="table">
                <TableRow>
                  <TableHead>Event Duration:</TableHead>
                  <TableCell>{rows.duration} hours</TableCell>
                </TableRow>
              </div>
              <div className="table">
                <TableRow>
                  <TableHead>Event Price:</TableHead>
                  <TableCell>GH₵ {rows.price}</TableCell>
                </TableRow>
              </div>
            </Grid>
            <Grid item xs={6} sm={4} md={4}>
              <div className="table">
                <TableRow>
                  <TableHead>Number of Slots:</TableHead>
                  <TableCell>{rows.number_of_slots}</TableCell>
                </TableRow>
              </div>
              <div className="table">
                <TableRow>
                  <TableHead>Registered Slots</TableHead>
                  <TableCell>{rows.registered_slots} </TableCell>
                </TableRow>
              </div>
              <div className="table">
                <TableRow>
                  <TableHead>Remaining Slots:</TableHead>
                  <TableCell>{rows.remaining_slots}</TableCell>
                </TableRow>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={12} style={{ marginTop: "50px" }}>
              <h3>Registered Attendants</h3>
            </Grid>
          </Grid>
          <div style={{ marginTop: "50px" }}>
            <TableContainer style={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Amount Paid</TableCell>
                    <TableCell>Slot Number</TableCell>
                  </TableRow>
                </TableHead>
                {loading ? (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {attendants.length > 0 ? (
                      attendants
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((data, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell>{data.first_name}</TableCell>
                              <TableCell>{data.last_name}</TableCell>
                              <TableCell>{data.phone_number}</TableCell>
                              <TableCell>{data.email}</TableCell>
                              <TableCell>{data.amount_paid}</TableCell>
                              <TableCell>{data.slot_number}</TableCell>
                            </TableRow>
                          );
                        })
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          No Data Found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={attendants.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            {attendants.length > 0 && (
              <div className="float-right my-4">
                <Workbook
                  filename="Event Details.xlsx"
                  element={
                    <Button
                      variant="contained"
                      color="default"
                      startIcon={<ImportExportIcon />}
                    >
                      Export
                    </Button>
                  }
                >
                  <Workbook.Sheet name={"Visit History"} data={attendants}>
                    <Workbook.Column label="First Name" value="first_name" />
                    <Workbook.Column label="Last Name" value="last_name" />
                    <Workbook.Column
                      label="Phone Number"
                      value="phone_number"
                    />
                    <Workbook.Column label="Email" value="email" />
                    <Workbook.Column label="Slot Number" value="slot_number" />
                    <Workbook.Column label="Amount Paid" value="amount_paid" />
                    <Workbook.Column
                      label="Date Registered"
                      value="registered_on"
                    />
                  </Workbook.Sheet>
                </Workbook>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
