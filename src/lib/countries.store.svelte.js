export class RepositoryResponse {
  apiPath = $state('')
  context = $state({})
  rows = $state([])
  selected = $state(undefined)
  error = $state({})
  isLoading = $state(false)
  uiType = $state('row') // card || Row

  pageSizes = [10, 25, 50, 100]
  defaultPageSize = this.pageSizes[0] ?? 10
  page = $state(0)
  size = $state(this.defaultPageSize + 0)
  sort = $state({ col: 'id', ord: 'asc' })
  timeTaken = $state(0)
  totalPages = $state(0)
  totalElements = $state(0)
  pagedPageLabel = $derived(
    `${this.totalPages ? this.page + 1 : '0'} of ${this.totalPages} pages`
  )
  pagedRowLabel = $derived(
    `Rows ${this.page * this.size}-${Math.min(
      (this.page + 1) * this.size,
      this.totalElements
    )} of ${Math.min(this.totalPages * this.size, this.totalElements)}`
  )

  isFirstPage = $derived(this.page < 1)
  isLastPage = $derived(this.page >= this.totalPages - 1)

  fetchFirstPage = async () => {
    this.page = 0
    await this.fetchData()
  }
  fetchLastPage = async () => {
    this.page = this.totalPages ? this.totalPages - 1 : 0
    await this.fetchData()
  }
  fetchNextPage = async () => {
    if (this.page + 1 < this.totalPages) {
      this.page++
      await this.fetchData()
    }
  }
  fetchPrevPage = async () => {
    if (this.page > 0) {
      this.page--
      await this.fetchData()
    }
  }

  setSelected (sel) {
    this.selected = sel
  }

  async fetchData () {
    this.isLoading = true

    const initTime = Date.now()
    // await getPagedData( page, size, sort.col, sort.ord)
    try {
      const response = await fetch(
        `${this.apiPath}?page=${this.page}&size=${this.size}&sort=${this.sort.col},${this.sort.ord}`
      )
      let data = {}
      if (response.status <= 300) {
        data = await response.json()
        const endTime = Date.now()
        this.timeTaken = endTime - initTime
        // console.log({ timeTaken, endTime, initTime })
        this.rows = data.content ?? []
        this.page = data.page.number || 0
        this.totalPages = data.page.totalPages || 0
        this.totalElements = data.page.totalElements || 0
        this.error = { status: response.status, message: null, error: null }
        return
      }
      if (response.status <= 500) {
        data = tempData
        // throw Error('Response is errornous ', {
        //   cause: { status: response.status, message: response.statusText }
        // })
        const endTime = Date.now()
        this.timeTaken = endTime - initTime
        // console.log({ timeTaken, endTime, initTime })
        this.rows = data.content ?? []
        this.page = data.page.number || 0
        this.totalPages = data.page.totalPages || 0
        this.totalElements = data.page.totalElements || 0
        return
      }
      if (response.status <= 400) {
        // set temp data for github-page
        data = tempData
        const endTime = Date.now()
        this.timeTaken = endTime - initTime
        // console.log({ timeTaken, endTime, initTime })
        this.rows = data.content ?? []
        this.page = data.page.number || 0
        this.totalPages = data.page.totalPages || 0
        this.totalElements = data.page.totalElements || 0
      }
    } catch (err) {
      this.rows = err.status >= 500 ? tempData.content : []
      this.error = err.status >= 500 ? {} : { ...err.cause, error: err.message }
    } finally {
      this.isLoading = false
    }
  }
}

export default function useFetchCountries (pathKey) {
  const apiPath = `/api/${pathKey}`
  const res = new RepositoryResponse()
  res.apiPath = apiPath
  return res
}

export function useFetchRepo (pathKey, context) {
  const apiPath = `/api/${context.parentPathKey}/${context.parentId}/${pathKey}`
  const res = new RepositoryResponse()
  res.context = context
  res.apiPath = apiPath
  return res
}

