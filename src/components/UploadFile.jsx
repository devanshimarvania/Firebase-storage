import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Box, Button, TextField, Select, MenuItem, FormControl,
  InputLabel, Typography, LinearProgress, Paper, Alert
} from "@mui/material"
import UploadFileIcon from "@mui/icons-material/UploadFile"
import { uploadFile } from "../features/fileSlice"

const CATEGORIES = ["Personal", "Academic", "Office", "Certificates"]

export default function UploadFile() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.files)

  const [file, setFile] = useState(null)
  const [category, setCategory] = useState("Personal")
  const [description, setDescription] = useState("")
  const [success, setSuccess] = useState(false)

  function handleFileChange(e) {
    setFile(e.target.files[0])
    setSuccess(false)
  }

  async function handleUpload() {
    if (!file) return
    const result = await dispatch(uploadFile({ file, category, description }))
    if (result.meta.requestStatus === "fulfilled") {
      setFile(null)
      setDescription("")
      setCategory("Personal")
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Upload New Document
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
          {file ? file.name : "Choose File"}
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          size="small"
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={2}
        />

        {loading && <LinearProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">File uploaded successfully!</Alert>}

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file || loading}
        >
          Upload
        </Button>
      </Box>
    </Paper>
  )
}