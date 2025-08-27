"use client";

import { useMutation } from "@tanstack/react-query";
import { createCustomerPortalSession } from "./actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ManageSubscriptionButton() {
  const mutation = useMutation({
    mutationFn: createCustomerPortalSession,
    onSuccess: (url) => {
      if (url) {
        window.location.href = url;
      }
    },
    onError: (error) => {
      toast.error("Error creating the session");
    },
  });

  return (
    <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      Manage subscription
    </Button>
  );
}
