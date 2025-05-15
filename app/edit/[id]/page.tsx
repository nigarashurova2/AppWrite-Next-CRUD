"use client";
import { IInterpretation } from "@/app/create/page";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, use, useEffect, useState } from "react";

export default function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState<IInterpretation>({
    term: "",
    interpretation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/interpretations/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch interpretation");
        }

        const { interpretation } = await response.json();
        setFormData({
          term: interpretation.term,
          interpretation: interpretation.interpretation,
        });
      } catch (error) {
        setError("Failed to load interpretation");
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.term || !formData.interpretation) {
      setError("Please fill in all the fields");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/interpretations/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create interpretation");
      }
      router.push("/");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Edit Interpretation</h2>
      <form className="flex gap-3 flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="term"
          placeholder="Term"
          className="py-1 px-4 border rounded-md"
          value={formData.term}
          onChange={handleChange}
        />

        <textarea
          name="interpretation"
          rows={4}
          placeholder="Interpretation"
          className="py-1 px-4 border rounded-md resize-none"
          value={formData.interpretation}
          onChange={handleChange}
        ></textarea>

        <button
          disabled={isLoading}
          className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer"
        >
          {isLoading ? "Uploading..." : "Update Interpretation"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
