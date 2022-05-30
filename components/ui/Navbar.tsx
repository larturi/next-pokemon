import {Spacer, Text, useTheme} from '@nextui-org/react';
import Image from 'next/image';

export const Navbar = () => {

  const { theme } = useTheme();

  return (
    <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0, 20px',
        backgroundColor: '#0f0f0f',
    }}>
        <Image 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="Icono de la App"
            width={70}
            height={70}
        />

        <Text color='white' h2>P</Text>
        <Text color='white' h3>okémon</Text>
        <Spacer css={{ flex: 1 }} />
        <Text color='white' style={{ marginRight: '25px'}}>Favoritos</Text>
    </div>
  )
}
