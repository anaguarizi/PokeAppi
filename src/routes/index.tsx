import { Text, Heading, Highlight, Box } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='h-[80vh] flex justify-center items-center'>

        <Box w='25%' textAlign='center' boxShadow='2xl' borderRadius='xl' p={4}>

          <Heading as='b' fontSize={40}>Bem-vindo!</Heading>

          <Text lineHeight={2} textAlign='justify'>

            <Highlight query={['React', 'Typescript', 'Tailwind CSS', 'Chakra UI']}
              styles={{ px: 2, py: 1, rounded: 'full', bg: '#B1D8B7' }}>
              Essa é uma página feita com propósitos de estudo pessoal de React com
              Typescript. Para estilização está sendo utilizado o Tailwind CSS e para
              os componentes a biblioteca Chakra UI.
            </Highlight>
          </Text>
        </Box>
    </div>
  )
}
