import { cn } from "@/lib/utils";
import Marquee from "./marquee";

const ReviewCard = ({ src, alt, iconClassName }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "aspect-square w-32 rounded mx-4 object-contain hover:-translate-y-2 duration-300 ease-in-out",
        iconClassName
      )}
    />
  );
};

export default function IconMarquee({
  icons,
  speed = 40,
  iconClassName = "",
  containerClassName = "",
}) {
  const firstRow = icons?.slice(0, icons.length / 2);
  const secondRow = icons?.slice(icons.length / 2);

  const duration = Math.max(20, 100 - speed);

  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden",
        containerClassName
      )}
    >
      <Marquee pauseOnHover className={`[--duration:${duration}s]`}>
        {firstRow?.map((icon, index) => (
          <ReviewCard
            key={`first-${index}`}
            {...icon}
            iconClassName={iconClassName}
          />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className={`[--duration:${duration + 2}s]`}>
        {secondRow?.map((icon, index) => (
          <ReviewCard
            key={`second-${index}`}
            {...icon}
            iconClassName={iconClassName}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0  bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0  bg-gradient-to-l from-background"></div>
    </div>
  );
}