const tempData = {
  content: [
    {
      id: 101,
      name: 'India',
      currency: 'INR',
      currency_name: 'Indian rupee',
      currency_symbol: '₹'
    },
    {
      id: 102,
      name: 'Indonesia',
      currency: 'IDR',
      currency_name: 'Indonesian rupiah',
      currency_symbol: 'Rp'
    },
    {
      id: 103,
      name: 'Iran',
      currency: 'IRR',
      currency_name: 'Iranian rial',
      currency_symbol: '﷼'
    },
    {
      id: 104,
      name: 'Iraq',
      currency: 'IQD',
      currency_name: 'Iraqi dinar',
      currency_symbol: 'د.ع'
    },
    {
      id: 105,
      name: 'Ireland',
      currency: 'EUR',
      currency_name: 'Euro',
      currency_symbol: '€'
    },
    {
      id: 106,
      name: 'Israel',
      currency: 'ILS',
      currency_name: 'Israeli new shekel',
      currency_symbol: '₪'
    },
    {
      id: 107,
      name: 'Italy',
      currency: 'EUR',
      currency_name: 'Euro',
      currency_symbol: '€'
    },
    {
      id: 108,
      name: 'Jamaica',
      currency: 'JMD',
      currency_name: 'Jamaican dollar',
      currency_symbol: 'J$'
    },
    {
      id: 109,
      name: 'Japan',
      currency: 'JPY',
      currency_name: 'Japanese yen',
      currency_symbol: '¥'
    },
    {
      id: 110,
      name: 'Jersey',
      currency: 'GBP',
      currency_name: 'British pound',
      currency_symbol: '£'
    },
    {
      id: 111,
      name: 'Jordan',
      currency: 'JOD',
      currency_name: 'Jordanian dinar',
      currency_symbol: 'ا.د'
    },
    {
      id: 112,
      name: 'Kazakhstan',
      currency: 'KZT',
      currency_name: 'Kazakhstani tenge',
      currency_symbol: 'лв'
    },
    {
      id: 113,
      name: 'Kenya',
      currency: 'KES',
      currency_name: 'Kenyan shilling',
      currency_symbol: 'KSh'
    },
    {
      id: 114,
      name: 'Kiribati',
      currency: 'AUD',
      currency_name: 'Australian dollar',
      currency_symbol: '$'
    },
    {
      id: 115,
      name: 'North Korea',
      currency: 'KPW',
      currency_name: 'North Korean Won',
      currency_symbol: '₩'
    },
    {
      id: 116,
      name: 'South Korea',
      currency: 'KRW',
      currency_name: 'Won',
      currency_symbol: '₩'
    },
    {
      id: 117,
      name: 'Kuwait',
      currency: 'KWD',
      currency_name: 'Kuwaiti dinar',
      currency_symbol: 'ك.د'
    },
    {
      id: 118,
      name: 'Kyrgyzstan',
      currency: 'KGS',
      currency_name: 'Kyrgyzstani som',
      currency_symbol: 'лв'
    },
    {
      id: 119,
      name: 'Laos',
      currency: 'LAK',
      currency_name: 'Lao kip',
      currency_symbol: '₭'
    },
    {
      id: 120,
      name: 'Latvia',
      currency: 'EUR',
      currency_name: 'Euro',
      currency_symbol: '€'
    },
    {
      id: 121,
      name: 'Lebanon',
      currency: 'LBP',
      currency_name: 'Lebanese pound',
      currency_symbol: '£'
    },
    {
      id: 122,
      name: 'Lesotho',
      currency: 'LSL',
      currency_name: 'Lesotho loti',
      currency_symbol: 'L'
    },
    {
      id: 123,
      name: 'Liberia',
      currency: 'LRD',
      currency_name: 'Liberian dollar',
      currency_symbol: '$'
    },
    {
      id: 124,
      name: 'Libya',
      currency: 'LYD',
      currency_name: 'Libyan dinar',
      currency_symbol: 'د.ل'
    },
    {
      id: 125,
      name: 'Liechtenstein',
      currency: 'CHF',
      currency_name: 'Swiss franc',
      currency_symbol: 'CHf'
    }
  ],
  page: {
    size: 25,
    number: 4,
    totalElements: 250,
    totalPages: 10
  }
}
