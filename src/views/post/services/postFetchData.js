import { useState, useEffect } from 'react'
import axios from 'axios'

const postFetchData = (url, page, limit, postType) => {
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${url}?page=${page}&limit=${limit}&post_type=${postType}`)
        const responseData = response.data
        setData(responseData.data)
        setTotalPages(responseData.pagination.totalPages)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchData()
  }, [url, page, limit])

  return { data, totalPages, loading, error }
}

export default postFetchData
