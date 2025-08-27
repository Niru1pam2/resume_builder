"use client";

import { Check, Loader2Icon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "./actions";
import { toast } from "sonner";
import { env } from "@/env";

const premiumFeatures = ["AI tools", "Up to 3 resumes"];
const premiumPlusFeatures = ["Infinite resumes", "Design customizations"];

export default function PremiumModal() {
  const mutation = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (sessionUrl) => {
      if (sessionUrl) {
        window.location.href = sessionUrl;
      }
    },
    onError: () => toast.error("Error subscribing", { id: "subscription" }),
  });

  const { open, setOpen } = usePremiumModal();

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!mutation.isPending) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Resume Builder AI premium</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p>Get a premium subscription to unlock more features.</p>
          <div className="flex">
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold">Premium</h3>
              <ul className="space-y-2">
                {premiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 stroke-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() =>
                  mutation.mutate(env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY)
                }
                disabled={mutation.isPending}
              >
                {mutation.isPending && (
                  <Loader2Icon className="size-3 animate-spin" />
                )}
                Get Premium
              </Button>
            </div>
            <div className="border-1 mx-6" />
            <div className="flex w-1/2 flex-col space-y-5">
              <h3 className="text-center text-lg font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                Premium Plus
              </h3>
              <ul className="space-y-2">
                {premiumPlusFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 stroke-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={"premium"}
                onClick={() =>
                  mutation.mutate(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY
                  )
                }
                disabled={mutation.isPending}
              >
                {mutation.isPending && (
                  <Loader2Icon className="size-3 animate-spin" />
                )}
                Get Premium Plus
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
