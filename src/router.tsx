import { createRouter, Link } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},

    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPreload: 'intent', // preload on hover/focus
    defaultNotFoundComponent: () => {
      return (
        <div>
          <p>Page Not found!</p>
          <Link to="/">Go home</Link>
        </div>
      )
    },
  })

  return router
}
