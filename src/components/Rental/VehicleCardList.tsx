import React, { useContext, useEffect } from "react";
import {
    Card,
    Divider,
    Button,
    List,
    ListItem,
    Select,
    MenuItem,
    FormControl,
    Typography,
    Grid,
    Box,
    SelectChangeEvent,
    FormControlLabel,
    Checkbox,
    CardHeader,
    Pagination,
} from "@mui/material";
import { Vehicle } from "../../models/Vehicle";
import { RentalContext } from "../../contexts/RentalContext";
import { FilterAndSortTable } from "../../models/FilterAndSortTable";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Page } from "../../models/Page";
import { VehicleService } from "../../services/vehicle/vehicleService";
import { GridFilterItem, GridFilterModel, GridPaginationModel, GridSortDirection, GridSortItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function VehicleCardList () {
    const { updateLoading } = useContext(GlobalContext);
    const { vehicles, 
            updateVehicles,
            updateTotalRows,
            filterAndSortTable,
            updateFilterAndSortTable
        } = useContext(RentalContext);
    const vehicleService = new VehicleService();

    const fetchVehicleList = async (filterAndSortTable: FilterAndSortTable) => {
        updateLoading(true);
        const vehiclePage: Page<Vehicle> = await vehicleService.getVehiclesByFilter(
            filterAndSortTable
        );
        updateVehicles(vehiclePage.content);
        updateTotalRows(vehiclePage.totalElements);
        updateLoading(false);
    };

    useEffect(() => { fetchVehicleList(filterAndSortTable)}, [filterAndSortTable]);

    const handleSort = (event: SelectChangeEvent) => {
        const sortModels: GridSortItem[] = [{field: "rentalPrice", sort: event.target.value as GridSortDirection}];
        changeSortModel(sortModels);
    }

    const changeSortModel = (sortModels: GridSortItem[]) => {
        updateFilterAndSortTable({
            ...filterAndSortTable,
            sortModels: [...sortModels],
        });
    };

    const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked){
            const { field, value, operator } = JSON.parse(event.target.value);
            const filterModel: GridFilterModel = {items: [{field: field, value: value, operator: operator}]}
            console.log(filterModel)
            changeFilterModel(filterModel);
        } else {
            updateFilterAndSortTable( {
                page: 0,
                pageSize: 10,
                sortModels: [] as GridSortItem[],
                filterModel: { items: [] as GridFilterItem[]},
            })
        }
    };

    const changeFilterModel = (filterModel: GridFilterModel) => {
        updateFilterAndSortTable({
            ...filterAndSortTable,
            filterModel: {
                items: filterModel.items,
            },
        });
    };

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        const paginationModel = {page: page-1, pageSize: 10}
        changePaginationModel(paginationModel);
    }

    const changePaginationModel = (paginationModel: GridPaginationModel) => {
        updateFilterAndSortTable({
            ...filterAndSortTable,
            page: paginationModel.page,
            pageSize: paginationModel.pageSize,
        });
    };

    const navigate = useNavigate();

    const handleSelectVehicle = (vehicle: Vehicle) => {
        navigate("/reservation", { state: { selectedVehicle: vehicle } });
    };

    return (
        <>
        <Grid container spacing={2}>
        <Grid item xs={3}>
        {/* Sidebar Filters */}
        <Card variant="outlined" sx={{ p: 2 }}>
            <CardHeader title="Filters" />
            <Divider />
            <Typography variant="h6" sx={{ mt: 2 }}>MILEAGE</Typography>
            <Box>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Unlimited Mileage"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="Limited Mileage"
                />
            </Box>
            <Divider />
            <Typography variant="h6" sx={{ mt: 2 }}>MAKE</Typography>
            <Box>
                <FormControlLabel
                    control={<Checkbox value={JSON.stringify({ field: "make", value: "honda", operator: "contains" })} onChange={handleCheckBox}/>}
                    label="Honda"
                />
                <FormControlLabel
                    control={<Checkbox value={JSON.stringify({ field: "make", value: "toyota", operator: "contains" })} onChange={handleCheckBox}/>}
                    label="Toyota"
                />
                <FormControlLabel
                    control={<Checkbox value={JSON.stringify({ field: "make", value: "chervolet", operator: "contains" })} onChange={handleCheckBox}/>}
                    label="Chervolet"
                />
                <FormControlLabel
                    control={<Checkbox value={JSON.stringify({ field: "make", value: "mazda", operator: "contains" })} onChange={handleCheckBox}/>}
                    label="Mazda"
                />
            </Box>
            <Divider />
            <Typography variant="h6" sx={{ mt: 2 }}>FUEL TYPE</Typography>
            <Box>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Gasoline Vehicle"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="Electric Vehicle"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="Hybrid Vehicle"
                />
            </Box>
            <Divider />
            <Typography variant="h6" sx={{ mt: 2 }}>NUMBER OF PASSENGERS</Typography>
            <Box>
                <FormControlLabel
                    control={<Checkbox />}
                    label="2+"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="4+"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="5+"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="7+"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="8+"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="15+"
                />
            </Box>
        </Card>
        </Grid>

        <Grid item xs={9}>
        {/* Main Content */}
        <Card variant="outlined" sx={{ p: 2 }}>
            <Grid container alignItems="center" justifyContent="space-between">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ mr: 2, fontWeight: 'bold' }}>Choose a Vehicle</Typography>
                <Typography variant="subtitle1" sx={{ ml: 25 }}>{ vehicles?.length ?? 0} Results</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', mr: 1 }}>SORT BY</Typography>
                <FormControl sx={{ minWidth: 160 }}>
                    <Select
                        defaultValue="asc"
                        onChange={handleSort}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Sort By' }}
                        sx={{ bgcolor: '#fff', borderRadius: 1 }}
                    >
                        {/* <MenuItem value={undefined}>Featured</MenuItem> */}
                        <MenuItem value="asc">Price: Low to High</MenuItem>
                        <MenuItem value="desc">Price: High to Low</MenuItem>
                        {/* Add more sort options */}
                    </Select>
                </FormControl>
            </Box>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <List>
                {vehicles?.map((vehicle) => (
                    <ListItem key={vehicle.vehicleId} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', mb: 2, p: 2, bgcolor: '#f9f9f9' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src={`${vehicle.image}.jpg`} alt={`${vehicle.make} ${vehicle.model}`} style={{ width: '150px', height: 'auto', marginRight: '16px', borderRadius: '8px' }} />
                            <Box>
                                <Typography variant="h6">{vehicle.make} {vehicle.model}</Typography>
                                <Typography variant="body2" color="textSecondary">{vehicle.year}</Typography>
                                <Typography variant="body2" color="textSecondary">Automatic | 5 People | 3 Bags</Typography>
                                <Button variant="text" color="primary" sx={{ mt: 1, fontWeight: 'bold' }}>Features & Price Details</Button>
                            </Box>
                        </Box>
                        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold', mb: 1 }}>PAY LATER</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', mb: 1 }}>
                                <Box sx={{ textAlign: 'center', mx: 2 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>${vehicle.rentalPrice.toFixed(2)}</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Per Day</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center', mx: 2 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>${(vehicle.rentalPrice * 1.4).toFixed(2)}</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Total</Typography>
                                </Box>
                            </Box>
                            <Button variant="contained" color="primary" sx={{ fontWeight: 'bold'}} onClick={() => handleSelectVehicle(vehicle)}>Select</Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
                
            {/* Pagination Controls */}
              <Pagination 
                sx={{display:"flex", justifyContent:"center"}}
                count={10} 
                variant="outlined" 
                shape="rounded" 
                onChange={handleChange}
              />  
        </Card>
        </Grid>
        </Grid>
        </>
    );
}