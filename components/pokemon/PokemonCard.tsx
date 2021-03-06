import { FC } from 'react'; 
import { useRouter } from 'next/router';
import { Card, Grid, Text, Row } from '@nextui-org/react';
import { SmallPokemon } from '../../interfaces';

interface Props {
    pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {

  const router = useRouter();

  const onCLick = () => {
    router.push(`/pokemon/${pokemon.name}`);
  }

  return (
    <Grid  
      key={pokemon.id}
      xs={6} sm={3} md={2} xl={1}
    >
      <Card 
        hoverable 
        clickable
        onClick={onCLick}
      >
        <Card.Body css={{ p: 1 }}>
          <Card.Image 
            style={{ paddingTop: '15px' }}
            src={pokemon.img}
            width='100%'
            height={140}
            alt={pokemon.name}
          />
        </Card.Body>
        <Card.Footer>
          <Row justify='space-between'>
            <Text transform='capitalize'>{[pokemon.name]}</Text>
            <Text>#{[pokemon.id]}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  )
};
