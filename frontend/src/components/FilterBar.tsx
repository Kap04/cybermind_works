import { Group, TextInput, Select, RangeSlider, Box, rem } from '@mantine/core';
// @ts-ignore: No type declarations for tabler-icons-react
import { IconSearch, IconMapPin, IconUser } from '@tabler/icons-react';

interface FilterBarProps {
  filters: {
    title: string;
    location: string;
    jobType: string;
    salary: [number, number];
  };
  onChange: (filters: FilterBarProps['filters']) => void;
  locations?: string[];
}

export function FilterBar({ filters, onChange, locations = [] }: FilterBarProps) {
  return (
    <Box style={{ background: '#fff', borderRadius: rem(16), boxShadow: '0px 8px 24px 0px rgba(80, 37, 255, 0.08)', padding: '24px 24px', marginBottom: 16, maxWidth: '100%', width: '100%' }}>
      <Group gap={0} wrap="nowrap" style={{ width: '100%', justifyContent: 'space-between' }}>
        <Box style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%' }}>
          <TextInput
            leftSection={<IconSearch size={20} color="#A0A0A0" />}
            placeholder="Search by job title, role"
            value={filters.title}
            onChange={e => onChange({ ...filters, title: e.target.value })}
            style={{ minWidth: 220, flex: 1, border: 'none', boxShadow: 'none', background: 'none' }}
            radius="md"
            variant="unstyled"
          />
          <Box style={{ width: 1, height: 40, background: '#E5E5E5', margin: '0 16px' }} />
          <Select
            leftSection={<IconMapPin size={20} color="#A0A0A0" />}
            placeholder="Preferred location"
            data={locations.length ? locations : ["Remote", "Onsite", "Hybrid"]}
            value={filters.location}
            onChange={val => onChange({ ...filters, location: val || '' })}
            clearable
            style={{ minWidth: 180, flex: 1, border: 'none', boxShadow: 'none', background: 'none' }}
            radius="md"
            variant="unstyled"
          />
          <Box style={{ width: 1, height: 40, background: '#E5E5E5', margin: '0 16px' }} />
          <Select
            leftSection={<IconUser size={20} color="#A0A0A0" />}
            placeholder="Job type"
            data={["Full-time", "Part-time", "Contract", "Internship"]}
            value={filters.jobType}
            onChange={val => onChange({ ...filters, jobType: val || '' })}
            clearable
            style={{ minWidth: 160, flex: 1, border: 'none', boxShadow: 'none', background: 'none' }}
            radius="md"
            variant="unstyled"
          />
          <Box style={{ width: 1, height: 40, background: '#E5E5E5', margin: '0 16px' }} />
          <Box style={{ flex: 1, minWidth: 220, maxWidth: 320 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', 
                fontWeight: 500,
                fontSize: 14,
                marginBottom: 12, 
              }}
            >
              <span style={{ textAlign: 'left' }}>Salary Per Month</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'black', fontWeight: 600, fontSize: 15 }}>
                  {`₹${filters.salary[0] / 1000}k`}
                </span>
                <span>-</span>
                <span style={{ color: 'black', fontWeight: 600, fontSize: 15 }}>
                  {`₹${filters.salary[1] / 1000}k`}
                </span>
              </div>
            </div>
            <RangeSlider
              min={0}
              max={200000}
              step={5000}
              value={filters.salary}
              onChange={val => onChange({ ...filters, salary: val as [number, number] })}
              label={v => `₹${v / 1000}k`}
              color="black"
              size="xs"
              thumbSize={15}
              styles={{
                track: { height: 4 },
                thumb: { width: 15, height: 15 },
              }}
              marks={[]}
            />
          </Box>
        </Box>
      </Group>
    </Box>
  );
}
