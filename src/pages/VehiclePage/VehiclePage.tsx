import { Box, Button, Card, CardContent, CardHeader, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VehicleList from "../../components/Vehicle/VehicleList";

const VehiclePage: React.FC = () => {
  const showAddVehicleDialog = () => {};
  
  return (
    <Container maxWidth="xl">
            <Card variant="outlined" sx={{ m: 2, p: 2 }}>
                <CardHeader
                    title="Vehicle Management"
                    sx={{ fontWeight: "bold" }}
                />
                <CardContent>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "flex" },
                            justifyContent: "right",
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={showAddVehicleDialog}
                            startIcon={<AddIcon />}
                        >
                            Add
                        </Button>
                    </Box>
                    <VehicleList />
                </CardContent>
            </Card>
        </Container>
  );
};

export default VehiclePage;
