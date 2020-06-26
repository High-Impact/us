export default function RenderSinglePost({post}) {
    return (
        <>
        {console.log(post)}
        <div className="cursor-pointer rounded overflow-hidden shadow-lg transition duration-300 ease-in-out hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-95 hover:opacity-50">
            <img src={post.x_featured_media_original} className="w-full"/>
            <div className="px-6 py-4">
                <h3 className="font-bold text-xl mb-2">{post.title.rendered}</h3>
                <div className="text-gray-700 text-base" dangerouslySetInnerHTML={{ __html: `${post.excerpt.rendered}` }} />
            </div>
        </div>
        </>
    )
} 