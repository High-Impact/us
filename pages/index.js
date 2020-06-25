// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'

const Home = ({ entry, main_menu, global_options }) => (
  <div className="main">
    <Header menu={main_menu} global_options={global_options} />

    <Layout>
      <div className="w-full">
        <div dangerouslySetInnerHTML={{ __html: `${entry.content.rendered}` }} />
      </div>
    </Layout>

    <Footer menu={main_menu} global_options={global_options}/>
  </div>
)
export async function getStaticProps() {
  const global_options_call = await fetch('https://us.wp.jonknoll.dev/wp-json/acf/v3/options/acf-global-options')
  const global_options = await global_options_call.json()

  let entry_pageID = global_options.acf.entry_page.ID

  const entry_page_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/wp/v2/pages/${entry_pageID}`)
  const entry = await entry_page_call.json()

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

export default Home