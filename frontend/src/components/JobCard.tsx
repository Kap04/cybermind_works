import { Card, Text, Badge, Button, Group, Avatar, Box, rem, Image } from '@mantine/core';
import React from 'react';

interface JobCardProps {
  job: any;
}

// Updated styles for the job card
const jobCardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#FFFFFF',
  position: 'relative',
  width: '300px',
  height: 'auto',
  fontFamily: 'Satoshi Variable',
};

// Add logo container style
const logoContainerStyle: React.CSSProperties = {
  width: '82px',
  height: '82px',
  borderRadius: '13.18px',
  position: 'absolute',
  top: '16px',
  left: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #FEFEFD 0%, #F1F1F1 100%)',
  border: '1px solid #FFFFFF',
  boxShadow: '0px 0px 10.25px 0px #94949440',
};

const timeStyle: React.CSSProperties = {
  position: 'absolute',
  top: '16px',
  left: '265px',
  width: '68px',
  height: '33px',
  opacity: 1,
  gap: '10px',
  borderRadius: '10px',
  paddingTop: '7px',
  paddingRight: '10px',
  paddingBottom: '7px',
  paddingLeft: '10px',
  background: '#B0D9FF',
  fontFamily: 'Satoshi',
  fontSize: '12px',
  color: 'black',
};

const descriptionStyle: React.CSSProperties = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 12,
  fontFamily: 'Satoshi Variable',
};

const applyButtonStyle: React.CSSProperties = {
  marginTop: '8px',
  alignSelf: 'center',
  fontFamily: 'Satoshi Variable',
};

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
    <Card shadow="sm" radius="lg"  withBorder style={{ minHeight: 320 }}>
      {/* Logo Container */}
      <div style={logoContainerStyle}>
        {logoSrc ? (
          <Image src={logoSrc} alt={job.companyName} width={56} height={56} radius={12} style={{ background: '#f5f5f5', objectFit: 'contain' }} />
        ) : (
          <Avatar radius={12} size={56} style={{ background: '#f5f5f5' }}>
            {job.companyName?.[0] || job.jobTitle?.[0] || '?'}
          </Avatar>
        )}
      </div>

      {/* Time */}
      <div style={timeStyle}>24h Ago</div>

      {/* Job Details */}
      <div style={{ marginTop: '100px', padding: '2px' }}>
        <Text fw={600} size="lg">{job.jobTitle}</Text>
        <Group gap="xs" mt={4} mb={4}>
          <Text size="sm" c="dimmed">1-3 yr Exp</Text>
          <Text size="sm" c="dimmed">{job.location || 'Onsite'}</Text>
          <Text size="sm" c="dimmed">Onsite</Text>
          <Text size="sm" c="dimmed">{job.salaryMax ? `${job.salaryMax/100000}LPA` : '12LPA'}</Text>
        </Group>
        <Box style={{ minHeight: 48 ,overflow: 'hidden', ...descriptionStyle }}>
          <Text size="sm" c="dimmed" lineClamp={2}>{job.jobDescription}</Text>
        </Box>
      </div>

      {/* Apply Button */}
      <Button mt="xl" color="blue" fullWidth radius="md" size="md" style={{ fontWeight: 600 }}>
        Apply Now
      </Button>
    </Card>
  );
}
