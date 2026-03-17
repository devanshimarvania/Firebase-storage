import { useState } from "react"
import { useDispatch } from "react-redux"
import {
  Card, CardContent, CardActions, Typography, IconButton, Chip,
  Box, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, FormControl, InputLabel, Button, Tooltip
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import DownloadIcon from "@mui/icons-material/Download"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import ImageIcon from "@mui/icons-material/Image"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import { deleteFile, updateFileMetadata } from "../features/fileSlice"

const CATEGORIES = ["Personal", "Academic", "Office", "Certificates"]

function getFileIcon(type) {
  if (type.includes("pdf")) return <PictureAsPdfIcon color="error" fontSize="large" />
  if (type.includes("image")) return <ImageIcon color="primary" fontSize="large" />
  return <InsertDriveFileIcon color="action" fontSize="large" />
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
  return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric"
  })
}

function handleDownload(file) {
  const link = document.createElement("a")
  link.href = file.base64
  link.download = file.name
  link.click()
}

export default function FileCard({ file }) {
  const dispatch = useDispatch()
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [name, setName] = useState(file.name)
  const [category, setCategory] = useState(file.category)
  const [description, setDescription] = useState(file.description || "")

  function handleDelete() {
    dispatch(deleteFile({ id: file.id }))
    setDeleteOpen(false)
  }

  function handleUpdate() {
    dispatch(updateFileMetadata({ id: file.id, name, category, description }))
    setEditOpen(false)
  }

  return (
    <>
      <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            {getFileIcon(file.type)}
            <Typography variant="body1" fontWeight={600} noWrap title={file.name} sx={{ flex: 1 }}>
              {file.name}
            </Typography>
          </Box>

          <Chip label={file.category} size="small" sx={{ mb: 1 }} />

          {file.description && (
            <Typography variant="body2" color="text.secondary" mb={1}>
              {file.description}
            </Typography>
          )}

          <Typography variant="caption" color="text.secondary" display="block">
            Size: {formatSize(file.size)}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            Uploaded: {formatDate(file.uploadDate)}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 1 }}>
          <Box>
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => setEditOpen(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" color="error" onClick={() => setDeleteOpen(true)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Tooltip title="Download">
            <IconButton size="small" color="primary" onClick={() => handleDownload(file)}>
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Edit File Details</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField size="small" label="File Name" value={name} onChange={(e) => setName(e.target.value)} />
            <FormControl size="small">
              <InputLabel>Category</InputLabel>
              <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small" label="Description" value={description}
              onChange={(e) => setDescription(e.target.value)} multiline rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete File?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete <strong>{file.name}</strong>? This cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}