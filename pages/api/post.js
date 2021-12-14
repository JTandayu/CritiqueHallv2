
export default function handler({query : {id}}, res) {
    res.status(200).json({ name: 'John Doe' })
}