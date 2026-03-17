import { useDispatch, useSelector } from "react-redux"
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { setSearchQuery, setFilterCategory, setFilterType } from "../features/fileSlice"

const CATEGORIES = ["All", "Personal", "Academic", "Office", "Certificates"]
const TYPES = ["All", "PDF", "Image", "Other"]

export default function SearchFilter() {
  const dispatch = useDispatch()
  const { searchQuery, filterCategory, filterType } = useSelector((state) => state.files)

  return (
    <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
      <TextField
        size="small"
        label="Search by name"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        sx={{ flex: 1, minWidth: 180 }}
      />

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Category</InputLabel>
        <Select value={filterCategory} label="Category" onChange={(e) => dispatch(setFilterCategory(e.target.value))}>
          {CATEGORIES.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Type</InputLabel>
        <Select value={filterType} label="Type" onChange={(e) => dispatch(setFilterType(e.target.value))}>
          {TYPES.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}