import React, { useState, useEffect } from "react";
import instance from "../constant/instance";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    Button,
    Box,
  } from "@mui/material";
const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchUsers(currentPage, limit);
  }, [currentPage]);

  const fetchUsers = async (page, limit) => {
    try {
      const response = await instance.get(`/auth/allusers?page=${page}&limit=${limit}`);
      setUsers(response.data.allUsers);
      setTotalPages(response.data.totalUsers);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customer List
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((user) => (
            <TableRow key={user?._id}>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.phone}</TableCell>
              <TableCell>{user?.address}</TableCell>
              <TableCell>{user?.role === 0 ? "User" : "Admin"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination controls */}
      <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          sx={{ marginRight: 2 }}
        >
          Previous
        </Button>
        <Typography variant="body1">
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          sx={{ marginLeft: 2 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default UserTable;
