import React from 'react'
import {useLocation} from 'react-router-dom'

export const helpers = {
  appendArray(formData, data, key){
    if ( ( typeof data === 'object' && data !== null ) || Array.isArray(data) ) {
      for ( const i in data ) {
        if ( ( typeof data[i] === 'object' && data[i] !== null ) || Array.isArray(data[i]) ) {
          this.appendArray(formData, data[i], key + '[' + i + ']');
        } else {
          formData.append(key + '[' + i + ']', data[i]);
        }
      }
    } else {
      formData.append(key, data)
    }
  }
}

export function useQuery() {
  return new URLSearchParams(useLocation().search)
}