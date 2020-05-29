//Custom Functions
import getPageID from '../functions/getPageID'

// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Layout from '../components/Layout'


const TopLevel = ({ entry, main_menu, global_options }) => {
    
    return (
        <div className="main">
            <Header menu={main_menu} global_options={global_options} />

            <Layout>
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
                    </div>
                    <div className="row-span-2 col-span-2 rounded bg-gray-400 p-4">
                        <div dangerouslySetInnerHTML={{ __html: `${entry.content.rendered}` }} />
                    </div>
                </div>
            </Layout>

            <Footer menu={main_menu} global_options={global_options} />
        </div>
    )
}

TopLevel.getInitialProps = async ({ query} ) => {
    const global_options = await fetch('https://us.wp.jonknoll.dev/wp-json/acf/v3/options/acf-global-options')
    const global_options_json = await global_options.json()

    const all_pages_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/wp/v2/pages`)
    const all_pages_json = await all_pages_call.json()
    let page_id = getPageID(all_pages_json, query.page)

    const page_data_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/wp/v2/pages/${page_id}`)
    const page_data_json = await page_data_call.json()

    const main_menu_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/menus/v1/menus/main`)
    const main_menu_json = await main_menu_call.json()


    return {
        entry: page_data_json,
        main_menu: main_menu_json,
        global_options: global_options_json
    }
}


export default TopLevel