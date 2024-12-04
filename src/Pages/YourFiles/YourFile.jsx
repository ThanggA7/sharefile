import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";

function YourFiles() {
  const [files, setFiles] = useState([]); 
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(8); 
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/files", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFiles(response.data.files || []);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Hàm sao chép link
  const handleCopy = (fileId) => {
    navigator.clipboard.writeText(`http://127.0.0.1:5000/download/${fileId}`);
  };

  // Paginate file
  const paginatedFiles = files.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-6">Your Files</h2>
      <Paper className="w-full overflow-hidden rounded-lg shadow-lg bg-white">
        <TableContainer component={Paper} className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell className="text-gray-600 font-medium">
                  File Name
                </TableCell>
                <TableCell align="center" className="text-gray-600 font-medium">
                  File Size
                </TableCell>
                <TableCell align="center" className="text-gray-600 font-medium">
                  Last Modified
                </TableCell>
                <TableCell align="center" className="text-gray-600 font-medium">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedFiles.map((file, index) => (
                <TableRow key={index} hover className="hover:bg-gray-50">
                  <TableCell className="text-gray-800">
                    {file.filename}
                  </TableCell>
                  <TableCell align="center" className="text-gray-600">
                    {file.file_size}
                  </TableCell>
                  <TableCell align="center" className="text-gray-600">
                    {file.upload_date}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCopy(file.file_id)}
                      disabled={file.link === "N/A"}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg"
                    >
                      Copy Link
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 100]}
          component="div"
          count={files.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="bg-gray-100"
        />
      </Paper>
    </div>
  );
}

export default YourFiles;
