import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { useAuth } from './hooks/useAuth';

const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
  defaultNotFoundComponent: () => <div>Page Not Found :(</div>
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const auth = useAuth();
  return (
    <ChakraProvider>
      <RouterProvider router={router} context={{ authentication: auth }} />
    </ChakraProvider>
  );
}

export default App;
