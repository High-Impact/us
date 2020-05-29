// Next.JS
import Head from 'next/head'

// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'

const Home = ({ entry, main_menu, global_options }) => (
  <div className="main">
    <Header menu={main_menu} global_options={global_options} />

    <Layout>
      <div className="row-span-2 col-span-2 rounded bg-gray-400 p-4">
        <div dangerouslySetInnerHTML={{ __html: `${entry.content.rendered}` }} />
      </div>
    </Layout>

    <Footer menu={main_menu} global_options={global_options}/>
  </div>
)

Home.getStaticProps = async (ctx) => {
  const global_options = await fetch('https://us.wp.jonknoll.dev/wp-json/acf/v3/options/acf-global-options')
  const global_options_json = await global_options.json()

  let entry_pageID = global_options_json.acf.entry_page.ID

  const entry_page_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/wp/v2/pages/${entry_pageID}`)
  const entry_page_json = await entry_page_call.json()

  const main_menu_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/menus/v1/menus/main`)
  const main_menu_json = await main_menu_call.json()


  return { 
      entry: entry_page_json,
      main_menu: main_menu_json,
      global_options: global_options_json
  }
}

export default Home
