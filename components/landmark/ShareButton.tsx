"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  FacebookMessengerShareButton,
  LineShareButton,
  FacebookIcon,
  LineIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const ShareButton = ({
  landmarkId,
  name,
}: {
  landmarkId: string;
  name: string;
}) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/landmark/${landmarkId}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>
          <Share2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-full gap-x-2 items-center"
        side="top"
        align="end"
      >
        <FacebookMessengerShareButton
          url={shareLink}
          name={name}
          appId="521270401588372"
        >
          <FacebookIcon size={"30px"} className="rounded-md" />
        </FacebookMessengerShareButton>
        <LineShareButton url={shareLink} title={name}>
          <LineIcon size={"30px"} className="rounded-md" />
        </LineShareButton>
        <TwitterShareButton url={shareLink} title={name}>
          <TwitterIcon size={"30px"} className="rounded-md" />
        </TwitterShareButton>
      </PopoverContent>
    </Popover>
  );
};
export default ShareButton;
