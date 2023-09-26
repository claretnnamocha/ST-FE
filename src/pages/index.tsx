import { sdk } from "@/api.service";
import RemoveBtn from "@/components/RemoveBtn";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { HiPencilAlt } from "react-icons/hi";

// const getTopics = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/topics", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch topics");
//     }

//     return res.json();
//   } catch (error) {
//     console.log("Error loading topics: ", error);
//   }
// };

export default function TopicsList() {
  // const { topics } = await getTopics();

  const [topics, setTopics] = useState([]);

  const init = useCallback(async () => {
    const { data } = await sdk.getBooks();

    setTopics(data);
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {topics.map((t: any) => (
        <div
          key={t.id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t.id} />
            <Link href={`/${t.id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
