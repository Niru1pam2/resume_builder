import { Button } from "@/components/ui/button";
import { ResumeValues } from "@/lib/validation";

import { generateSummary } from "../forms/actions";
import { useState } from "react";
import { toast } from "sonner";
import { WandSparklesIcon } from "lucide-react";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseAITools } from "@/lib/permissions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const subscriptionLevel = useSubscriptionLevel();

  const premiumModal = usePremiumModal();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!canUseAITools(subscriptionLevel)) {
      premiumModal.setOpen(true);
      return;
    }

    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={"outline"}
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="font-bold tracking-tight"
    >
      <WandSparklesIcon className="stroke-primary" />
      Generate AI summary
    </Button>
  );
}
