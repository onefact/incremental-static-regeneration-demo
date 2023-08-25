import Image from 'next/image'

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// export const dynamicParams = false; -- then any page that hasn't been statically generated returns a 404
// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())
 
//   return posts.map((post) => ({
//     slug: post.slug, // return a hospital ID
//   }))
// }
 
// // Multiple versions of this page will be statically generated
// // using the `params` returned by `generateStaticParams`
// export default function Page({ params }) {
//   const { slug } = params
//   // ...
// }

export const dynamicParams = false;

async function getHospital(hospital) {
  const res = await fetch("https://REDACT.execute-api.us-east-1.amazonaws.com/prd/v1/query", { 
    method: 'POST',
    headers: {
      'x-api-key': 'REDACT',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `SELECT * FROM 'https://beta.payless.health/data/${hospital}' WHERE Code_type = 'Charge_Code' AND Primary_Code IN (18480415, 18480213, 18480214) LIMIT 10;`
    }),
    next: {
      tags: ['hospital']
    }
  })
  const data = await res.json()
  console.log(data)
  return data
} 

      

export default async function Hospital({params: {hospital}}) {
  const data = await getHospital(hospital)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {JSON.stringify(data)}
      </div>
    </main>
  )
}
