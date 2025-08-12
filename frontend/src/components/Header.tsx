import { Group, Text, Box, Image } from '@mantine/core';
import { useHeaderStyles } from './header.styles';
import { CreateJobButton } from './CreateJobButton';


interface HeaderProps {
  onCreateJob: () => void;
}


export function Header({ onCreateJob }: HeaderProps) {
  const { classes } = useHeaderStyles();
  return (
    <Box className={classes.outerFrame}>
      <Box className={classes.innerFrame}>
        <Box className={classes.logo}>
          <Image src="/cybermind_works.png" alt="Logo" width={48} height={48} style={{ borderRadius: 0 }} />
        </Box>
        <Group gap={0} style={{ flex: 1 }}>
          <a className={classes.navItem} href="#">Home</a>
          <a className={classes.navItem} href="#">Find Jobs</a>
          <a className={classes.navItem} href="#">Find Talents</a>
          <a className={classes.navItem} href="#">About us</a>
          <a className={classes.navItem} href="#">Testimonials</a>
        </Group>
        <Box className={classes.ctaContainer}>
          <CreateJobButton onClick={onCreateJob} />
        </Box>
      </Box>
    </Box>
  );
}
