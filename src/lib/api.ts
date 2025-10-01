import type { ApiBasicResponse, GetFaqResponse, ListFaqsResponse } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined

function getBaseUrl(): string {
  const envUrl = API_BASE_URL ?? ''
  if (!envUrl) {
    throw new Error('VITE_API_BASE_URL is not set')
  }
  return envUrl.replace(/\/$/, '')
}

async function handleJson<T>(res: Response): Promise<T> {
  const data = await res.json()
  if (!res.ok) {
    const message = (data && data.error) ? data.error : `HTTP ${res.status}`
    throw new Error(message)
  }
  return data as T
}

export async function listFaqs(): Promise<ListFaqsResponse> {
  const url = `${getBaseUrl()}/faqs`
  const res = await fetch(url, { method: 'GET' })
  return handleJson<ListFaqsResponse>(res)
}

export async function getFaq(question: string): Promise<GetFaqResponse> {
  const encoded = encodeURIComponent(question)
  const url = `${getBaseUrl()}/faq/${encoded}`
  const res = await fetch(url, { method: 'GET' })
  return handleJson<GetFaqResponse>(res)
}

export async function createFaq(input: { question: string; answer: string }): Promise<ApiBasicResponse> {
  const url = `${getBaseUrl()}/faq`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  })
  return handleJson<ApiBasicResponse>(res)
}

export async function updateFaq(question: string, input: { answer: string }): Promise<ApiBasicResponse> {
  const encoded = encodeURIComponent(question)
  const url = `${getBaseUrl()}/faq/${encoded}`
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  })
  return handleJson<ApiBasicResponse>(res)
}

export async function deleteFaq(question: string): Promise<ApiBasicResponse> {
  const encoded = encodeURIComponent(question)
  const url = `${getBaseUrl()}/faq/${encoded}`
  const res = await fetch(url, { method: 'DELETE' })
  return handleJson<ApiBasicResponse>(res)
}


