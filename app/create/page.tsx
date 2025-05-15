"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export interface IInterpretation {
  term: string;
  interpretation: string;
}

const CreatePage = () => {
  const [formData, setFormData] = useState<IInterpretation>({
    term: "",
    interpretation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.term || !formData.interpretation) {
      setError("Please fill in all the fields");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/interpretations", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if(!response.ok){
        throw new Error("Failed to create interpretation")
      }
      router.push('/')
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Add New Interpretation</h2>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
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
          type="submit"
          className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer"
        >
          {isLoading ? "Adding..." : "Add Interpretation"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CreatePage;
