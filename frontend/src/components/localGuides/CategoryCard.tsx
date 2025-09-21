import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  buttonLabel?: string;
};

export default function CategoryCard({
  title,
  description,
  icon,
  color,
  buttonLabel,
}: Props) {
  return (
    <div className="rounded-lg shadow p-6 text-center transition-all duration-300 border bg-white">
      <div
        className={`w-14 h-14 mx-auto flex items-center justify-center rounded-full mb-4 ${color}`}
      >
        <div className="text-white text-3xl">{icon}</div>
      </div>

      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>

      {buttonLabel && (
        <div className="mt-4 inline-block text-xs bg-gray-100 px-3 py-1 rounded-full font-medium text-gray-700">
          {buttonLabel}
        </div>
      )}
    </div>
  );
}
