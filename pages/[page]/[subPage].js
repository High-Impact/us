// Components
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Layout from '../../components/Layout'
import RenderPosts from '../../components/RenderPosts'

const SubPage = ({ entry, cat_ID, main_menu, global_options }) => (
    <div className="main">
      <Header menu={main_menu} global_options={global_options} />
  
      <Layout>
        <div className="w-full">
            {/* {console.log(entry)} */}
            <h1 className="text-6xl font-bold mt-4 mb-2">{entry.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: `${entry.content.rendered}` }} />
            <RenderPosts cat_ID={cat_ID}/>
        </div>
      </Layout>
  
      <Footer menu={main_menu} global_options={global_options}/>
    </div>
  )

  // This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const parents_api_call = await fetch('https://us.wp.jonknoll.dev/wp-json/menus/v1/menus/main')
    const parents_json = await parents_api_call.json()

    var parentIDS = new Array()
    var parents = new Array()

    parents_json.items.forEach(element => {
        parentIDS.push(element.object_id)
        var parent = {
            "id":element.object_id,
            "slug":element.slug
        }
        parents.push(parent)
    });

    // console.log(parents)

    const posts_api_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/wp/v2/pages?parent=${parentIDS}`)
    const posts_api_json = await posts_api_call.json()
    


    
    
    function getParentSlug(id) {
        var parentSlug = []
        for (var i = 0; i < parents.length; i++){
            // look for the entry with a matching `code` value
            if (parents[i].id == id){
                // we found it
                parentSlug.push(parents[i].slug)
            }
        }

        return parentSlug[0];
    }

    // Get the paths we want to pre-render based on posts
    const paths = posts_api_json.map((post) => ({
        params: { 
            page: getParentSlug(post.parent),
            subPage: post.slug
         },
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { 
        paths,
        fallback: false 
    }
  }

  export async function getStaticProps({ params }) {
    // Get Global Settings
    const global_options_call = await fetch('https://us.wp.jonknoll.dev/wp-json/acf/v3/options/acf-global-options')
    const global_options = await global_options_call.json()

    // Get Menu Items
    const main_menu_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/menus/v1/menus/main`)
    const main_menu = await main_menu_call.json()
    
    // Get current page Data
    const entry_page_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/wp/v2/pages?slug=${params.subPage}`)
    const entry_page_json = await entry_page_call.json()
    const entry = entry_page_json[0]

    // Get category ID for current page
    const category_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/wp/v2/categories?slug=${params.subPage}`)
    const category_json = await category_call.json()
    // const entry = entry_page_json[0]
    
    // Get posts in current category
    const posts_call = await fetch(`https://us.wp.jonknoll.dev/wp-json/wp/v2/posts?categories=${category_json[0].id}`)
    const posts = await posts_call.json()
    console.log(category_json[0].id)

    const cat_ID = category_json[0].id
    
    return {
      props: {
        entry,
        cat_ID,
        main_menu,
        global_options
      },
    }
  }


  
  export default SubPage