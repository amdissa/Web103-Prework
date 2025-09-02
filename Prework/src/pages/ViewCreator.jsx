import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../client.js'


function withProtocol(u = '') {
if (!u) return ''
const has = /^https?:\/\//i.test(u)
return has ? u : `https://${u}`
}


export default function ViewCreator() {
const { id } = useParams()
const [creator, setCreator] = useState(null)
const [error, setError] = useState('')


useEffect(() => {
async function load() {
const { data, error } = await supabase
.from('creators')
.select('*')
.eq('id', id)
.single()
if (error) setError(error.message)
else setCreator(data)
}
load()
}, [id])


if (error) return <p role="alert">{error}</p>
if (!creator) return <progress />


return (
<article>
{creator.imageurl && (
<img className="card-img" src={creator.imageurl} alt={creator.name} />
)}
<h2 style={{marginTop: '.75rem'}}>{creator.name}</h2>
<p><strong>Channel</strong>: <a href={withProtocol(creator.url)} target="_blank" rel="noreferrer noopener">{creator.url}</a></p>
<p><strong>Description</strong>: {creator.description}</p>
<div className="actions" style={{marginTop: '1rem'}}>
<Link role="button" to={`/creators/${creator.id}/edit`}>Edit</Link>
<Link role="button" className="secondary" to="/">Back</Link>
</div>
</article>
)
}