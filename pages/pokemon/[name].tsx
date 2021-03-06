import { useState, useEffect } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { MainLayout } from '../../components/layouts'
import pokeAPI from '../../api/pokeAPI';
import { Pokemon } from '../../interfaces/pokemon-full';
import { toggleFavorite, existInFavorites, getPokemonInfo } from '../../utils';
import { PokemonListResponse } from '../../interfaces/pokemon-list';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorites, setIsInFavorites] = useState(false)

  useEffect(() => {
    setIsInFavorites(existInFavorites(pokemon.id));
  }, [pokemon.id])

  const onToggleFavorite = () => {
    toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 200,
      spread: 160,
      angle: -100,
      origin: { x: 1, y: 0 },
    })
  }

  return (
    <MainLayout
        title={`${pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}`}
    >
        <Grid.Container css={{ marginTop: '5px'}} gap={2}>
          <Grid xs={12} sm={4}>
            <Card hoverable css={{ padding: '30px' }}>
              <Card.Body>
                <Card.Image 
                  src={pokemon.sprites.other?.dream_world.front_default || '/img/no-image.png'}
                  alt={pokemon.name} 
                  width={'100%'}
                  height={200}
                />
              </Card.Body>
            </Card>
          </Grid>

          <Grid xs={12} sm={8}>
            <Card>
              <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="container-header-card">
                  <Text h1 transform='capitalize'>{pokemon.name}</Text>
                  <Button
                    color='gradient'
                    ghost={!isInFavorites}
                    onClick={onToggleFavorite}
                  >
                    <Text transform='uppercase' size={14}>
                      {isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
                    </Text>
                  </Button>
                </div>
              </Card.Header>

              <Card.Body>
                <Text size={25}>Sprites</Text>

                <Container direction='row' display='flex'>
                  <Image 
                    src={pokemon.sprites.front_default || '/img/no-image.png'}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image 
                    src={pokemon.sprites.back_default || '/img/no-image.png'}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image 
                    src={pokemon.sprites.front_shiny || '/img/no-image.png'}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image 
                    src={pokemon.sprites.back_shiny || '/img/no-image.png'}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
    </MainLayout>
  )
};


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeAPI.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemonNames: string[] = data.results.map( pokemon => pokemon.name );

  return {
    paths: pokemonNames.map((name) => ({ params: { name } })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { name } = params as { name: string };

  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  return {
    props: {
      pokemon: await getPokemonInfo(name)
    },
    revalidate: 86400, //60 * 60 * 24 (24 hours)
  }
}

export default PokemonByNamePage;