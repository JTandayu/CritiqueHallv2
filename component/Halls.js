export async function getServerSideProps() {
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const res = await fetch(`${API_URL}/api`)    


    return{
        props: {
            data
        }
    }
}