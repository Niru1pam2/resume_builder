import { Button } from "@/components/ui/button";
import { ResumeValues } from "@/lib/validation";

import { generateSummary } from "../forms/actions";
import { useState } from "react";
import { toast } from "sonner";
import { WandSparklesIcon } from "lucide-react";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
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
