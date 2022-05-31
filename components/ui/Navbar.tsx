import { Spacer, Text, useTheme, Link } from '@nextui-org/react';
import NextLink from 'next/link';
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

        <NextLink href="/" passHref>
          <Link>
            <Text color='white' h2>P</Text>
            <Text color='white' h3>okémon</Text>
          </Link>
        </NextLink>

        <Spacer css={{ flex: 1 }} />

        <NextLink href="/favorites" passHref>
          <Link>
          <Text color='white' style={{ marginRight: '25px'}}>Favoritos</Text>
          </Link>
        </NextLink>
        
    </div>
  )
}
