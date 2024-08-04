import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button } from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridFilterModel,
    GridPaginationModel,
    GridSortItem,
} from "@mui/x-data-grid";
import { debounce } from "lodash";
import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { VehicleContext } from "../../contexts/VehicleContext";
import { Vehicle } from '../../models/Vehicle';
import { FilterAndSortTable } from "../../models/FilterAndSortTable";
import { Page } from "../../models/Page";
import { VehicleService } from "../../services/vehicle/vehicleService";

const columns: GridColDef<Vehicle>[] = [
    {
        field: "vehicleId",
        headerName: "Id",
        width: 100,
        editable: true,
    },
    {
        field: "make",
        headerName: "Make",
        width: 150,
        editable: true,
    },
    {
        field: "model",
        headerName: "Model",
        width: 150,
        editable: true,
    },
    {
        field: "year",
        headerName: "Year",
        width: 100,
        editable: true,
    },
    {
        field: "licensePlateNumber",
        headerName: "License Plate Number",
        width: 220,
        editable: true,
    },
    {
        field: "rentalPrice",
        headerName: "Rental Price",
        width: 150,
        editable: true,
    },
    {
        field: "availableStatus",
        headerName: "Status",
        width: 120,
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
                console.log("edit", params.row.vehicleId);
            };

            const onClickDelete = () => {
                console.log("delete", params.row.vehicleId);
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

export default function VehicleList() {
    const location = useLocation();
    const vehicleService = new VehicleService();
    const { updateLoading } = useContext(GlobalContext);
    const { vehicles, updateVehicles, totalRows, updateTotalRows } = useContext(VehicleContext);

    const initFilterAndSortTable: FilterAndSortTable = {
        page: 0,
        pageSize: 10,
        sortModels: [],
        filterModel: { items: [] },
    };

    const [filterAndSortTable, setFilterAndSortTable] = useState<FilterAndSortTable>(initFilterAndSortTable);

    const fetchVehicleList = async (filterAndSortTable: FilterAndSortTable) => {
        updateLoading(true);
        const vehiclePage: Page<Vehicle> = await vehicleService.getVehiclesByFilter(
            filterAndSortTable
        );
        updateVehicles(vehiclePage.content);
        updateTotalRows(vehiclePage.totalElements);
        updateLoading(false);
    };

    const debouncedFetchData = useCallback(debounce(fetchVehicleList, 500), []);

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
                rows={vehicles}
                columns={columns}
                getRowId={(row) => row.vehicleId}
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
