// Components
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Layout from '../../../components/Layout'


const TopLevel = ({ entry, main_menu, global_options }) => {
    
    return (
        <div className="main">
            <Header menu={main_menu} global_options={global_options} />

            <Layout>
                <div className="w-full">
                    <h1>{entry.title.rendered}</h1>
                    <div dangerouslySetInnerHTML={{ __html: `${entry.content.rendered}` }} />
                </div>
            </Layout>

            <Footer menu={main_menu} global_options={global_options} />
        </div>
    )
} 

TopLevel.getInitialProps = async ({ query} ) => {
    const global_options = await fetch('https://us.wp.jonknoll.dev/wp-json/acf/v3/options/acf-global-options')
    const global_options_json = await global_options.json()

    const page_data_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/wp/v2/pages/?slug=${query.subSubPage}/`)
    const page_data_json = await page_data_call.json()

    const main_menu_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/menus/v1/menus/main`)
    const main_menu_json = await main_menu_call.json()


    return {
        entry: page_data_json[0],
        main_menu: main_menu_json,
        global_options: global_options_json
    }
}


export default TopLevel