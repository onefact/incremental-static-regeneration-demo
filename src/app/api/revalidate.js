import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function GET() {
  revalidateTag('hospital')
  return NextResponse.json({
    revalidate: true
  })
}