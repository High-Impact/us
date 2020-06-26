// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'

const TopLevel = ({ entry, main_menu, global_options }) => (
    <div className="main">
      <Header menu={main_menu} global_options={global_options} />
  
      <Layout>
        <div className="w-full">
            <h1 className="text-6xl font-bold mt-4 mb-2">{entry.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: `${entry.content.rendered}` }} />
        </div>
      </Layout>
  
      <Footer menu={main_menu} global_options={global_options}/>
    </div>
  )

  // This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const posts_api_call = await fetch('https://us.wp.jonknoll.dev/wp-json/menus/v1/menus/main')
    const posts_api_json = await posts_api_call.json()
  
    // Get the paths we want to pre-render based on posts
    const paths = posts_api_json.items.map((post) => ({
        params: { page: post.slug },
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { 
        paths,
        fallback: false 
    }
  }

  export async function getStaticProps({ params }) {
    const global_options_call = await fetch('https://us.wp.jonknoll.dev/wp-json/acf/v3/options/acf-global-options')
    const global_options = await global_options_call.json()
  
    const entry_page_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/wp/v2/pages?slug=${params.page}`)
    const entry_page_json = await entry_page_call.json()
    const entry = entry_page_json[0]

    const main_menu_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/menus/v1/menus/main`)
    const main_menu = await main_menu_call.json()
    
    
    return {
      props: {
        entry,
        main_menu,
        global_options
      },
    }
  }
  
  export default TopLevel