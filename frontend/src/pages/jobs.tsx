import { useState, useEffect } from 'react';
import { Container, Stack, SimpleGrid, Loader, Center, Text, px } from '@mantine/core';
import { Header } from '../components/Header';
import { FilterBar } from '../components/FilterBar';
import { JobCard } from '../components/JobCard';
import { fetchJobs } from '../api/jobs';
import { CreateJobModal } from '../components/CreateJobModal';

const locationsList = [
  'Remote',
  'Onsite',
  'Hybrid',
  'Bangalore',
  'Delhi',
  'Mumbai',
  'Chennai',
  'Pune',
  'Hyderabad',
  'Gurgaon',
];

export default function JobsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salary: [0, 200000] as [number, number],
  });

  const loadJobs = () => {
    setLoading(true);
    fetchJobs({
      title: filters.title,
      location: filters.location,
      jobType: filters.jobType,
      salaryMin: filters.salary[0],
      salaryMax: filters.salary[1],
    })
      .then((data) => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load jobs');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <Container size="2xl" py="md" style={{ background: '#ffffffff', minHeight: '100vh' }}>
      <Stack>
        <Header onCreateJob={() => setModalOpen(true)} />
        <FilterBar filters={filters} onChange={setFilters} locations={locationsList} />
        {loading ? (
          <Center><Loader /></Center>
        ) : error ? (
          <Center><Text c="red">{error}</Text></Center>
        ) : (
          <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} m={40} spacing="sm">
            {jobs.map((job, idx) => (
              <JobCard key={job.id || idx} job={job} />
            ))}
          </SimpleGrid>
        )}
        <CreateJobModal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          onJobCreated={loadJobs}
        />
      </Stack>
    </Container>
  );
}
