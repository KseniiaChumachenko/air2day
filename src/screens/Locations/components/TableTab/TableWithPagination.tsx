import React, { useMemo } from "react";
import moment from "moment";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@material-ui/core";
import { Trans } from "@lingui/macro";

import { Loading } from "./Loading";
import useStyles from "./styles";
import {
  SensorPollutionDataOverHourAvg,
  UseRemappedDataResults
} from "../../model";
import { useUpdateSearchData } from "../../../../store/SearchDataProvider";
import { Header } from "../Header";

const dateFormat = (date: string) => moment(date).format("DD/MM/YYYY");
const dayFormat = (date: string) => moment(date).format("DD");
const timeFormat = (date: string) => moment(date).format("HH:mm");

interface TableWithPaginationProps extends UseRemappedDataResults {
  title: React.ReactNode;
  loading?: boolean;
  data: SensorPollutionDataOverHourAvg;
  rowsPerPage?: number;
}

export const TableWithPagination = ({
  title,
  loading,
  data,
  hourAvgs,
  sensorIds,
  rowsPerPage = 10
}: TableWithPaginationProps) => {
  const [page, setPage] = React.useState(0);
  const [customRowsPerPage, setRowsPerPage] = React.useState(rowsPerPage);
  const [hourAvg, setHourAvg] = React.useState(hourAvgs[0]);

  const classes = useStyles({});

  const tableData = useMemo(() => data[hourAvg], [data, hourAvg]);
  const dataLength = useMemo(() => tableData.length || 0, [tableData]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Header
        title={title}
        setHourAvg={setHourAvg}
        hourAvg={hourAvg}
        hourAvgs={hourAvgs}
      />
      <Table className={classes.table} stickyHeader={true} size={"small"}>
        <TableHeader />
        <TableBody>
          {loading ? (
            <Loading />
          ) : (
            dataLength > 0 &&
            tableData
              .slice(
                page * customRowsPerPage,
                page * customRowsPerPage + customRowsPerPage
              )
              .map((item, key) => {
                const dateStamp =
                  dateFormat(item.from) === dateFormat(item.to)
                    ? dateFormat(item.from)
                    : String(dayFormat(item.from) + "-" + dateFormat(item.to));
                return (
                  <TableRow key={key}>
                    <TableCell>{dateStamp}</TableCell>
                    <TableCell>
                      {timeFormat(item.from) + "-" + timeFormat(item.to)}
                    </TableCell>
                    {sensorIds.map((s, index) => (
                      <TableCell key={index}>{item[s]}</TableCell>
                    ))}
                  </TableRow>
                );
              })
          )}
        </TableBody>
      </Table>

      {dataLength > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={dataLength}
          rowsPerPage={customRowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};

const TableHeader = () => {
  const { searchData } = useUpdateSearchData();
  const { locations } = useMemo(() => searchData, [searchData]);

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Trans>Date</Trans>
        </TableCell>
        <TableCell>
          <Trans>Time</Trans>
        </TableCell>
        {locations.map((l, index) => (
          <TableCell key={index}>
            <Trans>{l.code} [µg/m³]</Trans>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
