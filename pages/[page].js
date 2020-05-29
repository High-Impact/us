//Custom Functions
import getPageID from '../functions/getPageID'


const TopLevel = ({ entry }) => {
    
    return (
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
    )
}

TopLevel.getInitialProps = async ({ query} ) => {
    const all_pages_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/wp/v2/pages`)
    const all_pages_json = await all_pages_call.json()
    let page_id = getPageID(all_pages_json, query.page)

    const page_data_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/wp/v2/pages/${page_id}`)
    const page_data_json = await page_data_call.json()

    console.dir(page_data_json)
    


    return {
        entry: page_data_json
    }
}


export default TopLevel