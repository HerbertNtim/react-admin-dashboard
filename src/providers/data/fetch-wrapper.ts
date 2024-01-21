import { GraphQLFormattedError } from 'graphql'

type Error = {
  message: string,
  statusCode: string
}

// Think of this as a middleware
const customFetch = async( url: string, options: RequestInit) => {
  const accessToKen = localStorage.getItem('access_token');
  
  const headers = options.headers as Record<string, string>
  
  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToKen}`,
      'Content-Type': 'application/json',
      'Apollo-Require-Preflight': 'true' 
    }
  })
}

const getGraphQLErrors = (body: Record<'errors', GraphQLFormattedError[] | undefined>): Error | null => {
  if(!body){
    return {
      message: 'Unknown error',
      statusCode: 'INTERNAL_SERVER_ERROR'
    }
  }

  if('error' in body){
    const errors = body?.errors;

    const messages = errors?.map((error) => error.message)?.join('')
    const code = errors?.[0].extensions?.code

    return {
      message: messages || JSON.stringify(errors),
      statusCode: code || 500
    }
  }

  return null;
}

export const fetchWrapper = async (url: string, options: RequestInit) => {
  const response = await customFetch(url, options)

  const responseClone = response.clone()
  const body = responseClone.json()

  const error = getGraphQLErrors(await body)

  if(error) throw error

  return response
}