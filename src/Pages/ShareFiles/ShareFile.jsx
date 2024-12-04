import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Box,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShareFiles() {
  const [files, setFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/shared/files", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(response.data.shared_files || []);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    const fetchFriends = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/friends", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriends(response.data.friends || []);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    const chooseFile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/files", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSharedFiles(response.data.files || []);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    chooseFile();
    fetchFiles();
    fetchFriends();
  }, []);

  const handleShare = async () => {
    if (!selectedFriend || !selectedFile) {
      toast.error("Vui lòng nhập username và chọn file để chia sẻ!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:5000/friend/share",
        { file_id: selectedFile, to_user: selectedFriend },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Đã chia sẻ file với ${selectedFriend}!`);
    } catch (error) {
      console.error("Error sharing file:", error);
      toast.error("Chia sẻ file thất bại!");
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-6">Share Files</h2>

      <Box sx={{ width: "100%" }}>
        <Tabs
          value={tabIndex}
          onChange={(e, newIndex) => setTabIndex(newIndex)}
          centered
          className="text-white"
        >
          <Tab label="Files Shared With Me" className="text-white" />
          <Tab label="Share Files With UserName" className="text-white" />
        </Tabs>

        {tabIndex === 0 && (
          <TableContainer component={Paper} className="overflow-x-auto mt-4">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-200">
                  <TableCell className="text-gray-600 font-medium">
                    File Name
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-gray-600 font-medium"
                  >
                    Shared By
                  </TableCell>
                  <TableCell
                    align="center"
                    className="text-gray-600 font-medium"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((f, index) => {
                  return (
                    <TableRow key={index} hover className="hover:bg-gray-50">
                      <TableCell className="text-gray-800">
                        {f.filename}
                      </TableCell>
                      <TableCell align="center" className="text-gray-600">
                        {f.shared_by}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          href={f.download_link} // Link tải file
                          rel="noopener noreferrer"
                        >
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {tabIndex === 1 && (
          <div className="mt-4">
            <div className="flex justify-center items-center mb-4 gap-4">
              <Select
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
                displayEmpty
                className="mr-4 bg-white text-white w-[850px]"
              >
                <MenuItem value="">Chọn file</MenuItem>
                {sharedFiles.map((file) => (
                  <MenuItem key={file.file_id} value={file.file_id}>
                    {file.filename}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                placeholder="Nhập Username"
                variant="outlined"
                value={selectedFriend}
                onChange={(e) => setSelectedFriend(e.target.value)}
                className="mr-4 bg-[#dedede] text-white w-[250px]"
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleShare}
                className=" text-white font-semibold py-1 px-3 rounded-lg"
              >
                Chia sẻ
              </Button>
            </div>
          </div>
        )}
      </Box>

      <ToastContainer />
    </div>
  );
}

export default ShareFiles;
