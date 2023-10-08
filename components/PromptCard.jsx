"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({
  post,
  handleEdit,
  handleDelete,
  handleTagClick,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id)
      return router.push("/profile");

    router.push(
      `/profile/${post.creator._id}?name=${post.creator.username}`
    );
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt_card">
      {creator && (
        <>
          <div className="flex justify-between items-start gap-5">
            <div
              className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
              onClick={handleProfileClick}
            >
              <Image
                src={creator.image}
                width={40}
                height={40}
                alt="user_image"
                className="rounded-full object-contain"
              />

              <div className="flex flex-col gap-1">
                <p className="font-satoshi text-sm font-semibold">
                  {creator.username}
                </p>
                <p className="font-inter text-sm text-gray-500">
                  {creator.email}
                </p>
              </div>
            </div>

            {/* copy -> clipboard */}
            <div className="copy_btn" onClick={handleCopy}>
              <Image
                src={
                  copied === post.prompt
                    ? "/assets/icons/tick.svg"
                    : "/assets/icons/copy.svg"
                }
                width={12}
                height={12}
                alt="copy_icon"
              ></Image>
            </div>
          </div>
          <p className="my-4 font-satoshi text-sm text-gray-700">
            {prompt}
          </p>
          <p
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={() => handleTagClick && handleTagClick(post.tag)}
          >
            {tag}
          </p>
          {/* login user is same as post creator => check */}
          {session?.user.id === post.creator._id &&
            pathName === "/profile" && (
              <div className="flex-center gap-4 mt-4 border-t border-gray-300 pt-3">
                <p
                  className="font-inter text-sm green_gradient             cursor-pointer"
                  onClick={handleEdit}
                >
                  Edit
                </p>
                <p
                  className="font-inter text-sm orange_gradient             cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </p>
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default PromptCard;
