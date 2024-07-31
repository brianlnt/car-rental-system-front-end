import { Box, Button } from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridFilterItem,
    GridFilterModel,
    GridPaginationModel,
    GridSortItem,
    GridSortModel,
} from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { UserService } from "../../services/user/userService";
import { UserContext } from "../../contexts/UserContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { User } from "../../models/User";
import { useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: GridColDef<User>[] = [
    {
        field: "username",
        headerName: "Username",
        width: 150,
        editable: true,
    },
    {
        field: "firstname",
        headerName: "First Name",
        width: 200,
        editable: true,
    },
    {
        field: "lastname",
        headerName: "Last Name",
        width: 200,
        editable: true,
    },
    {
        field: "email",
        headerName: "Email",
        width: 150,
        editable: true,
    },
    {
        field: "address",
        headerName: "Address",
        width: 200,
        editable: true,
    },
    {
        field: "phone",
        headerName: "Phone",
        width: 150,
        editable: true,
    },
    {
        field: "action",
        headerName: "Action",
        width: 150,
        sortable: false,
        renderCell: (params) => {
            const onClickEdit = () => {
                console.log("edit", params.row.userId);
            };

            const onClickDelete = () => {
                console.log("delete", params.row.userId);
            };

            return (
                <Box>
                    <Button onClick={onClickEdit}>
                        <EditIcon />
                    </Button>
                    <Button onClick={onClickDelete}>
                        <DeleteIcon />
                    </Button>
                </Box>
            );
        },
    },
];

type TableChangeType = {
    page: number;
    pageSize: number;
    sortModel: GridSortItem[];
    filterModel: { items: GridFilterItem[] };
};

export default function UserList() {
    const location = useLocation();
    const userService = new UserService();
    const { updateLoading } = useContext(GlobalContext);
    const { users, updateUsers, totalRows, updateTotalRows } =
        useContext(UserContext);

    const initTableChange: TableChangeType = {
        page: 1,
        pageSize: 10,
        sortModel: [],
        filterModel: { items: [] },
    };

    const [tableChangeType, setTableChangeType] =
        useState<TableChangeType>(initTableChange);

    useEffect(() => {
        fetchUserList();
    }, [location, tableChangeType]);

    const fetchUserList = async () => {
        updateLoading(true);
        const users: User[] = await userService.getAllUsers();
        updateUsers(users);
        updateTotalRows(users.length);
        updateLoading(false);
    };

    const changePaginationModel = (paginationModel: GridPaginationModel) => {
        setTableChangeType((prev) => ({
            ...prev,
            page: paginationModel.page,
            pageSize: paginationModel.pageSize,
        }));
    };

    const changeSortModel = (sortModels: GridSortItem[]) => {
        setTableChangeType((prev) => ({
            ...prev,
            sortModel: [...sortModels],
        }));
    };

    const changeFilterModel = (filterModel: GridFilterModel) => {
        setTableChangeType((prev) => ({
            ...prev,
            filterModel: {
                items: filterModel.items,
            },
        }));
    };

    return (
        <Box sx={{ height: 400, width: "100%", mt: 2 }}>
            <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row.userId}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 15]}
                rowCount={totalRows}
                filterMode="server"
                sortingMode="server"
                paginationMode="server"
                onPaginationModelChange={changePaginationModel}
                onSortModelChange={changeSortModel}
                onFilterModelChange={changeFilterModel}
            />
        </Box>
    );
}
