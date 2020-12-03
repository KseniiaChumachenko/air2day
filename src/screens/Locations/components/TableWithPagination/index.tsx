import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  useTheme
} from "@material-ui/core";
import { Trans } from "@lingui/macro";

import useStyles from "./styles";
import { DataCardInfoItemProps } from "../../model";
import { useUpdateSearchData } from "../../../../store/SearchDataProvider";
import { analogousColors } from "../../../../store/ThemeProvider/theme";
import { EU_POLLUTION_LIMITS } from "../../../../constants/EU_POLLUTION_LIMITS";
import {
  dateFormat,
  dayFormat,
  timeFormat
} from "../../../../utils/dateTimeHelpers";

interface TableWithPaginationProps extends DataCardInfoItemProps {
  rowsPerPage?: number;
}

export const TableWithPagination = ({
  data,
  hourAvg,
  sensorIds,
  rowsPerPage = 15,
  pollutant
}: TableWithPaginationProps) => {
  const [page, setPage] = React.useState(0);
  const [customRowsPerPage, setRowsPerPage] = React.useState(rowsPerPage);

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

  const limitValue = (EU_POLLUTION_LIMITS as any)[pollutant as any] || 10000000;

  return (
    <>
      <Table className={classes.table} stickyHeader={true} size={"small"}>
        <TableHeader />
        <TableBody>
          {dataLength > 0 &&
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
                      <ColoredTableCell
                        isDangerous={item[s] > limitValue}
                        key={index}
                        value={item[s]}
                      />
                    ))}
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>

      {dataLength > 0 && (
        <TablePagination
          rowsPerPageOptions={[15, 25, 50, 100]}
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
          <TableCell key={index} style={{ color: analogousColors[index] }}>
            <Trans>{l.code} [µg/m³]</Trans>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const ColoredTableCell = ({
  value,
  isDangerous
}: {
  value: React.ReactNode;
  isDangerous: boolean;
}) => {
  const theme = useTheme();
  const color = useMemo(
    () => (isDangerous ? theme.palette.error.main : theme.palette.text.primary),
    [theme, isDangerous]
  );
  return (
    <TableCell style={{ color }}>
      <strong>{value}</strong>
    </TableCell>
  );
};
