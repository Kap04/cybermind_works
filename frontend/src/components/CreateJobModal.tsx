import { Modal, Button, TextInput, Select, Textarea, Group, LoadingOverlay, Grid, NumberInput } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { createJob } from '../api/jobs';

const schema = z.object({
  jobTitle: z.string().min(1, 'Required'),
  companyName: z.string().optional(),
  location: z.string().optional(),
  jobType: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  jobDescription: z.string().min(30, 'Min 30 chars'),
  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  applicationDeadline: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface CreateJobModalProps {
  opened: boolean;
  onClose: () => void;
  onJobCreated?: () => void;
}

export function CreateJobModal({ opened, onClose, onJobCreated }: CreateJobModalProps) {
  const DRAFT_KEY = 'job-draft';
  const { register, handleSubmit, control, reset, getValues, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);

  // Restore draft on open
  useEffect(() => {
    if (opened && !draftRestored) {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) {
        try {
          reset(JSON.parse(draft));
        } catch {}
      }
      setDraftRestored(true);
    }
    if (!opened) {
      setDraftRestored(false);
    }
  }, [opened, reset, draftRestored]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await createJob(data);
      setLoading(false);
      localStorage.removeItem(DRAFT_KEY);
      reset();
      onClose();
      if (onJobCreated) onJobCreated();
    } catch (e) {
      setLoading(false);
      // Optionally show error notification
    }
  };

  const onSaveDraft = () => {
    const values = getValues();
    localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
    // Optionally show a notification
  };

  return (
    <Modal opened={opened} onClose={onClose} title={<span style={{fontWeight:600, fontSize:24}}>Create Job Opening</span>} centered size="lg" radius="md">
      <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} />
        <Grid gutter="md">
          <Grid.Col span={6}>
            <TextInput label="Job Title" placeholder="Full Stack Developer" {...register('jobTitle')} error={errors.jobTitle?.message} required />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Company Name" placeholder="Amazon, Microsoft, Swiggy" {...register('companyName')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Location" placeholder="Choose Preferred Location" {...register('location')} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Controller
              name="jobType"
              control={control}
              render={({ field }) => (
                <Select
                  label="Job Type"
                  placeholder="FullTime"
                  data={["Full-time", "Part-time", "Contract", "Internship"]}
                  required
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.jobType?.message}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Group grow>
              <Controller
                name="salaryMin"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    label="Salary Range"
                    placeholder="₹0"
                    min={0}
                    max={2000000}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="salaryMax"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    label=" "
                    placeholder="₹12,00,000"
                    min={0}
                    max={2000000}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput label="Application Deadline" placeholder="" {...register('applicationDeadline')} type="date" />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea label="Job Description" placeholder="Please share a description to let the candidate know more about the job role" {...register('jobDescription')} error={errors.jobDescription?.message} required minRows={3} />
          </Grid.Col>
        </Grid>
  <Group mt="xl" justify="space-between">
          <Button variant="default" type="button" onClick={onSaveDraft} size="md">Save Draft ▼</Button>
          <Button type="submit" size="md" style={{ minWidth: 140 }}>
            Publish <span style={{marginLeft:8}}>»</span>
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
