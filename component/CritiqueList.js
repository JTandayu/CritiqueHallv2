import Critique from '@component/Critique'

function CritiqueList(){
  
}

export async function getServerSideProps(context) {
  const { API_URL } = process.env
  const { API_KEY } = process.env

  const res = await fetch(`${API_URL}/api/display_all_posts`)
  const data = await res.json() 
    return {
      props: {}, // will be passed to the page component as props
    }
  }


