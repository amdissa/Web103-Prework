import { Link } from 'react-router-dom'


function withProtocol(u = '') {
if (!u) return ''
try {
const hasProtocol = /^https?:\/\//i.test(u)
return hasProtocol ? u : `https://${u}`
} catch { return u }
}


export default function CreatorCard({ creator, onDelete }) {
const { id, name, url, description, imageurl } = creator


return (
<article>
{imageurl ? (
<img className="card-img" src={imageurl} alt={name} loading="lazy" />
) : (
<div className="card-img" aria-hidden="true"></div>
)}
<header style={{marginTop: '.5rem'}}>
<h3 style={{marginBottom: '.25rem'}}>
<Link to={`/creators/${id}`}>{name}</Link>
</h3>
<small>
<a href={withProtocol(url)} target="_blank" rel="noreferrer noopener">Visit channel</a>
</small>
</header>
<p className="truncate" style={{marginTop: '.5rem'}}>{description}</p>
<div className="actions">
<Link role="button" to={`/creators/${id}`}>Details</Link>
<Link role="button" className="secondary" to={`/creators/${id}/edit`}>Edit</Link>
{onDelete && (
<button className="contrast" onClick={() => onDelete(id)} aria-label={`Delete ${name}`}>Delete</button>
)}
</div>
</article>
)
}