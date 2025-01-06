import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '../ui/alert-dialog';
import { Progress } from '../ui/progress';

interface PaymentConfirmationDialogProps {
  showConfirmation: boolean;
  countdown: number;
  progress: number;
}

export const PaymentConfirmationDialog = ({
  showConfirmation,
  countdown,
  progress,
}: PaymentConfirmationDialogProps) => {
  return (
    <AlertDialog open={showConfirmation}>
      <AlertDialogContent className="flex flex-col items-center gap-4">
        <AlertDialogHeader>
          <AlertDialogTitle>Thank you for choosing Global Copier</AlertDialogTitle>
          <AlertDialogDescription>
            Thank You for Placing the Order with Us! You will receive a confirmation message from Admin soon. Redirecting in {countdown} seconds...
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Progress value={progress} className="w-full" />
      </AlertDialogContent>
    </AlertDialog>
  );
};