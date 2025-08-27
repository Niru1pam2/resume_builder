import { Button } from "@/components/ui/button";
import { Circle, LucideIcon, Square, Squircle } from "lucide-react";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseCustomization } from "@/lib/permissions";

export enum BorderStyles {
  SQUARE = "square",
  CIRCLE = "circle",
  SQUIRCLE = "squircle",
}

const borderStyles = Object.values(BorderStyles);

interface BorderStyleButtonProps {
  borderStyle?: BorderStyles;
  onChange: (borderStyle: BorderStyles) => void;
}

export default function BorderStyleButton({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) {
  const subscriptionLevel = useSubscriptionLevel();
  const premiumModal = usePremiumModal();

  function handleClick() {
    if (!canUseCustomization(subscriptionLevel)) {
      premiumModal.setOpen(true);
      return;
    }

    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  }

  const borderStyleIcons: Record<BorderStyles, LucideIcon> = {
    [BorderStyles.SQUARE]: Square,
    [BorderStyles.CIRCLE]: Circle,
    [BorderStyles.SQUIRCLE]: Squircle,
  };

  const Icon = borderStyleIcons[borderStyle || "square"];

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      title="Change border style"
      onClick={handleClick}
      className="dark:bg-black dark:hover:bg-black/80"
    >
      <Icon className="size-5" />
    </Button>
  );
}
