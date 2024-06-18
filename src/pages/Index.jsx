import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Mafia/Werewolf Discord Game</Text>
        <Text fontSize="xl">Join the game, get assigned roles, and play through a series of commands and interactions.</Text>
        <Button leftIcon={<FaDiscord />} colorScheme="teal" size="lg" onClick={() => window.open('https://discord.com', '_blank')}>
          Join Our Discord
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;