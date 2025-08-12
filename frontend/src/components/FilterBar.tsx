import { Group, TextInput, Select, RangeSlider, Box, rem } from '@mantine/core';

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
    <Box style={{ background: '#fff', borderRadius: rem(16), boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)', padding: '24px 24px', marginBottom: 16 }}>
      <Group gap="md" wrap="nowrap">
        <TextInput
          placeholder="Search By Job Title, Role"
          value={filters.title}
          onChange={e => onChange({ ...filters, title: e.target.value })}
          style={{ minWidth: 220 }}
        />
        <Select
          placeholder="Preferred Location"
          data={locations.length ? locations : ["Remote", "Onsite", "Hybrid"]}
          value={filters.location}
          onChange={val => onChange({ ...filters, location: val || '' })}
          clearable
          style={{ minWidth: 180 }}
        />
        <Select
          placeholder="Job type"
          data={["Full-time", "Part-time", "Contract", "Internship"]}
          value={filters.jobType}
          onChange={val => onChange({ ...filters, jobType: val || '' })}
          clearable
          style={{ minWidth: 160 }}
        />
        <Box style={{ flex: 1, minWidth: 220, maxWidth: 320 }}>
          <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>Salary Per Month</div>
          <RangeSlider
            min={0}
            max={200000}
            step={1000}
            value={filters.salary}
            onChange={val => onChange({ ...filters, salary: val as [number, number] })}
            label={v => `₹${v / 1000}k`}
            color="violet"
            marks={[
              { value: 50000, label: '₹50k' },
              { value: 80000, label: '₹80k' },
            ]}
          />
        </Box>
      </Group>
    </Box>
  );
}
