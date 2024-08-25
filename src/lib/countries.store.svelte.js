class CountriesResponse {
  apiPath = $state('')
  rows = $state([])
  error = $state({})
  isLoading = $state(false)

  page = $state(0)
  size = $state(20)
  sort = $state({ col: 'id', ord: 'asc' })
  timeTaken = $state(0)
  totalPages = $state(0)
  totalElements = $state(0)

  fetchFirstPage = async () => {
    this.page = 0
    await this.fetchData()
  }
  fetchNextPage = async () => {
    if (this.page < this.totalPages) {
      this.page++
      await this.fetchData()
    }
  }
  fetchPrevPage = async () => {
    if (this.page > 1) {
      this.page--
      await this.fetchData()
    }
  }

  async fetchData () {
    this.isLoading = true

    const initTime = Date.now()
    // await getPagedData( page, size, sort.col, sort.ord)
    try {
      const response = await fetch(
        `${this.apiPath}?page=${this.page - 1}&size=${this.size}&sort=${
          this.sort.col
        },${this.sort.ord}`
      )
      if(response.status !== 200){
        throw Error('Response is errornous ', {cause:{status: response.status, message: response.statusText}})
      }
      const data = await response.json()
      const endTime = Date.now()
      this.timeTaken = endTime - initTime
      // console.log({ timeTaken, endTime, initTime })
      this.rows = data.content
      this.page = data.page.number + 1
      this.totalPages = data.page.totalPages
      this.totalElements = data.page.totalElements
      this.error = { status: response.status, message: null, error: null }
      this.isLoading = false
    } catch (err) {
      this.rows = []
      this.error = { ...err.cause, error: err.message }
    }
    this.isLoading = false
  }
}

export default function useFetchCountries (pathKey) {
  const apiPath = `/api/${pathKey}`
  const res = new CountriesResponse()
  res.apiPath = apiPath
  return res
}
