import { Link, useRoutes } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators.jsx'
import ViewCreator from './pages/ViewCreator.jsx'
import AddCreator from './pages/AddCreator.jsx'
import EditCreator from './pages/EditCreator.jsx'


export default function App() {
const routes = useRoutes([
{ path: '/', element: <ShowCreators /> },
{ path: '/creators/new', element: <AddCreator /> },
{ path: '/creators/:id', element: <ViewCreator /> },
{ path: '/creators/:id/edit', element: <EditCreator /> },
{ path: '*', element: <NotFound /> },
])


return (
<main className="container">
<header className="headerbar">
<h1><Link to="/">Creatorverse</Link></h1>
<nav>
<Link role="button" to="/creators/new">Add creator</Link>
</nav>
</header>
{routes}
<footer style={{marginTop: '2rem', fontSize: '.9rem', opacity: .8}}>
Built with React, React Router, and Supabase
</footer>
</main>
)
}


function NotFound() {
return (
<article>
<h2>Not found</h2>
<p>The page you requested does not exist.</p>
<Link to="/">Go home</Link>
</article>
)
}