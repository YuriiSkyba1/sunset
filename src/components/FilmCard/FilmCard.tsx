import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MovieSchedule } from "../FilmsList/FilmsList";
import FilmCardSelectDropdown from "../FilmCardSelectDropdown/FilmCardSelectDropdown";

function formatDateString(dateString: string): string {
  const [day, month, year] = dateString.split(".").map(Number);
  if (!day || !month || !year) {
    return dateString; // Return the original string if parsing fails
  }
  const date = new Date(year, month - 1, day);
  if (isNaN(date.getTime())) {
    return dateString; // Return the original string if the date is invalid
  }
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
  return formattedDate
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

interface IFilmCard {
  slug: string;
  poster: string;
  title: string;
  movieSchedule: MovieSchedule;
}

function FilmCard({ title, poster, slug, movieSchedule }: IFilmCard) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDate, setSelectedDate] = useState(Object.keys(movieSchedule)[0] || "");
  const [selectedTime, setSelectedTime] = useState(movieSchedule[selectedDate]?.[0] || "");

  const filterNeededTime = (selectedDate: string) => {
    return movieSchedule.hasOwnProperty(selectedDate) ? movieSchedule[selectedDate] : [""];
  };

  const handleOnClick = () => {
    router.push(`/location/${slug}?selectedDate=${selectedDate}&selectedTime=${selectedTime}`);
  };

  return (
    <div onClick={handleOnClick}>
      <div
        className="w-full desktop:max-w-[312px] h-full desktop:relative desktop:overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: isHovered ? "pointer" : "default" }}
      >
        <div
          className={`desktop:relative h-full flex flex-col items-stretch ${
            isHovered ? "-top-[50px]" : "top-0"
          } left-0 overflow-hidden`}
          style={{ transition: "top 0.2s ease-in-out" }}
        >
          <div className="flex-1">
            <Image
              src={poster}
              alt={title}
              width={168}
              height={200}
              layout="responsive"
              unoptimized
              loading="lazy"
            />
          </div>
          <div className="p-[10px] gap-3 flex flex-1 flex-col justify-between border border-grey_medium desktop:gap-4 desktop:p-6">
            <div className="uppercase font-druk_wide text-[10px] leading-4 desktop:text-[14px] desktop:leading-5">
              {title}
            </div>
            {movieSchedule && (
              <div className="flex flex-col gap-2 desktop:flex-row desktop:justify-between">
                <div className="w-full flex flex-col gap-1">
                  <span>Date:</span>
                  <FilmCardSelectDropdown
                    isHovered={isHovered}
                    selectedItem={selectedDate}
                    setSelectedItem={setSelectedDate}
                    arrayData={Object.keys(movieSchedule).map((key) => key)}
                    label="Date"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <span>Time:</span>
                  <FilmCardSelectDropdown
                    isHovered={isHovered}
                    selectedItem={selectedTime}
                    setSelectedItem={setSelectedTime}
                    arrayData={selectedDate !== "" ? filterNeededTime(selectedDate) : [""]}
                    label="Time"
                    isActive={selectedDate === "" ? false : true}
                  />
                </div>
              </div>
            )}
          </div>
          <button className="desktop:hidden uppercase font-druk_wide w-full border text-[10px] leading-3 border-black_main bg-primary text-black_main max-h-10 py-[14px]">
            buy a ticket
          </button>
        </div>
        <button
          className={`max-desktop:hidden uppercase font-druk_wide w-full border-black_main bg-primary text-black_main desktop:text-white desktop:text-xs desktop:leading-[18px] 
                      desktop:absolute bottom-0 left-0 ${
                        isHovered
                          ? "h-[50px] desktop:py-[13px] border"
                          : "h-[0px] desktop:py-[0px] border-none"
                      }`}
          style={{ transition: "height 0.2s ease-in-out, padding 0.2s ease-in-out, border 0.2s ease-in-out" }}
        >
          buy a ticket
        </button>
      </div>
    </div>
  );
}

export default FilmCard;
