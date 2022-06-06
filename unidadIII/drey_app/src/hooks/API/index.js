import React from 'react'

const useAPI = () => {
  
  const getRequest = async ( URL ) => {
    try{
      const result = await fetch( URL )
      return await result.json()
    }catch( error ){
      console.log( 'Error', error )
    }
  }

  // const postRequest = () => {}

  return { getRequest }
}

export default useAPI