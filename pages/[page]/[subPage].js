// Node.js 
import { useRouter } from 'next/router'

const subPage = ({ slug }) => {

    return (
        <div className="container mx-auto grid grid-cols-3 gap-4 bg-gray-100">
            <h1>SLUG: {slug}</h1>
        </div>
    )
}

subPage.getStaticProps = async ({ query }) => {

    return {
        slug: query.subPage
    }
}


export default subPage