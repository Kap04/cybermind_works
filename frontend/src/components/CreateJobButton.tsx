import { Button } from '@mantine/core';
import { useCreateJobButtonStyles } from './header.styles';

interface CreateJobButtonProps {
  onClick: () => void;
}

export function CreateJobButton({ onClick }: CreateJobButtonProps) {
  const { classes } = useCreateJobButtonStyles();
  return (
    <Button
      className={classes.button}
      aria-label="Create Jobs"
      onClick={onClick}
      variant="filled"
      tabIndex={0}
    >
      Create Jobs
    </Button>
  );
}
