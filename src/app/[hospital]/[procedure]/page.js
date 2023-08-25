import Image from 'next/image'

export const revalidate = 3600;

async function getProcedure(hospital, procedure) {
  const res = await fetch("https://REDACT.execute-api.us-east-1.amazonaws.com/prd/v1/query", { 
    method: 'POST',
    headers: {
      'x-api-key': 'REDACT',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `SELECT * FROM 'https://beta.payless.health/data/${hospital}' WHERE Code_type = 'Charge_Code' AND Primary_Code IN (${procedure}) LIMIT 10;`
    }),
    next: {
      tags: ['hospital']
    }
  })
  const data = await res.json()
  console.log(data)
  return data
} 

      

export default async function Procedure({params: {hospital, procedure}}) {
  const data = await getProcedure(hospital, procedure)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {JSON.stringify(data)}
      </div>
    </main>
  )
}
