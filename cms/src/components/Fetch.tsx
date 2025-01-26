import useFetch from "../hooks/useFetch"
interface Post {
    id: string;
    title: string;
}

const Fetch = () => {
    const { data, loading, error } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts")
    if (loading) {
        return <>Loading...</>
    }
    if (error) {
        return <p>Error:{error}</p>
    }

    return (
        <>
            <ul>
                {
                    data?.map((post) => {
                        return (
                            <li key={post.id}>{post.title}</li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Fetch