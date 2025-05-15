"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IInterpretations {
  $id: string;
  term: string;
  interpretation: string;
}

export default function Home() {
  const [interpretations, setInterpretations] = useState<IInterpretations[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const fetchInterpretations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/interpretations");
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch interpretations");
      }
      const data = await response.json();
      setInterpretations(data);
    } catch (error) {
      console.log("Error: " + error);
      setError("Failed to load interpretations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInterpretations();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/interpretations/${id}`, { method: "DELETE" });
      fetchInterpretations();
    } catch (error) {
      setError("Failed to delete interpretation. Please try again.");
    }
  };

  return (
    <div>
      {error && <p className="py-4 text-red-500">{error}</p>}
      {isLoading ? (
        <p>Loading Interpretations...</p>
      ) : interpretations.length == 0 ? (
        <p>No interpretation found</p>
      ) : (
        <div>
          {interpretations &&
            interpretations.map((data) => (
              <div
                className="p-4 my-2 rounded-md border-b leading-9"
                key={data.$id}
              >
                <div className="font-bold">{data.term}</div>
                <div>{data.interpretation}</div>

                <div className="mt-4 flex justify-end items-center gap-4">
                  <Link
                    className="bg-slate-200 px-4 py-2 rounded-md uppercase
          text-sm font-bold tracking-widest"
                    href={`/edit/${data.$id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(data.$id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md uppercase
          text-sm font-bold tracking-widest"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
