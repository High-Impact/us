// Next.JS
import Head from 'next/head'

// Components
import MainMenu from '../components/MainMenu'

const Home = ({ entry, main_menu }) => (
  <div className="container mx-auto grid grid-cols-3 gap-4 bg-gray-100">
    <div className="row-span-1 col-span-2">
      <h1 className="text-4xl font-black">
        Title: {entry.title.rendered} | ID: {entry.id}
      </h1>
      <h2 className="text-xl font-bold">
        ACF: {entry.acf.test}
      </h2>
    </div>
    <div className="row-span-1 col-span-1">
      <MainMenu menu={main_menu} />
    </div>
    <div className="row-span-2 col-span-2 rounded bg-gray-400 p-4">
      <div dangerouslySetInnerHTML={{ __html: `${entry.content.rendered}` }} />
    </div>
  </div>
)

Home.getInitialProps = async (ctx) => {
  const global_options = await fetch('https://us.wp.jonknoll.dev/wp-json/acf/v3/options/acf-global-options')
  const global_options_json = await global_options.json()

  let entry_pageID = global_options_json.acf.entry_page.ID

  const entry_page_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/wp/v2/pages/${entry_pageID}`)
  const entry_page_json = await entry_page_call.json()

  const main_menu_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/menus/v1/menus/main`)
  const main_menu_json = await main_menu_call.json()


  return { 
      entry: entry_page_json,
      main_menu: main_menu_json
  }
}

export default Home
