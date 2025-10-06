import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const RatingStars = ({ rating = 0, size = "md", interactive = false, onChange }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const handleClick = (value) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          disabled={!interactive}
          className={cn(
            interactive && "cursor-pointer hover:scale-110 transition-transform",
            !interactive && "cursor-default"
          )}
        >
          <ApperIcon
            name={star <= rating ? "Star" : "Star"}
            className={cn(
              sizes[size],
              star <= rating ? "fill-warning text-warning" : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default RatingStars;