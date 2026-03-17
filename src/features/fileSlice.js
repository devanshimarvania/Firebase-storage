import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { ref as dbRef, set, remove, update, onValue } from "firebase/database"
import { database } from "../firebase/firebaseConfig"

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export const uploadFile = createAsyncThunk(
  "files/uploadFile",
  async ({ file, category, description }, { rejectWithValue }) => {
    try {
      const fileId = Date.now().toString()
      const base64 = await convertToBase64(file)

      const fileData = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        category: category || "Personal",
        description: description || "",
        uploadDate: new Date().toISOString(),
        base64,
      }

      await set(dbRef(database, `files/${fileId}`), fileData)
      return fileData
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteFile = createAsyncThunk(
  "files/deleteFile",
  async ({ id }, { rejectWithValue }) => {
    try {
      await remove(dbRef(database, `files/${id}`))
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateFileMetadata = createAsyncThunk(
  "files/updateFileMetadata",
  async ({ id, name, category, description }, { rejectWithValue }) => {
    try {
      await update(dbRef(database, `files/${id}`), { name, category, description })
      return { id, name, category, description }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const fileSlice = createSlice({
  name: "files",
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchQuery: "",
    filterCategory: "All",
    filterType: "All",
  },
  reducers: {
    setFiles(state, action) {
      state.items = action.payload
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    setFilterCategory(state, action) {
      state.filterCategory = action.payload
    },
    setFilterType(state, action) {
      state.filterType = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteFile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter((f) => f.id !== action.payload)
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateFileMetadata.fulfilled, (state, action) => {
        const index = state.items.findIndex((f) => f.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload }
        }
      })
  },
})

export const { setFiles, setSearchQuery, setFilterCategory, setFilterType, clearError } = fileSlice.actions
export default fileSlice.reducer