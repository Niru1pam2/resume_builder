"use client";

import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { Loader2Icon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { deleteResume } from "../../resumes/actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const wasUpdated = resume.updatedAt !== resume.createdAt;
  return (
    <div className="group relative border rounded-lg border-transparent hover:border-border  bg-secondary p-3  transition-all">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="font-semibold line-clamp-1">
            {resume.title || "No title"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          className="inline-block w-full"
          href={`/editor?resumeId=${resume.id}`}
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            className="shadow-sm group-hover:shadow-lg transition-shadow overflow-hidden "
          />
        </Link>
      </div>
      <MoreMenu resumeId={resume.id} />
    </div>
  );
}

interface MoreMenuProps {
  resumeId: string;
}

function MoreMenu({ resumeId }: MoreMenuProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="absolute right-0.5 top-0.5 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <MoreVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2Icon className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteConfirmationDialog
        onOpenChange={setShowDeleteConfirmation}
        open={showDeleteConfirmation}
        resumeId={resumeId}
      />
    </>
  );
}

interface DeleteConfirmationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConfirmationDialog({
  onOpenChange,
  open,
  resumeId,
}: DeleteConfirmationDialogProps) {
  const mutation = useMutation({
    mutationFn: deleteResume,
    onSuccess: () => toast.success("Resume deleted", { id: "resume-delete" }),
    onError: () =>
      toast.error("Error deleting resume", { id: "resume-delete" }),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete resume?</DialogTitle>
          <DialogDescription>
            This will permanently delete your resume. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={() => mutation.mutate(resumeId)}
            disabled={mutation.isPending}
          >
            {mutation.isPending && (
              <Loader2Icon className="size-3 animate-spin" />
            )}
            Delete
          </Button>
          <Button variant={"secondary"} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
