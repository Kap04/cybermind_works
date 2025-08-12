import { Card, Text, Badge, Button, Group, Avatar, Box, rem, Image } from '@mantine/core';

interface JobCardProps {
  job: any;
}

export function JobCard({ job }: JobCardProps) {
  // Logic to select logo based on company name
  let logoSrc: string | undefined = undefined;
  if (job.companyName) {
    const name = job.companyName.trim().toLowerCase();
    if (name.includes('amazon')) logoSrc = '/amazon.png';
    else if (name.includes('tesla')) logoSrc = '/tesla.png';
    else if (name.includes('swiggy')) logoSrc = '/swiggy.png';
  }
  return (
    <Card shadow="sm" radius="lg" p="lg" withBorder style={{ minHeight: 320 }}>
      <Group justify="space-between" align="flex-start">
        {logoSrc ? (
          <Image src={logoSrc} alt={job.companyName} width={56} height={56} radius={12} style={{ background: '#f5f5f5', objectFit: 'contain' }} />
        ) : (
          <Avatar radius={12} size={56} style={{ background: '#f5f5f5' }}>
            {job.companyName?.[0] || job.jobTitle?.[0] || '?'}
          </Avatar>
        )}
        <Badge color="blue" variant="light" size="md" style={{ fontWeight: 600 }}>24h Ago</Badge>
      </Group>
      <Text fw={600} size="lg" mt="md">{job.jobTitle}</Text>
      <Group gap="xs" mt={4} mb={4}>
        <Text size="sm" c="dimmed">1-3 yr Exp</Text>
        <Text size="sm" c="dimmed">{job.location || 'Onsite'}</Text>
        <Text size="sm" c="dimmed">Onsite</Text>
        <Text size="sm" c="dimmed">{job.salaryMax ? `${job.salaryMax/100000}LPA` : '12LPA'}</Text>
      </Group>
      <Box style={{ minHeight: 48 }}>
        <Text size="sm" c="dimmed" lineClamp={2}>{job.jobDescription}</Text>
      </Box>
      <Button mt="md" color="blue" fullWidth radius="md" size="md" style={{ fontWeight: 600 }}>
        Apply Now
      </Button>
    </Card>
  );
}
