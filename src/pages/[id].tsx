"use client";

import { sdk } from "@/api.service";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";

export default function EditTopicForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");

  const router = useRouter();
  const { id }: any = router.query;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { statusCode } = await sdk.updateBook({
      id,
      author,
      description,
      publicationYear,
      title,
    });

    if (statusCode) {
      router.push("/");
    }
  };

  const init = useCallback(async () => {
    if (id) {
      const { data } = await sdk.getBook(id);

      setAuthor(data.author);
      setTitle(data.title);
      setDescription(data.description);
      setPublicationYear(data.publicationYear);
    }
  }, [id]);

  useEffect(() => {
    init();
  }, [id]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
      style={{ width: "50%", alignSelf: "center", margin: "40px" }}
    >
      <input
        style={{ color: "black" }}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 p-2"
        type="text"
        placeholder="Topic Title"
      />

      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 p-2"
        placeholder="Topic Description"
        rows={4}
        style={{ resize: "none", color: "black" }}
      ></textarea>

      <input
        style={{ color: "black" }}
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className="border border-slate-500 p-2"
        type="text"
        placeholder="Author"
      />

      <input
        style={{ color: "black" }}
        onChange={(e) => setPublicationYear(e.target.value)}
        value={publicationYear}
        className="border border-slate-500 p-2"
        type="text"
        placeholder="Public year"
      />
      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Book
      </button>
    </form>
  );
}
