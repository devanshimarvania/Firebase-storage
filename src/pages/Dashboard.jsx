import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ref as dbRef, onValue } from "firebase/database"
import { database } from "../firebase/firebaseConfig"
import { setFiles } from "../features/fileSlice"
import {
  Container, AppBar, Toolbar, Typography, Box, Paper, Divider, Chip
} from "@mui/material"
import FolderIcon from "@mui/icons-material/Folder"
import UploadFile from "../components/UploadFile"
import FileList from "../components/FileList"
import SearchFilter from "../components/SearchFilter"

export default function Dashboard() {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.files)

  useEffect(() => {
    const filesRef = dbRef(database, "files")
    const unsubscribe = onValue(filesRef, (snapshot) => {
      if (snapshot.exists()) {
        dispatch(setFiles(Object.values(snapshot.val())))
      } else {
        dispatch(setFiles([]))
      }
    })
    return () => unsubscribe()
  }, [dispatch])

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f6fa" }}>
      <AppBar position="static" elevation={1} sx={{ bgcolor: "#1565c0" }}>
        <Toolbar>
          <FolderIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight={700} letterSpacing={0.5}>
            Firebase Storage App
          </Typography>
          <Box flexGrow={1} />
          <Chip
            label={`${items.length} Files`}
            size="small"
            sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <UploadFile />
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            My Documents
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <SearchFilter />
          <FileList />
        </Paper>
      </Container>
    </Box>
  )
}