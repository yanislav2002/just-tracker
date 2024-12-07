type ThunkStatus = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
}

export default ThunkStatus
