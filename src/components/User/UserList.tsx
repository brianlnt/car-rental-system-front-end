import { Box, Button } from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridFilterModel,
    GridPaginationModel,
    GridSortItem,
} from "@mui/x-data-grid";
import { useContext, useEffect, useState, useCallback } from "react";
import { UserService } from "../../services/user/userService";
import { UserContext } from "../../contexts/UserContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { User } from "../../models/User";
import { useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FilterAndSortTable } from "../../models/FilterAndSortTable";
import { Page } from "../../models/Page";
import { debounce } from "lodash";

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
        filterable: false,
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

export default function UserList() {
    const location = useLocation();
    const userService = new UserService();
    const { updateLoading } = useContext(GlobalContext);
    const { users, updateUsers, totalRows, updateTotalRows } =
        useContext(UserContext);

    const initFilterAndSortTable: FilterAndSortTable = {
        page: 0,
        pageSize: 10,
        sortModels: [],
        filterModel: { items: [] },
    };

    const [filterAndSortTable, setFilterAndSortTable] =
        useState<FilterAndSortTable>(initFilterAndSortTable);

    const fetchUserList = async (filterAndSortTable: FilterAndSortTable) => {
        updateLoading(true);
        const userPage: Page<User> = await userService.getUsersByFilter(
            filterAndSortTable
        );
        updateUsers(userPage.content);
        updateTotalRows(userPage.totalElements);
        updateLoading(false);
    };

    const debouncedFetchData = useCallback(debounce(fetchUserList, 500), []);

    useEffect(() => {
        debouncedFetchData(filterAndSortTable);
    }, [location, filterAndSortTable]);

    const changePaginationModel = (paginationModel: GridPaginationModel) => {
        setFilterAndSortTable((prev) => ({
            ...prev,
            page: paginationModel.page,
            pageSize: paginationModel.pageSize,
        }));
    };

    const changeSortModel = (sortModels: GridSortItem[]) => {
        setFilterAndSortTable((prev) => ({
            ...prev,
            sortModels: [...sortModels],
        }));
    };

    const changeFilterModel = (filterModel: GridFilterModel) => {
        setFilterAndSortTable((prev) => ({
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
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: filterAndSortTable.pageSize,
                        },
                    },
                }}
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
