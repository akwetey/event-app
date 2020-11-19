import React from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import Badge from "@material-ui/core/Badge";
import axios from "../../../utils/axios";
import { Link, useRouteMatch } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";

interface Events {
  name: string;
  venue: string;
  type: string;
  start_time: any;
  duration: any;
  number_of_slot: number;
  registered_slots: number;
  remaining_slots: number;
  status: string;
  mask: number;
}

interface History {
  history: string[];
}

type ApiDataType = {
  data: Events[];
};

const EventTable: React.FC<History> = ({ history }) => {
  const [rows, setRows] = React.useState<Events[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const match = useRouteMatch();
  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiDataType>("/event");
        if (response.status === 200) {
          const res = response.data;
          if (isMounted) {
            setLoading(false);
            setRows(res.data);
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
  }, []);
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
          <Typography color="textPrimary">Events</Typography>
        </Breadcrumbs>
      </div>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/dashboard/events/add-event")}
          >
            Add Event
          </Button>
          <div style={{ marginTop: "50px" }}>
            <TableContainer style={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Venue</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Number of Slots</TableCell>
                    <TableCell>Registered Slots</TableCell>
                    <TableCell>Remaining Slots</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                {loading ? (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={10}>
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {rows.length > 0 ? (
                      rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((data, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell>{data.name}</TableCell>
                              <TableCell>{data.venue}</TableCell>
                              <TableCell>{data.type}</TableCell>
                              <TableCell>
                                {data.status.toLowerCase() === "active" ? (
                                  <Badge
                                    color="primary"
                                    badgeContent="Active"
                                    style={{ marginLeft: "20px" }}
                                  ></Badge>
                                ) : (
                                  <Badge
                                    color="secondary"
                                    badgeContent="Inactive"
                                    style={{ marginLeft: "20px" }}
                                  ></Badge>
                                )}
                              </TableCell>
                              <TableCell>{data.start_time}</TableCell>
                              <TableCell>{data.duration}</TableCell>
                              <TableCell>{data.number_of_slot}</TableCell>
                              <TableCell>{data.registered_slots}</TableCell>
                              <TableCell>{data.remaining_slots}</TableCell>
                              <TableCell>
                                <Tooltip
                                  title="Update Event"
                                  arrow
                                  placement="left-start"
                                >
                                  <Link
                                    to={{
                                      pathname: `${match.path}/update-event/${data.mask}`,
                                      state: { mask: data.mask },
                                    }}
                                  >
                                    <IconButton aria-label="Update Event">
                                      <EditIcon />
                                    </IconButton>
                                  </Link>
                                </Tooltip>
                                <Tooltip
                                  title="View Details"
                                  arrow
                                  placement="left-start"
                                >
                                  <Link
                                    to={{
                                      pathname: `${match.path}/${data.mask}`,
                                      state: { mask: data.mask },
                                    }}
                                  >
                                    <IconButton aria-label="View Details">
                                      <VisibilityIcon />
                                    </IconButton>
                                  </Link>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          );
                        })
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={10}>
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
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default EventTable;
