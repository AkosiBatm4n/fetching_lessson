import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://reqres.in/api/users?page=2').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

console.log(data.data)
const user_data = data.data

  return (
    <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our leadership</h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
          suspendisse.
        </p>
      </div>
      <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        {user_data.map((data, key) => (
          <li key={key}>
            <div className="flex items-center gap-x-6">
              <img alt="" src={data.avatar} className="h-16 w-16 rounded-full" />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{data.first_name}{data.last_name}</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">{data.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
}
