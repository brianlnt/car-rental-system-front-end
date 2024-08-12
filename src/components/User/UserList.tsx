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

export default function UserList() {
    const location = useLocation();
    const { updateLoading } = useContext(GlobalContext);
    const {
        users,
        totalRows,
        isCompletedAddUser,
        isCompletedEditUser,
        isCompletedDeleteUser,
        updateUsers,
        updateTotalRows,
        updateSelectedUserId,
        updateIsCompletedAddUser,
        updateIsCompletedEditUser,
        updateIsCompletedDeleteUser,
        updateIsShowUpdateUserDialog,
        updateIsShowDeleteUserDialog,
    } = useContext(UserContext);

    const userService = new UserService();
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
                    updateSelectedUserId(params.row.userId || 0);
                    updateIsShowUpdateUserDialog(true);
                };

                const onClickDelete = async () => {
                    updateSelectedUserId(params.row.userId || 0);
                    updateIsShowDeleteUserDialog(true);
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
        resetCompletedUserEvent();
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

    useEffect(() => {
        if (
            isCompletedAddUser ||
            isCompletedEditUser ||
            isCompletedDeleteUser
        ) {
            debouncedFetchData(filterAndSortTable);
        }
    }, [isCompletedAddUser, isCompletedEditUser, isCompletedDeleteUser]);

    const resetCompletedUserEvent = () => {
        updateIsCompletedAddUser(false);
        updateIsCompletedEditUser(false);
        updateIsCompletedDeleteUser(false);
    };

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
