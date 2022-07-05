import { ThemeContextProvider } from "styles/ThemeContext";
import 'styles/global.css'
import GlobalStyle from 'styles/GlobalStyles'
import { QueryClient, QueryClientProvider } from 'react-query'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Te

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeContextProvider>
    </QueryClientProvider>
  )


}

export default MyApp
