import { GridFilterItem, GridSortItem } from "@mui/x-data-grid";

export interface FilterAndSortTable {
    page: number;
    pageSize: number;
    sortModels: GridSortItem[];
    filterModel: { items: GridFilterItem[] };
}
