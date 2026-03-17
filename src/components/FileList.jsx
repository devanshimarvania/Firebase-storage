import { useSelector } from "react-redux"
import { Grid, Typography, CircularProgress, Box } from "@mui/material"
import FileCard from "./FileCard"

export default function FileList() {
  const { items, loading, searchQuery, filterCategory, filterType } = useSelector((state) => state.files)

  const filtered = items.filter((file) => {
    const matchName = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory = filterCategory === "All" || file.category === filterCategory

    let matchType = true
    if (filterType === "PDF") matchType = file.type.includes("pdf")
    else if (filterType === "Image") matchType = file.type.includes("image")
    else if (filterType === "Other") matchType = !file.type.includes("pdf") && !file.type.includes("image")

    return matchName && matchCategory && matchType
  })

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    )
  }

  if (filtered.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="text.secondary">No documents found.</Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={2}>
      {filtered.map((file) => (
        <Grid item xs={12} sm={6} md={4} key={file.id}>
          <FileCard file={file} />
        </Grid>
      ))}
    </Grid>
  )
}