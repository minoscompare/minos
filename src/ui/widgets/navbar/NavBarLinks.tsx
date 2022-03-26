import { useColorModeValue } from '@chakra-ui/react';
import { useCompareCpus } from '@minos/lib/utils/atoms/compare-cpus';
import RouteLink from '@minos/ui/components/RouteLink';
import { ReactNode } from 'react';

interface NavLinkProps {
  children: ReactNode;
  href: string;
}

function NavLink({ children, href }: NavLinkProps) {
  return (
    <RouteLink
      href={href}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </RouteLink>
  );
}

export default function NavBarLinks() {
  const { ids: cpuIds } = useCompareCpus();
  return (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/cpu/search">Search CPUs</NavLink>
      <NavLink href={`/cpu/compare/${cpuIds.join('/')}`}>
        View Comparison
      </NavLink>
    </>
  );
}
