import { ReactNode } from "react";
import "./UnauthorizedLayout.css";
import { Grid } from "@mui/material";

export default function UnauthorizedLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div>
            <main className="main-content-unauthorized">
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ minHeight: "100vh" }}
                >
                    <Grid item xs={6}>
                        {children}
                    </Grid>
                </Grid>
            </main>
        </div>
    );
}
