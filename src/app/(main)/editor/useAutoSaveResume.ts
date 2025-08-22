import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validation";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResume } from "../../../../actions/saveResume";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { fileReplacer } from "@/lib/utils";

export default function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const debouncedResumeData = useDebounce(resumeData, 1500);
  const [resumeId, setResumeId] = useState(resumeData.id);
  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData)
  );

  const {
    mutateAsync: saveMutation,
    isPending: isSaving,
    reset,
  } = useMutation({
    mutationFn: saveResume,
    onSuccess: () => toast.success("Resume saved", { id: "save-resume" }),
  });

  useEffect(() => {
    async function save() {
      try {
        const newData = structuredClone(debouncedResumeData);

        const updatedResume = await saveMutation({
          ...newData,
          ...(JSON.stringify(lastSavedData.photo) ===
            JSON.stringify(newData.photo, fileReplacer) && {
            photo: undefined,
          }),
          id: resumeId,
        });

        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          router.push(`?${newSearchParams.toString()}`);
        }
      } catch (error) {
        toast.error("Failed to save resume", {
          id: "save-resume",
          action: {
            label: "Retry",
            onClick: async () => {
              toast.dismiss("save-resume");
              reset();
              await save();
            },
          },
        });
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving) {
      save();
    }
  }, [
    debouncedResumeData,
    isSaving,
    lastSavedData,
    resumeId,
    searchParams,
    router,
    saveMutation,
    reset,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer),
  };
}
