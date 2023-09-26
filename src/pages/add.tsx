"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sdk } from "@/api.service";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { statusCode } = await sdk.createBook({
      author,
      description,
      publicationYear,
      title,
    });

    if (statusCode) {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "50%", alignSelf: "center", margin: "40px" }}
      className="flex flex-col gap-3"
    >
      <input
        required
        style={{ color: "black" }}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="border border-slate-500 p-2"
        type="text"
        placeholder="Topic Title"
      />

      <textarea
        required
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 p-2"
        placeholder="Topic Description"
        rows={4}
        style={{ resize: "none", color: "black" }}
      ></textarea>

      <input
        required
        style={{ color: "black" }}
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className="border border-slate-500 p-2"
        type="text"
        placeholder="Author"
      />

      <input
        required
        style={{ color: "black" }}
        onChange={(e) => setPublicationYear(e.target.value)}
        value={publicationYear}
        className="border border-slate-500 p-2"
        type="text"
        placeholder="Public year"
      />
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Book
      </button>
    </form>
  );
}
