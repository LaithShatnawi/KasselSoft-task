/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";
import "@fontsource/roboto/400.css";

export default function Table({ rows, columns }) {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
}
