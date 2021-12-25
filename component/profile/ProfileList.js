function ProfileList({data}){

}

export async function getStaticProps(){
    const { API_URL } = process.env
    const { API_KEY } = process.env

    const res = await fetch(`${API_URL}/api`)
    const data = await res.json()

    return{
        props:{
            data
        }
    }

}

export default ProfileList