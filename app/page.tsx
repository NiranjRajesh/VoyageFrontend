import Image from 'next/image'
import '../styles/style.scss'
import Greeter from '@/components/Greeter'
import { SearchProvider } from '@/context/SearchContext'
import { LoadingProvider } from '@/context/loadingContext'

export default function Home() {
  return (
    <SearchProvider>
        <LoadingProvider>
    <main >
   

      <Greeter/>
  
    </main>
    </LoadingProvider>
    </SearchProvider>
  )
}
