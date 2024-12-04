import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Avatar,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [isVisible, setIsVisible] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setSnackbarMessage("Vui lòng đăng nhập lại.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    axios
      .get("http://localhost:5000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { avatar, username, fullname } = response.data;
        setAvatar(avatar || "/path/to/default-avatar.jpg");
        setUsername(username);
        setFullName(fullname);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setAvatar("/path/to/default-avatar.jpg");
        setSnackbarMessage("Không thể tải dữ liệu hồ sơ.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  }, [token]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      axios
        .put(
          "http://localhost:5000/user",
          { avatar: formData },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setAvatar(response.data.avatar);
          setSnackbarMessage("Cập nhật avatar thành công!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
        })
        .catch(() => {
          setSnackbarMessage("Lỗi khi cập nhật avatar.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
    }
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setSnackbarMessage("Mật khẩu không khớp!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (newPassword.length < 8) {
      setSnackbarMessage("Mật khẩu phải có ít nhất 8 ký tự.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    axios
      .put(
        "http://127.0.0.1:5000/user",
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setSnackbarMessage("Mật khẩu đã được thay đổi thành công!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      })
      .catch(() => {
        setSnackbarMessage("Lỗi khi thay đổi mật khẩu.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <Avatar
            alt="User Avatar"
            src={avatar}
            sx={{ width: 120, height: 120 }}
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faUpload} className="text-white" />
          </label>
          <input
            id="avatar-upload"
            type="file"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <div>
          <Typography variant="h5" className="text-white font-bold">
            {fullName}
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            @{username}
          </Typography>
        </div>
      </div>
      <Typography variant="h6" className="text-white font-bold mb-2">
        Token của bạn
      </Typography>

      <div className="w-full h-[50px]  rounded-[4px] mt-1">
        <div className="relative w-full">
          <input
            value={token}
            className="w-full h-full rounded-[4px] bg-transparent text-white text-[18px] border border-gray-300 p-2"
            type={isVisible ? "text" : "password"}
            readOnly
          />
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-600 px-2 py-1 rounded hover:bg-gray-500"
          >
            {isVisible ? "Ẩn" : "Hiện"}
          </button>
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-5 mt-3">
        <Typography variant="h6" className="text-white font-bold mb-2">
          Thay đổi mật khẩu
        </Typography>
        <div className="">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-[white]"
          >
            Mật khẩu mới
          </label>
          <input
            placeholder="Nhập mật khẩu!"
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-[white]"
          />
        </div>

        <div className="">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-[white]"
          >
            Xác nhận mật khẩu
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu!"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-[white]"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePasswordChange}
          className="mt-4"
        >
          Thay đổi mật khẩu
        </Button>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Profile;
