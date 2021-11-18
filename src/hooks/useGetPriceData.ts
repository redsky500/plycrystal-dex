import { useEffect, useState } from 'react'
import { useMultipleContractSingleData } from 'state/multicall/hooks'
import { PAIR_INTERFACE } from 'data/Reserves'
import { Result } from 'ethers/lib/utils'
import BigNumberJs from 'bignumber.js'


type ApiResponse = {
  prices: {
    [key: string]: string
  }
  update_at: string
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
const api = 'https://api.pancakeswap.com/api/v1/price'
const BANANA_BUSD_POOL = process.env.REACT_APP_BANANA_BUSD_POOL || '0xcfdcb934657c1fb627db8f2b690ebbafd7a46e31'

const useGetPriceData = () => {
  const [data, setData] = useState<ApiResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api)
        const res: ApiResponse = await response.json()

        setData(res)
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData])
 
  return data
} 


export const useGetPriceDataFromLP = () => {
  const [response] = useMultipleContractSingleData([BANANA_BUSD_POOL], PAIR_INTERFACE, 'getReserves')
  if (response.loading === false) {
    const result = response.result as Result;
    if (result) {
      const busdReserve = new BigNumberJs(result[0]._hex * 1e18) 
      const bananaReserve = new BigNumberJs(result[1]._hex)
      const bananaUsd = busdReserve.div(bananaReserve)
      return bananaUsd.toNumber() / 1e6
    }
  }

  return undefined
}

export default useGetPriceData
