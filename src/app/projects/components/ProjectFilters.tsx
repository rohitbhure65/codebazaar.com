import { TextField, Slider, Box, Typography } from '@mui/material';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';

interface Filters {
    category: string;
    tags: string;
    techStack: string;
    minPrice: number;
    maxPrice: number;
}

interface ProjectFiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    filters: Filters;
    setFilters: (filters: Filters) => void;
}

export const ProjectFilters = ({ searchTerm, setSearchTerm, filters, setFilters }: ProjectFiltersProps) => {
    return (
        <Box className="w-full shadow-lg rounded-lg mt-10 p-4 max-h-screen overflow-y-auto">
            <TextField
                fullWidth
                label="Search projects"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                size="small"
                margin="normal"
            />
            <TextField
                fullWidth
                label="Category (comma-separated)"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                variant="outlined"
                size="small"
                margin="normal"
            />
            <TextField
                fullWidth
                label="Tags (comma-separated)"
                value={filters.tags}
                onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
                variant="outlined"
                size="small"
                margin="normal"
            />
            <TextField
                fullWidth
                label="Tech Stack (comma-separated)"
                value={filters.techStack}
                onChange={(e) => setFilters({ ...filters, techStack: e.target.value })}
                variant="outlined"
                size="small"
                margin="normal"
            />
            <TextField
                fullWidth
                label="Min Price"
                type="number"
                value={filters.minPrice.toString()}
                onChange={(e) => setFilters({ ...filters, minPrice: parseFloat(e.target.value) || 0 })}
                inputProps={{ min: 0, max: 100000, step: 10 }}
                variant="outlined"
                size="small"
                margin="normal"
            />
            <TextField
                fullWidth
                label="Max Price"
                type="number"
                value={filters.maxPrice.toString()}
                onChange={(e) => setFilters({ ...filters, maxPrice: parseFloat(e.target.value) || 100000 })}
                inputProps={{ min: 0, max: 100000, step: 10 }}
                variant="outlined"
                size="small"
                margin="normal"
            />
            <Box sx={{ margin: '16px 0' }}>
                <Typography variant="body1">
                    Price Range: <CurrencyRupeeRoundedIcon />{filters.minPrice} - <CurrencyRupeeRoundedIcon /> {filters.maxPrice}
                </Typography>
                <Slider
                    value={[filters.minPrice, filters.maxPrice]}
                    onChange={(e, newValue) => setFilters({
                        ...filters,
                        minPrice: Array.isArray(newValue) ? newValue[0] : newValue,
                        maxPrice: Array.isArray(newValue) ? newValue[1] : newValue
                    })}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100000}
                    step={100}
                />
            </Box>
        </Box>
    );
};
