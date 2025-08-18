"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { steps } from "./_components/steps";
import Breadcrumbs from "./_components/Breadcrumbs";
import Footer from "./_components/Footer";
import { useState } from "react";
import { ResumeValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn } from "@/lib/utils";

export default function ResumeEditor() {
  const searchParams = useSearchParams();
  const [resumeData, setResumeData] = useState<ResumeValues>({});
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  const router = useRouter();

  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);

    router.push(`?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume. Your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative grow ">
        <div className="absolute bottom-0 top-0 flex w-full ">
          <div
            className={cn(
              "w-full md:w-1/2 md:block p-3 space-y-6 overflow-y-auto",
              showSmResumePreview && "hidden"
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        setShowSmResumePreview={setShowSmResumePreview}
        showSmResumePreview={showSmResumePreview}
      />
    </div>
  );
}
