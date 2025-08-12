import { Group, Button, Text, Container, Box, Image, rem } from '@mantine/core';

interface HeaderProps {
  onCreateJob: () => void;
}

export function Header({ onCreateJob }: HeaderProps) {
  return (
    <Box style={{ background: '#fff', boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)', borderRadius: rem(24), margin: '16px 0' }}>
      <Container size="xl" px="md" py="xs">
        <Group justify="space-between" align="center">
          <Group gap="md">
            <Image src="/cybermind_works.png" alt="Logo" width={40} height={40} style={{ borderRadius: 12 }} />
            <Group gap="lg" visibleFrom="sm">
              <Text fw={500} size="md" style={{ cursor: 'pointer' }}>Home</Text>
              <Text fw={500} size="md" style={{ cursor: 'pointer' }}>Find Jobs</Text>
              <Text fw={500} size="md" style={{ cursor: 'pointer' }}>Find Talents</Text>
              <Text fw={500} size="md" style={{ cursor: 'pointer' }}>About us</Text>
              <Text fw={500} size="md" style={{ cursor: 'pointer' }}>Testimonials</Text>
            </Group>
          </Group>
          <Group gap="md">
            <Button color="violet" radius="xl" size="md" onClick={onCreateJob} style={{ fontWeight: 600, boxShadow: '0 2px 8px 0 rgba(120, 80, 255, 0.10)' }}>
              Create Jobs
            </Button>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
